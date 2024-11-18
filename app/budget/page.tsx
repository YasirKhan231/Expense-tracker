'use client'

import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CreditCard, Home, PieChart, Wallet, Menu, X } from 'lucide-react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Progress } from '@radix-ui/react-progress'
import Image from 'next/image'; 
import logo from "@/app/logo.png" 
import axios from "axios"
import Loading from '@/components/loading'
export default function BudgetPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/signup')
      console.log("token are not presrnt in the storage ")
      return  
    }
     console.log(token);
    axios.post('http://localhost:3000/api/verify-token', { token:token })
      .then(response => {
        setIsLoading(false)
        console.log(response)
      })
      .catch(() => {
        console.log("tken failed homepage ")
        localStorage.removeItem('token') 
        router.push('/signin')
      })
     
  }, [router])
  if (isLoading) {
    return <div><Loading></Loading></div>  
  }

  // Sample budget data
  const budgets = [
    { category: 'Food', budget: 500, spent: 350 },
    { category: 'Rent', budget: 1200, spent: 1200 },
    { category: 'Utilities', budget: 300, spent: 280 },
    { category: 'Transportation', budget: 200, spent: 150 },
    { category: 'Entertainment', budget: 150, spent: 100 },
  ]

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
          <h2 className="text-2xl font-bold mb-4">WalletWise</h2>
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
          {/* Replacing the "Budget Overview" header with the logo */}
          <div 
            className="ml-12 flex items-center space-x-4 cursor-pointer"
            onClick={() => router.push("/home")}
          >
            <Image 
              src={logo} 
              alt="WalletWise Logo" 
              width={64} 
              height={64} 
              className="object-contain" 
            />
            {/* Optional, add a logo description or tagline */}
            {/* <span className="text-xl font-semibold">WalletWise</span> */}
          </div>

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
              <CardTitle>Monthly Budgets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {budgets.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{item.category}</span>
                      <span>${item.spent} / ${item.budget}</span>
                    </div>
                    <Progress value={(item.spent / item.budget) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Budget Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Budget</span>
                  <span className="font-bold">${budgets.reduce((sum, item) => sum + item.budget, 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Spent</span>
                  <span className="font-bold">${budgets.reduce((sum, item) => sum + item.spent, 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Remaining</span>
                  <span className="font-bold text-green-600">
                    ${budgets.reduce((sum, item) => sum + (item.budget - item.spent), 0)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t py-4">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600">
            © 2023 Walletwise. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  )
}
