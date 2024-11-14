import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import client from "@/db"


export async function POST(req: NextRequest) {
  try {
    // Define the type for the body
    const body: { email: string; password: string } = await req.json();

    // Query the user by email
    const existingUser = await client.user.findUnique({
      where: { email: body.email },
    });

    // Check if the user exists
    if (!existingUser) {
      return NextResponse.json(
        { message: "User does not exist in the database" },
        { status: 403 }
      );
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(
      body.password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Password is not valid" },
        { status: 403 }
      );
    }

    // Successful login response
    return NextResponse.json(
      { message: "Login successful with credentials" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Error occurred during login" },
      { status: 500 }
    );
  }
}
