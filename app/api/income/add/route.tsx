import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { Incomename, amount, description, date, userId } = body; // Expecting userId in the request body

  // Validate required fields
  if (!Incomename || !amount || !date || !userId) {
    return NextResponse.json({ msg: "Missing required field" }, { status: 400 });
  }

  // Validate amount to be a valid number
  if (isNaN(amount)) {
    return NextResponse.json({ msg: "Amount must be a valid number" }, { status: 400 });
  }

  // Parse date and check if it is valid
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return NextResponse.json({ msg: "Invalid date format" }, { status: 400 });
  }

  try {
    // Create income in the database and link it to the user
    const income = await client.income.create({
      data: {
        Incomename,
        amount: parseFloat(amount), 
        description,
        date: parsedDate,
        userId: userId, // Link the income to the user by userId
      },
    });

    return NextResponse.json(income, { status: 200 });
  } catch  {
    return NextResponse.json({ error: 'Failed to add income' }, { status: 500 });
  }
}
