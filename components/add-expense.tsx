'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar as CalendarIcon, Home } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from "@/components/ui/toast"

export default function AddExpensePage() {
  const [name, setname] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Date>()
  const { toast } = useToast()
 const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const expenseData = {
      name , 
      amount :parseFloat(amount),
      category,
      description,
      date : date ? date.toISOString() :null,
    }
    console.log("Sending expense data:", expenseData);
    try {
       await axios.post("http://localhost:3000/api/expense/add" , expenseData);

      toast({
        description: "Expense added successfully.",
      });
      router.push("/");
      

      setname('');
    setAmount('');
    setCategory('');
    setDescription('');
    setDate(undefined);

    } catch (error ) {
      console.error('Error adding expense:', error);
  
      toast({
       //@ts-expect-error
        description: error.response?.data?.error || "An error occurred while adding the expense.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }

    
    
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <div className="flex-shrink-0 flex items-center">
        <span className="font-bold text-xl text-black">ExpenseDown</span>
      </div>
      <div className="flex space-x-4 items-center">
        <Link href="/">
          <Button variant="ghost" className="text-black">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="ghost" className="text-black">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="ml-4 bg-black text-white hover:bg-gray-800">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  </div>
</nav>


      <div className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white border-gray-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Add Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expense-name">Expense Name</Label>
                <Input
                  id="expense-name"
                  placeholder="Enter expense name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="clothes">Clothes</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter a description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
                Add Expense
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}