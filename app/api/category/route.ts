import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db'; // Ensure this points to your Prisma client

// Predefined list of categories (you can modify this as per your requirement)
const predefinedCategories = [
  'Food',
  'Rent',
  'Utilities',
  'Transportation',
  'Entertainment',
  'clothes'
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Fetch expenses grouped by category for the given userId
    const expenses = await prisma.expense.groupBy({
      by: ['category'],
      where: { userId },
      _sum: { amount: true },
    });

    // Map fetched expenses into an object for easy lookup
    const expenseMap = new Map(
      expenses.map((expense) => [expense.category, expense._sum.amount || 0])
    );

    // Create the full array with all categories, adding 0 for categories with no expenses
    const monthlyExpenses = predefinedCategories.map((category) => ({
      category,
      amount: expenseMap.get(category) || 0, // If the category does not exist in the expenseMap, set amount to 0
    }));

    return NextResponse.json({
      userId,
      monthlyExpenses,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
