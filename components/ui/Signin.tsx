'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Both fields are required')
      return
    }
    router.push('/');

    axios.post("http://localhost:3000/api/Signin", { email, password })
      .then(() => router.push('/'))
      .catch(() => setError('Invalid email or password'))

    setEmail('')
    setPassword('')
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gray-100">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-200">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-200">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-100 px-4 py-3 rounded-md" role="alert">
                <span className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </span>
              </div>
            )}
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-400 w-full">
            Don’t have an account?{' '}
            <Link href="/user/signup" className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
      <footer className="mt-8 text-center text-gray-500 text-sm">
        © 2023 ExpenseTracker. All rights reserved.
      </footer>
    </div>
  )
}
