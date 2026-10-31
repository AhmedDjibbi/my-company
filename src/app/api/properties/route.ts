import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // In a real app, get organizationId from the session
    const org = await prisma.organization.findFirst();
    if (!org) {
      return NextResponse.json({ error: "No organization found" }, { status: 500 });
    }

    const property = await prisma.property.create({
      data: {
        ...body,
        organizationId: org.id,
      },
    });

    return NextResponse.json({ success: true, property });

  } catch (error: any) {
    console.error("Create Property Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
