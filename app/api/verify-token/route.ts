import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken' // assuming you're using JWT for token signing
import { PrismaClient } from '@prisma/client';
import client from "@/db"
import { NextRequest, NextResponse } from 'next/server';
const JWT_SECRET = "yasirsecret"



export  async function POST(req: NextRequest, res: NextResponse) {
  interface JwtPayload {
    id: number;
    email: string;
  }
  
  if (req.method !== 'POST') {
    return NextResponse.json({ msg:"Method not alloweddddd "}, {status:405});
  }
  const { token } =await req.json()
  console.log("token")
  try {
    console.log("inside try c");
    const decoded = jwt.verify(token, JWT_SECRET)as JwtPayload;;
     
    // Check if the token is associated with an existing user (replace with your database query)
    const user = await client.user.findUnique({
      where: { id: decoded.id }, // Use the ID from the decoded token
      select: { id: true, email: true, username: true } // Return necessary fields, exclude password
    });
    
    if (!user) {
      return NextResponse.json({ message: 'Token not found in the database' });
    }

    // If the token is valid and found in the database
    return NextResponse.json({ message: 'Token is valid', user }, {status :200});

  } catch (error) {
    // If the token is invalid or expired
    return NextResponse.json({ message: 'Invalid or expired token' });
  }
}
