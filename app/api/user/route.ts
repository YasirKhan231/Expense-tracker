import { NextRequest, NextResponse } from "next/server";

export  function GET() {
  return NextResponse.json({ username: "yasirkhan23", email: "yasrkhanpase@gmail.com" })
}

export async function POST (req:NextRequest) {
  const body = await  req.json();
  return NextResponse.json({username : body.username , email : body.email , password : body.password })

  // herer we hit the 

}

//postgresql://signup-db-expense_owner:tUR1rAdWGZ8I@ep-soft-meadow-a5p1ygcq.us-east-2.aws.neon.tech/signup-db-expense?sslmode=require