"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CreditCard, Home, PieChart, Wallet } from 'lucide-react'
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "@/components/loading"
import Link from "next/link"
export default function AboutUsPage() {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">About WalletWise</h1>
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

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">About Walletwise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
              <p>
                At Walletwise, we're on a mission to empower individuals and families to achieve financial wellness. We believe that everyone deserves access to powerful, yet easy-to-use tools for managing their finances. Our goal is to simplify expense tracking, budgeting, and financial planning, making it accessible to everyone, regardless of their financial expertise.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Intuitive Expense Logging: Quickly and easily log your expenses on-the-go.</li>
                <li>Income Tracking: Keep track of all your income sources in one place.</li>
                <li>Custom Categories: Organize your transactions with personalized categories.</li>
                <li>Budget Creation: Set up and manage budgets for different expense categories.</li>
                <li>Visual Reports: Get insights into your spending habits with clear, visual reports.</li>
                <li>Goal Setting: Set financial goals and track your progress over time.</li>
                <li>Bank Sync: Securely connect your bank accounts for automatic transaction import.</li>
                <li>Multi-device Sync: Access your data across all your devices.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Sign Up: Create your free account in just a few clicks.</li>
                <li>Set Up: Connect your bank accounts or start manually logging transactions.</li>
                <li>Categorize: Assign categories to your expenses for better organization.</li>
                <li>Analyze: View your spending patterns through our intuitive dashboard.</li>
                <li>Budget: Create budgets based on your spending history and financial goals.</li>
                <li>Track: Monitor your progress and adjust your spending habits as needed.</li>
                <li>Grow: Use insights from Walletwise to make informed financial decisions.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Our Commitment to Security</h2>
              <p>
                We understand the sensitivity of financial data. That's why we employ bank-level encryption and security measures to ensure your information is always protected. We never sell your personal data, and you have full control over your information at all times.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Join Us on Your Financial Journey</h2>
              <p>
                Whether you're looking to get out of debt, save for a big purchase, or simply gain better control over your finances, Walletwise is here to help. Join thousands of users who have already taken control of their financial lives with our powerful yet user-friendly platform.
              </p>
              <div className="mt-4">
                <Button size="lg" onClick={() => router.push("/signup")}>Get Started Today</Button>
              </div>
            </section>
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
  )
}