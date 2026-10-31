import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const org = await prisma.organization.findFirst();
    if (!org) {
      return NextResponse.json({ error: "No organization found" }, { status: 500 });
    }

    const lead = await prisma.lead.create({
      data: {
        ...body,
        organizationId: org.id,
      },
    });

    return NextResponse.json({ success: true, lead });

  } catch (error: any) {
    console.error("Create Lead Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
