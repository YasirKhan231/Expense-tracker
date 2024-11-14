// /pages/api/user-expenses.ts

import { NextApiRequest, NextApiResponse } from 'next'
import prisma from  "@/db"
import { NextRequest, NextResponse } from 'next/server';

export default async function GET(req: NextRequest) {
    const { userId } = await req.json();

    try {
      // Fetch expenses for the specified user
      const expenses = await prisma.expense.findMany({
        where: { userId: Number(userId) },
      });
      
     return  NextResponse.json({expenses ,  status :200});
    } catch (error) {
     return NextResponse.json({ error: "Error fetching user expenses" } , {status :500});
    }
  }
