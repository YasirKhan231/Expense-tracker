'use client'

import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bell, CreditCard, Home, PieChart, Wallet, Menu, X, DollarSign, TrendingUp, TrendingDown } from 'lucide-react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import logo from "@/app/logo.png"
import axios from "axios"
import Loading from '@/components/loading'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
interface Expense {
  category: string;
  totalAmount: number;
}
export default function BudgetPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [totalExpense , settotalExpense]=useState<Expense[]>([])
  const [sumtotalExpense , setsumtotalExpense]=useState(0)
  const [budgetamount , setbudgetamount]=useState(150000)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/signup')
      console.log("token are not present in the storage ")
      return
    }
    console.log(token);
    axios.post('/api/budget', { token: token })
      .then(response => {
        const {categoryExpenses , totalExpense} = response.data;
        settotalExpense(categoryExpenses);
        setsumtotalExpense(totalExpense);
        setIsLoading(false)
        
        console.log(response)
      })
      .catch(() => {
        console.log("token failed homepage ")
        localStorage.removeItem('token')
        router.push('/signin')
      })

  }, [router])

  if (isLoading) {
    return <div><Loading></Loading></div>
  }

  // Sample budget data
  const budgets = [
    { category: 'Food', budget: 500, spent: 350, icon: <CreditCard className="h-4 w-4" /> },
    { category: 'Rent', budget: 1200, spent: 1200, icon: <Home className="h-4 w-4" /> },
    { category: 'Utilities', budget: 300, spent: 280, icon: <Bell className="h-4 w-4" /> },
    { category: 'Transportation', budget: 200, spent: 150, icon: <TrendingUp className="h-4 w-4" /> },
    { category: 'Entertainment', budget: 150, spent: 100, icon: <PieChart className="h-4 w-4" /> },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Button
        variant="outline"
        size="icon"
        className={`fixed left-4 top-4 z-50 transition-all duration-300 lg:hidden ${isSidebarOpen ? 'left-[258px]' : 'left-4'}`}
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-4 flex items-center space-x-2">
          <h2 className="text-2xl font-bold">WalletWise</h2>
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

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        {/* Navbar */}
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image src={logo} alt="WalletWise Logo" width={64} height={64} onClick={() => router.push("/home")} className="object-contain hover:cursor-pointer" />
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/expenseAdd">
              <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Add Expense
              </Button>
            </Link>
            <Link href="/incomeAdd">
              <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Add Income
              </Button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Budget
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{budgetamount}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Spent
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{Math.abs(sumtotalExpense)}</div>
                <p className="text-xs text-muted-foreground">
                  
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Remaining
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                ₹{budgetamount +sumtotalExpense}
                </div>
                <p className="text-xs text-muted-foreground">
                  -5.2% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Monthly Budgets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {totalExpense.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{item.category}</span>
                      </div>
                      <span>₹{Math.abs(item.totalAmount)} / 50000</span>
                    </div>
                    <Progress value={(Math.abs(item.totalAmount) /50000) * 100} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {((Math.abs(item.totalAmount) / 50000) * 100).toFixed(1)}% of budget used
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t py-4 mt-auto">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600">
            © 2023 Walletwise. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  )
}

