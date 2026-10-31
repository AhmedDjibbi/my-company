import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  try {
    const { conversationId } = await req.json();

    if (!conversationId) {
      return NextResponse.json({ error: "conversationId is required" }, { status: 400 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    const updated = await prisma.conversation.update({
      where: { id: conversationId },
      data: { isHumanControlled: !conversation.isHumanControlled },
    });

    return NextResponse.json({
      success: true,
      isHumanControlled: updated.isHumanControlled,
    });

  } catch (error: any) {
    console.error("Toggle Control Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
