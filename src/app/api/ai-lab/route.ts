import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { qualifyLead } from "@/services/ai/qualification";
import { calculateLeadScore } from "@/services/scoring";
import { matchProperties } from "@/services/matching";
import { aiProvider } from "@/lib/ai";
import { orchestrator } from "@/lib/ai/orchestrator";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 1. Step: Qualification
    const qualification = await qualifyLead(message);

    // 2. Step: Scoring
    const score = calculateLeadScore({
      budgetProvided: !!qualification.budgetMax,
      locationProvided: !!qualification.location,
      propertyTypeProvided: !!qualification.propertyType,
      bedroomsProvided: !!qualification.bedrooms,
      clearIntent: !!qualification.intent,
      urgencyHigh: qualification.urgency === "high",
      phoneProvided: false,
      emailProvided: false,
      requestedViewing: !!qualification.recommendedNextAction?.toLowerCase().includes("viewing"),
    });

    // 3. Step: Matching
    const matches = await matchProperties({
      transactionType: qualification.intent === 'rent' ? 'RENT' : 'SALE',
      budgetMax: qualification.budgetMax || 1000000,
      location: qualification.location,
      propertyType: qualification.propertyType,
      bedrooms: qualification.bedrooms ?? undefined,
      bathrooms: qualification.bathrooms ?? undefined,
    });

    // 4. Step: Response Generation (The Closer)
    const propertyContext = matches.length > 0
      ? matches.map(m => `${m.property.title} in ${m.property.city} - ${m.property.price} TND (${m.matchScore}% match)`).join("\n")
      : "No exact matches found.";

    const closerAgent = await orchestrator.getAgent("CLOSER");
    const responsePrompt = `
      Customer message: ${message}
      Matched Properties:\n${propertyContext}
      Reply in the customer's language and dialect. Be a professional luxury agent.
    `;

    const aiResponse = await aiProvider.generateText(
      responsePrompt,
      closerAgent.systemPrompt,
      closerAgent.model
    );

    return NextResponse.json({
      steps: {
        qualification: {
          input: message,
          output: qualification,
          agent: "QUALIFIER",
          model: "qwen2.5"
        },
        scoring: {
          input: qualification,
          output: { score, category: score >= 80 ? "VERY_HOT" : "HOT" },
          agent: "DETERMINISTIC_ENGINE"
        },
        matching: {
          input: qualification,
          output: matches,
          agent: "MATCHER",
          model: "llama3"
        },
        response: {
          input: { message, matches },
          output: aiResponse.content,
          agent: "CLOSER",
          model: "tounsilm"
        }
      }
    });

  } catch (error: any) {
    console.error("AI Lab Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
