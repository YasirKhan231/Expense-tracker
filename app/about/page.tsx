"use client"

import {  useState } from 'react'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  CreditCard, Home, PieChart, Wallet, Menu, X } from 'lucide-react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'; 
import logo from "@/app/logo.png" 
import Link from 'next/link'
export default function AboutUsPage() {
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

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Welcome to WalletWise</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Walletwise is your ultimate companion for managing personal finances. We understand that keeping track of your expenses and income can be challenging, which is why we've created a simple, intuitive, and powerful tool to help you take control of your financial life.
              </p>
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="mb-4">
                Our mission is to empower individuals and families to achieve financial wellness through better expense tracking, budgeting, and financial insights. We believe that everyone should have access to tools that make financial management easy and effective.
              </p>
              <h3 className="text-xl font-semibold mb-2">Key Features</h3>
              <ul className="list-disc list-inside mb-4">
                <li>Easy expense and income tracking</li>
                <li>Customizable budgets and financial goals</li>
                <li>Insightful analytics and reports</li>
                <li>Secure and private data management</li>
                <li>Multi-platform support (web, iOS, and Android)</li>
              </ul>
              <h3 className="text-xl font-semibold mb-2">Our Story</h3>
              <p className="mb-4">
                Walletwise was founded in 2023 by a team of finance professionals and software engineers who were frustrated with the complexity of existing financial management tools. We set out to create a solution that combines powerful features with a user-friendly interface, making it accessible to everyone, regardless of their financial expertise.
              </p>
              <h3 className="text-xl font-semibold mb-2">Our Commitment</h3>
              <p className="mb-4">
                We are committed to continuously improving Walletwise based on user feedback and the latest financial management best practices. Our team works tirelessly to ensure that you have the best tools at your fingertips to manage your finances effectively.
              </p>
              <p>
                Thank you for choosing Walletwise. We're excited to be part of your journey towards financial success!
              </p>
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
