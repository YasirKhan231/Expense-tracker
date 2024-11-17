// pages/api/transactions.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db'; // Adjust path based on your project setup
import { NextRequest, NextResponse } from 'next/server';

export default async function handler(req: NextRequest, res: NextResponse) {
  const  userId  =  req.body;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, {status:400});
  }

  try {
    const expenses = await prisma.expense.findMany({
      where:  userId ,
      orderBy: { date: 'desc' }, // Sort by date
    });

    const incomes = await prisma.income.findMany({
      where:  userId ,
      orderBy: { date: 'desc' }, // Sort by date
    });

    return NextResponse.json({ expenses, incomes }, {status:200});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' });
  }
}
