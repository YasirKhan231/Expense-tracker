import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, amount, category, description, date, userId } = body;

  // Validate required fields
  if (!name || !amount || !category || !date || !userId) {
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
    const negativeAmount = amount > 0 ? -amount : amount;
    // Create expense in the database
    const expense = await client.expense.create({
      data: {
        name,
        amount: parseFloat(negativeAmount), // Ensure amount is a valid float
        category,
        description,
        date: parsedDate,
        user: { connect: { id: userId } }, // Link the expense to the user
      },
    });

    return NextResponse.json(expense, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add expense" }, { status: 500 });
  }
}
