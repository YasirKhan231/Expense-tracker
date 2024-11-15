"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, CreditCard, Home, Info, MinusCircle, PieChart, PlusCircle, Wallet } from 'lucide-react'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function TransactionPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

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
          <Button variant="ghost" className="w-full justify-start">
            <PieChart className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => { router.push("/transaction") }}>
            <CreditCard className="mr-2 h-4 w-4" />
            Transactions
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Wallet className="mr-2 h-4 w-4" />
            Budgets
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => { router.push("/about") }}>
            <Info className="mr-2 h-4 w-4" />
            About us 
          </Button>
        </nav>
      </aside>

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Navbar */}
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="ml-12 text-xl font-semibold">Hi, Alex 👋</h1>
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
          {/* Main Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Financial Overview</CardTitle>
              <CardDescription>Track your expenses and income at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800">Total Income</h3>
                  <p className="text-2xl font-bold text-green-600">$5,240.00</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800">Total Expenses</h3>
                  <p className="text-2xl font-bold text-red-600">$3,120.00</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Net Balance</h3>
                  <p className="text-2xl font-bold text-blue-600">$2,120.00</p>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <Button size="lg" className="w-40 h-12" onClick={() => { router.push("/expense/incomeAdd") }}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Income
                </Button>
                <Button size="lg" className="w-40 h-12" onClick={() => { router.push("/expense/expenseAdd") }}>
                  <MinusCircle className="mr-2 h-4 w-4" /> Add Expense
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Statement */}
          <h2 className="text-2xl font-bold mb-4">Transaction Statement</h2>
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div>Grocery Shopping</div>
                      <div className="text-sm text-gray-500">May 15, 2023</div>
                    </TableCell>
                    <TableCell className="text-red-600">-$85.50</TableCell>
                    <TableCell className="hidden md:table-cell">Weekly groceries from Whole Foods</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div>Freelance Payment</div>
                      <div className="text-sm text-gray-500">May 14, 2023</div>
                    </TableCell>
                    <TableCell className="text-green-600">+$750.00</TableCell>
                    <TableCell className="hidden md:table-cell">Website design project completion</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div>Electric Bill</div>
                      <div className="text-sm text-gray-500">May 10, 2023</div>
                    </TableCell>
                    <TableCell className="text-red-600">-$120.30</TableCell>
                    <TableCell className="hidden md:table-cell">Monthly electricity payment</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div>Salary Deposit</div>
                      <div className="text-sm text-gray-500">May 1, 2023</div>
                    </TableCell>
                    <TableCell className="text-green-600">+$3,500.00</TableCell>
                    <TableCell className="hidden md:table-cell">Monthly salary from Acme Inc.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}