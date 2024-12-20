import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db'; // Ensure this points to your Prisma client
import jwt from 'jsonwebtoken';

// Predefined list of categories
const JWT_SECRET = 'yasirsecret';
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
    const { token } = await req.json();

    // Validate the token
    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Decode the JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Verify user existence in the database
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

    // Fetch the user's expenses grouped by category
    const expenses = await prisma.expense.groupBy({
      by: ['category'],
      where: { userId: user.id },
      _sum: { amount: true },
    });

    // Transform the fetched data for clear mapping
    const categoryExpenses = predefinedCategories.map((category) => {
      const categoryData = expenses.find((e) => e.category === category);
      return {
        category,
        totalAmount: categoryData ? categoryData._sum.amount || 0 : 0,
      };
    });

    // Send the response
    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      expenses: categoryExpenses,
    });
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
