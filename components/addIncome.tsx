'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, CalendarIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from 'next/navigation'

export default function AddIncomePage() {
  const [Incomename, setIncomeName] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Date>()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const incomeData = {
      Incomename,
      amount: parseFloat(amount),
      description,
      date: date ? date.toISOString() : null,
    }

    try {
       await axios.post("http://localhost:3000/api/income/add", incomeData)
      
      toast({
        description: "Income added successfully.",
      })
      router.push("/")

      // Reset form fields
      setIncomeName('')
      setAmount('')
      setDescription('')
      setDate(undefined)
    } catch (error) {
      toast({
        //@ts-ignore
        description: error.response?.data?.error || "An error occurred while adding the income.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <h1 className="ml-9 text-xl font-semibold">Hi, Alex 👋</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="lg" className="hidden md:inline-flex text-lg py-2 px-4">Home</Button>
          <Button variant="ghost" size="lg" className="hidden md:inline-flex text-lg py-2 px-4">Sign In</Button>
          <Button size="lg" className="hidden md:inline-flex text-lg py-2 px-4">Sign Up</Button>
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
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Add New Income</CardTitle>
            <CardDescription>Enter the details of your new income</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="income-name">Income Name</Label>
                  <Input
                    id="income-name"
                    placeholder="e.g., Salary, Freelance Work"
                    value={Incomename}
                    onChange={(e) => setIncomeName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Add any additional details here"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <Button type="submit" className="w-full mt-4">Add Income</Button>
            </form>
          </CardContent>
          <CardFooter />
        </Card>
      </main>
    </div>
  )
}
