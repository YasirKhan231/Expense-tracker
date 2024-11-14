
import { NextRequest, NextResponse } from "next/server";
import client from "@/db"

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, amount, category, description, date } = body;

  // Validate required fields
  if (!name || !amount || !category || !date) {
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
    // Create expense in the database
    const expense = await client.expense.create({
      data: {
        name,
        amount: parseFloat(amount), // Ensure amount is a valid float
        category,
        description,
        date: parsedDate,
      },
    });
    return NextResponse.json(expense, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add expense' }, { status: 500 });
  }
}
