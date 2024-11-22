import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import client from "@/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = "yasirsecret"; // Your JWT secret key

export async function POST(req: NextRequest) {
  try {
    const body: { email: string; password: string } = await req.json();

    // Check if the user exists
    const existingUser = await client.user.findUnique({
      where: { email: body.email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User does not exist in the database" },
        { status: 403 }
      );
    }

    // Log stored and entered passwords for debugging
    console.log('Stored Password Hash:', existingUser.password);
    console.log('Entered Password:', body.password);

    // Compare passwords using bcrypt
    const isPasswordValid = await bcrypt.compare(
      body.password.trim(), // Trim any extra spaces
      existingUser.password.trim()
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Password is not valid" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Successful login response
    return NextResponse.json(
      { message: "Login successful with credentials", token }
    );
  } catch  {
    return NextResponse.json(
      { message: "Error occurred during login" },
      { status: 500 }
    );
  }
}