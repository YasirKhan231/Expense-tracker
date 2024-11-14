'use client'

import { useState } from 'react'
import { Bell, CreditCard, Home, Menu, PieChart, PlusCircle, Settings, Wallet, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const spendingData = [
    { day: "Mon", amount: 120 },
    { day: "Tue", amount: 240 },
    { day: "Wed", amount: 180 },
    { day: "Thu", amount: 320 },
    { day: "Fri", amount: 280 },
    { day: "Sat", amount: 400 },
    { day: "Sun", amount: 200 },
  ]

  const recentTransactions = [
    {
      id: "84995",
      name: "Grocery Shopping",
      amount: -120.50,
      date: "22 June 2024",
      category: "Food",
    },
    {
      id: "84994",
      name: "Salary Deposit",
      amount: 3500.00,
      date: "21 June 2024",
      category: "Income",
    },
    {
      id: "84993",
      name: "Netflix Subscription",
      amount: -15.99,
      date: "20 June 2024",
      category: "Entertainment",
    },
  ]

  const maxAmount = Math.max(...spendingData.map(d => d.amount))

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Button
        variant="outline"
        size="icon"
        className={`fixed top-4 z-50 transition-all duration-300 ${isSidebarOpen ? 'left-[248px]' : 'left-4'}`}
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      <aside 
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">ExpenseTracker</h2>
        </div>
        <nav className="space-y-2 p-2">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Overview
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <PieChart className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <CreditCard className="mr-2 h-4 w-4" />
            Transactions
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Wallet className="mr-2 h-4 w-4" />
            Budgets
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>
      </aside>

      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className=" ml-9 text-xl font-semibold">Hi, Alex 👋</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="lg" className="hidden md:inline-flex text-lg py-2 px-4">
              Sign In
            </Button>
            <Button size="lg" className="hidden md:inline-flex text-lg py-2 px-4">
              Sign Up
            </Button>
            <Button variant="ghost" size="icon" className="p-3">
              <Bell className="h-6 w-6" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder.svg" alt="User avatar" />
              <AvatarFallback>AX</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-4 space-y-6">
          <div className="flex justify-center mb-8">
            <Button size="lg" className="w-full max-w-md h-16 text-lg font-semibold rounded-xl shadow-lg bg-black hover:bg-gray-800 text-white transition-colors">
              <PlusCircle className="h-6 w-6 mr-2" />
              Add Expense
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$8,738</div>
                <p className="text-xs text-muted-foreground">+16.9% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,475</div>
                <p className="text-xs text-muted-foreground">+24.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$15,738</div>
                <p className="text-xs text-muted-foreground">48% of annual target</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Spending Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end justify-between">
                  {spendingData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-6 bg-black rounded-t"
                        style={{ height: `${(data.amount / maxAmount) * 100}%` }}
                      ></div>
                      <span className="text-xs mt-2">{data.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{transaction.name}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
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