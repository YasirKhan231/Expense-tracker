'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const isFormComplete = username && email && password && password.length >= 8

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!isFormComplete) {
      setError('All fields are required and password must be at least 8 characters long')
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.post("/api/Signup", { username, password, email })

      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        toast({
          title: "Sign Up Successful",
          description: "Welcome to WalletWise!",
          duration: 5000,
        })
        router.push('/home')
      } else {
        setError('Failed to sign up. Please try again.')
      }

      setUsername('')
      setEmail('')
      setPassword('')
    } catch  {
      setError('Error occurred during signup. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md bg-white border-gray-200 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gray-900">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-black"
              />
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md" role="alert">
                <span className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </span>
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-black hover:bg-gray-800 text-white transition-colors duration-200"
              disabled={!isFormComplete || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing Up...
                </>
              ) : (
                <>
                  Sign Up
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-600 w-full">
            Already have an account?{' '}
            <Link href="/signin" className="text-black hover:text-gray-700 transition-colors duration-200">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
      <footer className="mt-8 text-center text-gray-500 text-sm">
        © 2023 Walletwise. All rights reserved.
      </footer>
    </div>
  )
}