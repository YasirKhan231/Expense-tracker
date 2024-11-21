'use client'

import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CreditCard, Home, PieChart, Wallet, Menu, X } from 'lucide-react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import logo from "@/app/logo.png"
import Link from 'next/link'
import axios from "axios"
import Loading from '@/components/loading'

interface Expense {
  category: string;
  totalAmount: number;
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [monthlyExpenses, setMonthlyExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      router.push('/signup');
      return;
    }
  
    const fetchTransactions = async () => {
      try {  
        const categoryResponse = await axios.post('/api/category', { token });
        console.log("after the response ")
        console.log(categoryResponse)
        const { expenses } = categoryResponse.data;

        setMonthlyExpenses(expenses);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchTransactions();
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  const totalExpenses = monthlyExpenses.reduce((sum, expense) => sum + Math.abs(expense.totalAmount), 0)

console.log(totalExpenses)
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Button
        variant="outline"
        size="icon"
        className={`fixed left-4 top-4 z-50 md:hidden ${isSidebarOpen ? 'left-[230px]' : 'left-4'}`}
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">WalletWise</h2>
        </div>
        <nav className="space-y-2 p-2">
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

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
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
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Category wise Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyExpenses.map((expense, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{expense.category}</span>
                    <span>₹{Math.abs(expense.totalAmount).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-4 font-bold flex justify-between items-center">
                  <span>Total Expenses</span>
                  <span>₹{totalExpenses.toFixed(2)}</span>
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
                      style={{ height: Math.abs((expense.totalAmount*200)/totalExpenses) }}
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
            © 2023 WalletWise. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  )
}