import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await req.json();

    // Fetch expenses for the specified user
    const expenses = await prisma.expense.findMany({
      where: { userId: Number(userId) },
    });

    return NextResponse.json({ expenses, status: 200 });
  } catch {
    return NextResponse.json({ error: "Error fetching user expenses" }, { status: 500 });
  }
}
