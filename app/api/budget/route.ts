import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db'; // Ensure this points to your Prisma client
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'yasirsecret'; // Use environment variables for secrets in production
const predefinedCategories = [
  'Food',
  'Rent',
  'Utilities',
  'Transportation',
  'Entertainment',
  'Clothes',
];

interface JwtPayload {
  id: number;
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { token } = await req.json();

    // Validate token existence
    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Verify and decode JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Fetch user details from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, username: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Fetch user's expenses grouped by category
    const expenses = await prisma.expense.groupBy({
      by: ['category'],
      where: { userId: user.id },
      _sum: { amount: true },
    });

    // Total expenses across all categories
    const totalExpense = expenses.reduce(
      (sum, expense) => sum + (expense._sum.amount || 0),
      0
    );

    // Map expenses to predefined categories for consistency
    const categoryExpenses = predefinedCategories.map((category) => {
      const categoryData = expenses.find((e) => e.category === category);
      return {
        category,
        totalAmount: categoryData ? categoryData._sum.amount || 0 : 0,
      };
    });

    // Send response with user and expense details
    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      totalExpense,
      categoryExpenses,
    });
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
