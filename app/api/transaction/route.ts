import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db'; // Ensure this points to your Prisma client
import { NextRequest, NextResponse } from 'next/server';

export  async function POST(req: NextRequest, res: NextApiResponse) {
  // Ensure it's a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Parse the userId from the request body
    const { userId } = await  req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, {status:400});
    }

    const currentDate = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);

    // Fetch all expenses and total expenses
    const [expenses, totalExpenses] = await Promise.all([
      prisma.expense.findMany({
        where: { userId: Number(userId) },
      }),
      prisma.expense.aggregate({
        _sum: { amount: true },
        where: { userId: Number(userId) },
      }),
    ]);

    // Fetch last 30 days' expenses
    const last30DaysTotalExpenses = await prisma.expense.aggregate({
      _sum: { amount: true },
      where: {
        userId: Number(userId),
        date: {
          gte: thirtyDaysAgo,
          lte: currentDate,
        },
      },
    });

    // Fetch all incomes and total incomes
    const [incomes, totalIncomes] = await Promise.all([
      prisma.income.findMany({
        where: { userId: Number(userId) },
      }),
      prisma.income.aggregate({
        _sum: { amount: true },
        where: { userId: Number(userId) },
      }),
    ]);

    // Fetch last 30 days' incomes
    const last30DaysTotalIncomes = await prisma.income.aggregate({
      _sum: { amount: true },
      where: {
        userId: Number(userId),
        date: {
          gte: thirtyDaysAgo,
          lte: currentDate,
        },
      },
    });

    // Calculate spending data grouped by day of the week
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

    // Combine and return the results
    return NextResponse.json(
      {
        expenses,
        totalExpenses: totalExpenses._sum.amount || 0,
        last30DaysTotalExpenses: last30DaysTotalExpenses._sum.amount || 0,
        incomes,
        totalIncomes: totalIncomes._sum.amount || 0,
        last30DaysTotalIncomes: last30DaysTotalIncomes._sum.amount || 0,
        spendingData,
      },
      { status: 200 }
    );

   
  } catch {
    return NextResponse.json({ error: 'Failed to fetch transactions' } , {status :403});
  }
}
