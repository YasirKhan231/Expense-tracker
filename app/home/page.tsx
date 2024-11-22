'use client'

import { useEffect, useState } from 'react'
import {  CreditCard, Home, Menu, PieChart, PlusCircle, Wallet, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from "@/app/logo.png"
import axios from "axios"
import Loading from '@/components/loading'
import Link from 'next/link'

interface SpendingData {
  day: string;
  amount: number;
}

interface Transaction {
  id: number;
  name: string;
  amount: number;
  description?: string;
  category?: string;
  date: string;
}
interface Expense {
  id: number;
  name: string;
  amount: number;
  description?: string;
  category?: string;
  date: string;
}

interface Income {
  id: number;
  Incomename: string;
  amount: number;
  description?: string;
  date: string;
}


export default function Component() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [totalExpense, setTotalExpense] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)
  const [spendingData, setSpendingData] = useState<SpendingData[]>([])
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/signup')
      return
    }

    const fetchData = async () => {
      try {
        const { data: userResponse } = await axios.post('/api/home-data', { token })
        const {
          expenses,
          incomes,
          last30DaysTotalExpenses,
          last30DaysTotalIncomes,
          spendingData: responseSpendingData,
        } = userResponse.data

        setTotalExpense(last30DaysTotalExpenses)
        setTotalIncome(last30DaysTotalIncomes)
        setSpendingData(responseSpendingData)

        const normalizedTransactions = [
          ...expenses.map((expense :Expense) => ({
            id: expense.id,
            name: expense.name,
            amount: expense.amount,
            description: expense.description,
            category: expense.category,
            date: expense.date,
          })),
          ...incomes.map((income: Income) => ({
            id: income.id,
            name: income.Incomename,
            amount: income.amount,
            description: income.description,
            date: income.date,
          })),
        ]

        setTransactions(normalizedTransactions)
      } catch  {
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    const intervalId = setInterval(fetchData, 48000)
    return () => clearInterval(intervalId)
  }, [router])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const getMaxAmount = () => {
    return Math.max(...spendingData.map(d => Math.abs(d.amount)), 1)
  }

  if (isLoading) {
    return <Loading />
  }

  const limitedTransactions = transactions.slice(0, 4)

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Button
        variant="outline"
        size="icon"
        className={`fixed left-13 top-3.5 z-50 transition-all duration-300 ${isSidebarOpen ? 'left-[258px]' : 'left-14.5'}`}
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
        <div className="p-4">
          <h2 className="text-2xl font-bold">WalletWise</h2>
        </div>
        
        <nav className="space-y-2 p-2 mt-4">
          <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/home")}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/analytics")}>
            <PieChart className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/transaction")}>
            <CreditCard className="mr-2 h-4 w-4" />
            Transactions
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/budget")}>
            <Wallet className="mr-2 h-4 w-4" />
            Budgets
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/about")}>
            <InformationCircleIcon className="mr-2 h-4 w-4" />
            About us 
          </Button>
        </nav>
      </aside>

      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <div className="ml-12 flex items-center space-x-4">
            <Image src={logo} alt="WalletWise Logo" width={64} height={64} className="object-contain cursor-pointer" />
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/expenseAdd">
              <Button
                variant="default"
                className="bg-primary text-primary-foreground hover:bg-primary/90 mr-4"
              >
                Add Expense
              </Button>
            </Link>
            <Link href="/incomeAdd">
              <Button
                variant="default"
                className="bg-primary text-primary-foreground hover:bg-primary/90 mr-6"
              >
                Add Income
              </Button>
            </Link>
          </div>
        </header>

        <div className="bg-gradient-to-r from-indigo-300 to-teal-300 py-12 px-6 text-center rounded-xl shadow-lg">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Take Control of Your Finances
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
            <span className="inline-block px-4 py-2 bg-white bg-opacity-60 rounded-lg mr-3 transform -skew-x-6">
              [Track]
            </span>
            <span className="inline-block px-4 py-2 bg-white bg-opacity-60 rounded-lg mr-3 transform skew-x-6">
              [Budget]
            </span>
            <span className="inline-block px-4 py-2 bg-white bg-opacity-60 rounded-lg transform -skew-x-6">
              [Grow]
            </span>
          </p>
          <button className="mt-8 px-8 py-3 bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-semibold text-lg rounded-lg shadow-md hover:from-teal-500 hover:to-indigo-600 transition-all">
            Start Tracking
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div className="gap-4 flex justify-center mb-8">
            <Button size="lg" className="w-full max-w-md h-16 text-lg font-semibold rounded-xl shadow-lg bg-black hover:bg-gray-800 text-white transition-colors" onClick={() => router.push("/expenseAdd")}>
              <PlusCircle className="h-6 w-6 mr-2" />
              Add Expense
            </Button>
            <Button size="lg" className="w-full max-w-md h-16 text-lg font-semibold rounded-xl shadow-lg bg-black hover:bg-gray-800 text-white transition-colors" onClick={() => router.push("/incomeAdd")}>
              <PlusCircle className="h-6 w-6 mr-2" />
              Add Income
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalIncome}</div>
                <p className="text-xs text-muted-foreground">Last 30 days Total income</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalExpense}</div>
                <p className="text-xs text-muted-foreground">Last 30 days Total expense</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalIncome + totalExpense}</div>
                <p className="text-xs text-muted-foreground">Last 30 days Total Balance</p>
              </CardContent>
            </Card>
          </div> 
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Spending Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {spendingData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center w-full">
                      <div className="w-full bg-gray-200 rounded-t-lg overflow-hidden">
                        <div
                          className="bg-blue-500 transition-all duration-300 ease-in-out"
                          style={{
                            height: (Math.abs((data.amount*200)/getMaxAmount()))
                          }}
                        />
                      </div>
                      <span className="text-xs mt-2 text-gray-600">{data.day}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-sm text-gray-600">
                  <span>0</span>
                  <span>₹{getMaxAmount()}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {limitedTransactions.map((transaction, index) => (
                    <div key={`transaction-${transaction.id}-${index}`} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{transaction.name}</p>
                        <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}</p>
                      </div>
                      <div className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}