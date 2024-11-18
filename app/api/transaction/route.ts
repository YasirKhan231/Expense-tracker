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

    // Fetch expenses for the user
    const [expenses, totalExpenses] = await Promise.all([
      prisma.expense.findMany({
        where: { userId: Number(userId) },
      }),
      prisma.expense.aggregate({
        _sum: { amount: true },
        where: { userId: Number(userId) },
      }),
    ]);

    // Fetch incomes and total amount for the user
    const [incomes, totalIncomes] = await Promise.all([
      prisma.income.findMany({
        where: { userId: Number(userId) },
      }),
      prisma.income.aggregate({
        _sum: { amount: true },
        where: { userId: Number(userId) },
      }),
    ]);

    // Combine and return the results
    return NextResponse.json(
      {
        expenses,
        totalExpenses: totalExpenses._sum.amount || 0,
        incomes,
        totalIncomes: totalIncomes._sum.amount || 0,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: 'Failed to fetch transactions' } , {status :403});
  }
}
