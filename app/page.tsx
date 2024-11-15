"use client"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Bell, DollarSign, Home, PieChart, Plus, Settings, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useRouter } from 'next/navigation'

export default function AboutUs() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="ml-12 text-xl font-semibold">Hi, Alex 👋</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="lg" className="hidden md:inline-flex text-lg py-2 px-4" onClick={()=>{router.push("/signin")}}>
              Sign In
            </Button>
            <Button size="lg" className="hidden md:inline-flex text-lg py-2 px-4" onClick={()=>{router.push("/signup")}}>
              Sign Up
            </Button>
            <Button variant="ghost" size="icon" className="p-3">
              <Bell className="h-6 w-6" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="w-12 h-12">
              <AvatarFallback className=' '>AX</AvatarFallback>
              <AvatarImage src="/placeholder.svg" alt="User avatar" />
            </Avatar>
          </div>
        </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                About ExpenseTracker
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Your personal finance companion for effortless expense management and insightful financial tracking.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl mb-8 text-center">
              How It Works
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Log Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Easily add your daily expenses with just a few taps. Categorize and add notes for better organization.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    Visualize Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Get insightful charts and graphs to understand your spending patterns and financial habits.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Track Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Set budgets, monitor your savings goals, and track your financial progress over time.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Why Choose ExpenseTracker?</h2>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-green-500" />
                    <span>User-friendly interface for easy expense logging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-green-500" />
                    <span>Customizable categories and tags</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <User className="h-4 w-4 text-green-500" />
                    <span>Personal insights and spending recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-green-500" />
                    <span>Detailed reports and export options</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-xl font-bold">Start Managing Your Finances Today</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Join thousands of users who have taken control of their financial lives with ExpenseTracker.
                  It's time to make informed decisions about your money.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button onClick={()=>{router.push("/signup")}} className="flex-1">Sign Up Now</Button>
                  <Button onClick={()=>{router.push("/learn")}} variant="outline" className="flex-1">Learn More</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-gray-500 md:text-left dark:text-gray-400">
              © 2023 ExpenseTracker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}