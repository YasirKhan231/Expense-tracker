'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle, Search, Home, BarChart2, User, Settings } from 'lucide-react'

export default function ExpenseTrackerHomepage() {
  const [expenseName, setExpenseName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')

  const categories = ['Food', 'Travel', 'Utilities', 'Entertainment', 'Shopping']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Expense added:', { expenseName, amount, category })
    // Reset form fields
    setExpenseName('')
    setAmount('')
    setCategory('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="ml-2 text-xl font-semibold text-gray-900">ExpenseTracker</span>
            </div>
            <div className="flex items-center space-x-4">
              {['Home', 'Insights', 'Profile', 'Settings'].map((item) => (
                <Button key={item} variant="ghost" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  {item === 'Home' && <Home className="h-5 w-5 mr-1" />}
                  {item === 'Insights' && <BarChart2 className="h-5 w-5 mr-1" />}
                  {item === 'Profile' && <User className="h-5 w-5 mr-1" />}
                  {item === 'Settings' && <Settings className="h-5 w-5 mr-1" />}
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow mt-16 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12 animate-fade-in-down">
            Track Your Expenses
          </h1>

          {/* Add Expense Form */}
          <Card className="mb-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Expense</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Expense Name"
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200">
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Add Expense
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* AI-powered Expense Analysis */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Expense Analysis</h2>
              <div className="flex items-center space-x-4">
                <Input 
                  type="text" 
                  placeholder="Ask about your expenses or get improvement suggestions..." 
                  className="flex-grow"
                />
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200">
                  <Search className="h-5 w-5 mr-2" />
                  Analyze
                </Button>
              </div>
              <div className="mt-4 text-sm text-gray-600 space-y-2">
                <p>Examples:</p>
                <p>• "How much did I spend on food last month?"</p>
                <p>• "Suggest ways to reduce my utility expenses"</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2023 ExpenseTracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}



