// // pages/api/expenses.js

// import { PrismaClient } from '@prisma/client'
// import { NextRequest, NextResponse } from 'next/server'

// const prisma = new PrismaClient()

// // GET request: Fetch all expenses
// export async function GET(req :NextRequest, res : NextResponse) {
//   try {
//     const expenses = await prisma.expense.findMany()
//     res.status(200).json(expenses)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Failed to fetch expenses' })
//   }
// }

// // POST request: Add a new elaxpense
// async function handleAddExpense(req, res) {
//   const { expenseName, amount, category, description, date } = req.body

//   if (!expenseName || !amount || !category || !date) {
//     return res.status(400).json({ error: 'Missing required fields' })
//   }

//   try {
//     const expense = await prisma.expense.create({
//       data: {
//         expenseName,
//         amount: parseFloat(amount),
//         category,
//         description,
//         date: new Date(date),
//       },
//     })
//     res.status(200).json(expense)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Failed to add expense' })
//   }
// }

// // Main handler function to determine request method
// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     await handleGetExpenses(req, res)
//   } else if (req.method === 'POST') {
//     await handleAddExpense(req, res)
//   } else {
//     res.setHeader('Allow', ['GET', 'POST'])
//     res.status(405).end(`Method ${req.method} Not Allowed`)
//   }
// }
