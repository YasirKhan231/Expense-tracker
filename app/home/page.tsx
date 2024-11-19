'use client'

import { useEffect, useState } from 'react'
import { Bell, CreditCard, Home, Menu, PieChart, PlusCircle, Wallet, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation'
import Image from 'next/image'; // Import Image component for handling logos
import logo from "@/app/logo.png"
import axios from "axios"
import Loading from '@/components/loading'
import Link from 'next/link'
interface Transaction {
  id: number;
  name: string;
  amount: number;
  description?: string;
  category?: string; // Optional field
  date: string;
}
interface SpendingData {
  day: string;
  amount: number;
}
export default function Component() {
  
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [Transactions , setTransactions]=useState<Transaction[]>([])
  const [totalexpense , settotoalexpense]=useState(0);
  const [totalincome , settotalincome] =useState(0)
  const [spendingData , setspendingData] = useState<SpendingData[]>([])
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
        const { expenses, incomes,last30DaysTotalExpenses , last30DaysTotalIncomes ,spendingData} = transactionResponse.data;
     settotalincome(last30DaysTotalIncomes);
     settotoalexpense(last30DaysTotalExpenses)
     setspendingData(spendingData);
        const normalizedExpenses = expenses.map((expense: any) => ({
          id: expense.id,
          name: expense.name, // Use the name field directly
          amount: expense.amount,
          description: expense.description,
          category: expense.category,
          date: expense.date,
        }));
  
        const normalizedIncomes = incomes.map((income: any) => ({
          id: income.id,
          name: income.Incomename, // Map incomename to name
          amount: income.amount,
          description: income.description,
          date: income.date,
        }));
  
        setTransactions([...normalizedExpenses, ...normalizedIncomes]);
        // const LimitedTransactions = Transactions.slice(0,4)
      } catch  {
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchTransactions();
  }, [router]);
  if (isLoading) {
    return <div> <Loading></Loading> </div>  // Show a loading spinner or something until the check is complete
  }

 


  

  const maxAmount = Math.max(...spendingData.map(d => Math.abs(d.amount)));
  
  // Convert the amounts to positive values for rendering
  const transformedData = spendingData.map(item => ({
    day: item.day,
    amount: Math.abs(item.amount),  // Ensure all amounts are positive
  }));
  
  console.log("Transformed Data:", transformedData); // Log the transformed dat
  console.log(maxAmount)
  

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
   const LimitedTransactions = Transactions.slice(0,4)
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
          <h2 className=" text-2xl font-bold">WalletWise</h2>
        </div>
        
        <nav className="space-y-2 p-2 mt-4">
          <Button variant="ghost" className="w-full justify-start" onClick={()=>{router.push("/home")}}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start"  onClick={()=>{router.push("/analytics")}}  >
            <PieChart className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start"  onClick={()=>{router.push("/transaction")}}>
            <CreditCard className="mr-2 h-4 w-4" />
            Transactions
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => { router.push("/budget") }}>
            <Wallet className="mr-2 h-4 w-4" />
            Budgets
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={()=>{router.push("/about")}}>
          <InformationCircleIcon className="mr-2 h-4 w-4" />
            About us 
          </Button>
        </nav>
      </aside>

      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-white border-b p-4 flex justify-between items-center">
          {/* Replacing the greeting text with the logo */}
          <div className="ml-12 flex items-center space-x-4">
            <Image src={logo} alt="WalletWise Logo" width={64} height={64} className="object-contain cursor-pointer" />
            {/* Optional, add a logo description or tagline */}
            {/* <span className="text-xl font-semibold">WalletWise</span> */}
          </div>
          <div className="flex items-center space-x-4">
          <Link href="/signin">
          <Button
            variant="default"
            className="bg-primary text-primary-foreground hover:bg-primary/90 mr-4"
           
          >
            Sign In
          </Button>
          </Link>
          <Link href="/signup">
          <Button
            variant="default"
            className="bg-primary text-primary-foreground hover:bg-primary/90 mr-6"
           
          >
            Sign Up
          </Button></Link>
          
        </div>
        </header>

        {/* New feature: Stylized text */}
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
            <Button size="lg" className="w-full max-w-md h-16 text-lg font-semibold rounded-xl shadow-lg bg-black hover:bg-gray-800 text-white transition-colors" onClick={()=>{router.push("/expenseAdd")}}>
              <PlusCircle className="h-6 w-6 mr-2" />
              Add Expense
            </Button>
            <Button size="lg" className="w-full max-w-md h-16 text-lg font-semibold rounded-xl shadow-lg bg-black hover:bg-gray-800 text-white transition-colors"  onClick={()=>{router.push("/incomeAdd")}}>
              <PlusCircle className="h-6 w-6 mr-2" />
              Add Income
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalincome+totalexpense}</div>
                <p className="text-xs text-muted-foreground">Last 30 days Total Balance</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalexpense}</div>
                <p className="text-xs text-muted-foreground">Last 30 days Total expense</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalincome}</div>
                <p className="text-xs text-muted-foreground">Last 30 days Total income</p>
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
                          style={{ 
                            height: `${Math.abs((data.amount * 100) / maxAmount)}%`,
                            transition: 'height 0.5s ease' // Adding a smooth transition for better UX
                          }}
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
                  {LimitedTransactions.map((transaction , index) => (
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

