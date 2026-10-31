import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { qualifyLead } from "@/services/ai/qualification";
import { calculateLeadScore } from "@/services/scoring";
import { matchProperties } from "@/services/matching";
import { aiProvider } from "@/lib/ai"
import { orchestrator } from "@/lib/ai/orchestrator";
import { NotificationService } from "@/lib/notifications";

export async function POST(req: NextRequest) {
  try {
    const { message, leadId, organizationId } = await req.json();

    if (!message || !organizationId) {
      return NextResponse.json({ error: "Message and organizationId are required" }, { status: 400 });
    }

    // 1. Identify or Create Lead
    let targetOrgId: string | undefined;
    const org = await prisma.organization.findFirst();
    targetOrgId = organizationId || org?.id;

    if (!targetOrgId) {
      return NextResponse.json({ error: "No organization found. Please seed your database." }, { status: 400 });
    }

    let lead = null;
    if (leadId) {
      lead = await prisma.lead.findUnique({ where: { id: leadId } });
    }

    if (!lead) {
      lead = await prisma.lead.create({
        data: {
          organizationId: targetOrgId,
          originalMessage: message,
          source: "WEBSITE",
        },
      });
    }

    // 2. Create Conversation if not exists
    const existingConv = await prisma.conversation.findFirst({
      where: { leadId: lead.id },
    });

    const conversation = existingConv || await prisma.conversation.create({
      data: {
        organizationId: targetOrgId,
        leadId: lead.id,
        channel: "WEBSITE",
      },
    });

    // Check if AI is disabled for this conversation (Human-in-the-loop)
    if (conversation.isHumanControlled) {
      // Save inbound message and return immediately
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          direction: "INBOUND",
          sender: "customer",
          text: message,
        },
      });
      return NextResponse.json({
        reply: "An agent has taken over this conversation. They will respond to you shortly.",
        humanControlled: true
      });
    }

    // Save inbound message
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        direction: "INBOUND",
        sender: "customer",
        text: message,
      },
    });

    // 3. AI Qualification
    const qualification = await qualifyLead(message);

    // 4. Update Lead with AI data
    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        budgetMin: qualification.budgetMin,
        budgetMax: qualification.budgetMax,
        propertyType: qualification.propertyType,
        bedrooms: qualification.bedrooms,
        bathrooms: qualification.bathrooms,
        location: qualification.location,
        preferredLanguage: qualification.language,
        urgency: qualification.urgency,
        aiConfidence: qualification.confidence,
      },
    });

    // 5. Deterministic Lead Scoring
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

    await prisma.lead.update({
      where: { id: lead.id },
      data: { leadScore: score },
    });

    // 🔥 HOT LEAD NOTIFICATION
    if (score >= 80) {
      NotificationService.sendHotLeadAlert(lead, score).catch(err =>
        console.error("Notification Error:", err)
      );
    }

    // 6. Property Matching
    const matches = await matchProperties({
      transactionType: qualification.intent === 'rent' ? 'RENT' : 'SALE',
      budgetMax: qualification.budgetMax || 1000000,
      location: qualification.location,
      propertyType: qualification.propertyType,
      bedrooms: qualification.bedrooms ?? undefined,
      bathrooms: qualification.bathrooms ?? undefined,
    });

    // 7. Generate AI Response via Orchestrator
    const aiResponse = await orchestrator.processMessage(message, {
      lead,
      conversation,
      matches,
      qualification
    });

    // Save outbound message
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        direction: "OUTBOUND",
        sender: "ai-assistant",
        text: aiResponse.content,
        aiGenerated: true,
      },
    });

    return NextResponse.json({
      reply: aiResponse.content,
      leadId: lead.id,
      score: score,
      matches: matches,
    });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
