import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/db'; // Ensure this points to your Prisma client

const JWT_SECRET = "yasirsecret";

interface JwtPayload {
  id: number;
  email: string;
}

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    // Parse token from the request body
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ message: 'Token is required' }, { status: 400 });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Check if the user exists in the database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, username: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userId = user.id;

    // Calculate date range for the last 30 days
    const currentDate = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);

    // Fetch all required data concurrently
    const [expenses, totalExpenses, last30DaysTotalExpenses, incomes, totalIncomes, last30DaysTotalIncomes] = await Promise.all([
      prisma.expense.findMany({
        where: { userId },
      }),
      prisma.expense.aggregate({
        _sum: { amount: true },
        where: { userId },
      }),
      prisma.expense.aggregate({
        _sum: { amount: true },
        where: {
          userId,
          date: {
            gte: thirtyDaysAgo,
            lte: currentDate,
          },
        },
      }),
      prisma.income.findMany({
        where: { userId },
      }),
      prisma.income.aggregate({
        _sum: { amount: true },
        where: { userId },
      }),
      prisma.income.aggregate({
        _sum: { amount: true },
        where: {
          userId,
          date: {
            gte: thirtyDaysAgo,
            lte: currentDate,
          },
        },
      }),
    ]);

    // Calculate spending grouped by day of the week
    const spendingByDay: { [key: string]: number } = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };

    expenses.forEach((expense) => {
      const dayOfWeek = new Date(expense.date).toLocaleString('en-US', {
        weekday: 'short',
      });
      if (spendingByDay[dayOfWeek] !== undefined) {
        spendingByDay[dayOfWeek] += expense.amount;
      }
    });

    const spendingData = Object.entries(spendingByDay).map(([day, amount]) => ({
      day,
      amount,
    }));

    // Combine all data into the response
    return NextResponse.json(
      {
        message: 'Data fetched successfully',
        user,
        data: {
          expenses,
          totalExpenses: totalExpenses._sum.amount || 0,
          last30DaysTotalExpenses: last30DaysTotalExpenses._sum.amount || 0,
          incomes,
          totalIncomes: totalIncomes._sum.amount || 0,
          last30DaysTotalIncomes: last30DaysTotalIncomes._sum.amount || 0,
          spendingData,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
