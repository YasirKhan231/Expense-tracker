"use client"

import { useState } from 'react'
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CreditCard, Home, PieChart, Wallet, Menu, X } from 'lucide-react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

export default function AnalyticsPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  // Sample data for analytics
  const monthlyExpenses = [
    { category: 'Food', amount: 500 },
    { category: 'Rent', amount: 1200 },
    { category: 'Utilities', amount: 300 },
    { category: 'Transportation', amount: 200 },
    { category: 'Entertainment', amount: 150 },
  ]

  const totalExpenses = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Button
        variant="outline"
        size="icon"
        className={`fixed left-13 top-3.5 z-50 transition-all duration-300 ${isSidebarOpen ? 'left-[258px]' : 'left-14.5'}`}
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">ExpenseTracker</h2>
        </div>
        <nav className="space-y-2 p-2">
          <Button variant="ghost" className="w-full justify-start" onClick={() => { router.push("/home") }}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => { router.push("/analytics") }}>
            <PieChart className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => { router.push("/transaction") }}>
            <CreditCard className="mr-2 h-4 w-4" />
            Transactions
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => { router.push("/budget") }}>
            <Wallet className="mr-2 h-4 w-4" />
            Budgets
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => { router.push("/about") }}>
            <InformationCircleIcon className="mr-2 h-4 w-4" />
            About us 
          </Button>
        </nav>
      </aside>

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Navbar */}
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="ml-12 text-xl font-semibold">Analytics</h1>
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

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Monthly Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyExpenses.map((expense, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{expense.category}</span>
                    <span>${expense.amount}</span>
                  </div>
                ))}
                <div className="border-t pt-4 font-bold flex justify-between items-center">
                  <span>Total Expenses</span>
                  <span>${totalExpenses}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expense Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between">
                {monthlyExpenses.map((expense, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-16 bg-blue-500 rounded-t"
                      style={{ height: `${(expense.amount / totalExpenses) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-2">{expense.category}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t py-4">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600">
            © 2023 ExpenseTracker. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  )
}