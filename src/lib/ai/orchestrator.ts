export type AgentRole = "QUALIFIER" | "MATCHER" | "CLOSER";

export interface AgentConfig {
  role: AgentRole;
  model: string;
  systemPrompt: string;
}

const AGENT_CONFIGS: Record<AgentRole, AgentConfig> = {
  QUALIFIER: {
    role: "QUALIFIER",
    model: process.env.AI_MODEL_QUALIFIER || "qwen2.5:latest",
    systemPrompt: `You are the Qualification Agent. Your sole job is to extract structured data from messages.
    Focus on: budget, location, property type, and urgency.
    You must output strictly valid JSON.`,
  },
  MATCHER: {
    role: "MATCHER",
    model: process.env.AI_MODEL_MATCHER || "qwen2.5:latest",
    systemPrompt: `You are the Matching Agent. Your job is to analyze the lead's requirements
    and explain WHY certain properties are a good match. Focus on value and logic.`,
  },
  CLOSER: {
    role: "CLOSER",
    model: process.env.AI_MODEL_CLOSER || "qwen2.5:latest",
    systemPrompt: `You are the Closing Agent. Your job is to generate the final response.
    You must mirror the customer's language (French, English, or Tunisian Derja).
    Be professional, high-end, and always push for a viewing appointment.`,
  },
};

import { aiProvider } from "./index";
import { prisma } from "@/lib/prisma";

export class AgentOrchestrator {
  async getAgent(role: AgentRole) {
    return AGENT_CONFIGS[role];
  }

  async processMessage(
    message: string,
    context: {
      lead: any,
      conversation: any,
      matches: any[],
      qualification: any
    }
  ) {
    const closerAgent = await this.getAgent("CLOSER");

    const propertyContext = context.matches.length > 0
      ? context.matches.map(m => `${m.property.title} in ${m.property.city} - ${m.property.price} TND (${m.matchScore}% match)`).join("\n")
      : "No exact matches found, but we can look for similar properties.";

    const responsePrompt = `
      Customer message: ${message}
      Matched Properties:\n${propertyContext}

      INSTRUCTIONS:
      1. Detect the language and dialect of the customer's message.
      2. Reply in that EXACT same language and style.
      3. If they speak Tunisian Derja (even in Arabizi), reply in professional yet friendly Tunisian Derja.
      4. If they speak French, reply in French.
      5. If they speak English, reply in English.
      6. If they speak a mix, reply in a natural mix that they would understand.

      CONTENT:
      - Be professional and helpful.
      - If properties were found, mention them naturally.
      - Always try to guide them towards booking a viewing.
      - Keep it concise and premium.
    `;

    return await aiProvider.generateText(
      responsePrompt,
      closerAgent.systemPrompt,
      closerAgent.model
    );
  }
}

export const orchestrator = new AgentOrchestrator();
