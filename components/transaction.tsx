'use client'

import { useEffect, useState } from 'react'
import { Bell, CreditCard, Home, Menu, MinusCircle, PieChart, PlusCircle, Wallet, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import Image from 'next/image'; // Import Image component for handling logos
import logo from "@/app/logo.png" // Your logo image path
import axios from "axios"
import Loading from './loading'
import Link from 'next/link'
interface Transaction {
  id: number;
  name: string;
  amount: number;
  description?: string;
  category?: string; // Optional field
  date: string;
}
export default function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [userId,setuserId]=useState(1);
  const router = useRouter()
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalexpense , settotoalexpense]=useState(0)
  const [totolincome , setincometotal] =useState(0)
  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      router.push('/signup');
      return;
    }
  
    const fetchTransactions = async () => {
      try {
        const response = await axios.post('/api/verify-token', { token });
        const userId = response.data.user.id;
  
        const transactionResponse = await axios.post('/api/transaction', { userId });
        const { expenses, incomes, totalExpenses, totalIncomes } = transactionResponse.data;
        settotoalexpense(totalExpenses);
        setincometotal(totalIncomes);
  
        const normalizedExpenses = expenses.map((expense: any) => ({
          id: expense.id,
          name: expense.name, // Use the name field directly
          amount: expense.amount,
          description: expense.description,
          category: expense.category,
          date: new Date(expense.date), // Convert to Date object for easier sorting
        }));
  
        const normalizedIncomes = incomes.map((income: any) => ({
          id: income.id,
          name: income.Incomename, // Map incomename to name
          amount: income.amount,
          description: income.description,
          date: new Date(income.date), // Convert to Date object for easier sorting
        }));
  
        const sortedTransactions = [...normalizedExpenses, ...normalizedIncomes].sort(
          (a, b) => b.date.getTime() - a.date.getTime()
        );
  
        setTransactions(sortedTransactions);
      } catch (err) {
        setError('Failed to fetch transactions');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchTransactions();
  }, [router]);
  
  
  
  if (isLoading) {
    return <div><Loading></Loading></div>  // Show a loading spinner or something until the check is complete
  }

  const spendingData = [
    { day: "Mon", amount: 120 },
    { day: "Tue", amount: 240 },
    { day: "Wed", amount: 180 },
    { day: "Thu", amount: 320 },
    { day: "Fri", amount: 280 },
    { day: "Sat", amount: 400 },
    { day: "Sun", amount: 200 },
  ]

  

  const maxAmount = Math.max(...spendingData.map(d => d.amount))

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

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
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold">WalletWise</h2>
        </div>
        
        <nav className="space-y-2 p-2 mt-4">
          <Button variant="ghost" className="w-full justify-start" onClick={() => { router.push("/home") }}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button onClick={() => { router.push("/analytics") }} variant="ghost" className="w-full justify-start">
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
          <Link href="/about"><Button variant="ghost" className="w-full justify-start" >
            <InformationCircleIcon className="mr-2 h-4 w-4" />
            About us 
          </Button></Link>
          
        </nav>
      </aside>

      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-white border-b p-4 flex justify-between items-center">
          {/* Replacing the "Hi, Alex 👋" greeting with the logo */}
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
          </Button></Link>
          
        </div>
        </header>

        {/* Main content */}
        <div className="p-8">
          {/* You can add your content here, like cards, tables, etc. */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Financial Overview</CardTitle>
              <CardDescription>Track your expenses and income at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800">Total Income</h3>
                  <p className="text-2xl font-bold text-green-600">₹{totolincome}</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800">Total Expenses</h3>
                  <p className="text-2xl font-bold text-red-600">₹{totalexpense}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Net Balance</h3>
                  <p className="text-2xl font-bold text-blue-600">₹{totolincome+totalexpense}</p>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <Button size="lg" className="w-40 h-12" onClick={() => { router.push("/incomeAdd") }}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Income
                </Button>
                <Button size="lg" className="w-40 h-12" onClick={() => { router.push("/expenseAdd") }}>
                  <MinusCircle className="mr-2 h-4 w-4" /> Add Expense
                </Button>
              </div>
            </CardContent>
          </Card>


          {/* Recent Transactions */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Recent Transactions</h2>
            <div className="space-y-4 mt-4">
            {transactions.map((transaction , index )=> (
        <Card key={`transaction-${transaction.id}-${index}`}>
          <CardContent className="flex justify-between">
            <div>
              <h3 className="font-semibold">{transaction.name || transaction.name}</h3>
              <p className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
            </div>
            <div>
              <p className={`font-bold ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {transaction.amount < 0 ? '-' : '+'}₹{Math.abs(transaction.amount).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
            </div>  
          </div>
        </div>
      </main>
    </div>
  )
}
