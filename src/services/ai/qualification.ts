import { aiProvider } from "@/lib/ai"
import { orchestrator } from "@/lib/ai/orchestrator"
import { z } from "zod"

export const QualificationSchema = z.object({
  intent: z.enum(["buy", "rent", "investment", "information", "other"]),
  budgetMin: z.number().optional(),
  budgetMax: z.number().optional(),
  propertyType: z.string().optional(),
  bedrooms: z.number().nullable().optional(),
  bathrooms: z.number().nullable().optional(),
  location: z.string().optional(),
  preferredAreas: z.array(z.string()).optional(),
  urgency: z.enum(["low", "medium", "high"]).optional(),
  leadScore: z.number().optional(),
  language: z.enum(["fr", "en", "ar", "derja", "mixed", "unknown"]).optional(),
  confidence: z.number().optional(),
  missingInformation: z.array(z.string()).optional(),
  recommendedNextAction: z.string().optional(),
  reasoning: z.string().optional(),
})

export type QualificationResult = z.infer<typeof QualificationSchema>;

export async function qualifyLead(message: string, history: any[] = []) {
  const agent = await orchestrator.getAgent("QUALIFIER");

  const systemPrompt = `
    You are a professional, multilingual real estate lead qualification assistant for a high-value agency in Tunisia.

    LANGUAGE CAPABILITIES:
    - You must understand and process messages in ANY language.
    - You have expert-level understanding of Tunisian Derja (Tunisian Arabic), including when it is written in Arabizi (Latin characters with numbers like 3, 7, 9).
    - You are fluent in French, English, and Modern Standard Arabic.

    YOUR GOAL:
    Extract structured information from customer messages regardless of the language or dialect used.
    Even if the message is a mix of languages (e.g., "Bonjour, nheb appartement fi Monastir"), extract the data accurately.
  `;

  const prompt = `Qualify the following customer message: "${message}".\nConversation history: ${JSON.stringify(history)}`;

  try {
    const result = await aiProvider.generateStructuredText<QualificationResult>(
      prompt,
      QualificationSchema,
      systemPrompt,
      agent.model
    );

    return QualificationSchema.parse(result);
  } catch (error) {
    console.error("Qualification Error:", error);
    throw error;
  }
}
