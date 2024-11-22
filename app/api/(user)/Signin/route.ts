import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import client from "@/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = "yasirsecret";

export async function POST(req: NextRequest) {
  try {
    const body: { email: string; password: string } = await req.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await client.user.findFirst({
      where: { email: body.email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User does not exist in the database" },
        { status: 403 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      body.password.trim(),
      existingUser.password.trim()
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Password is not valid" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      { message: "Login successful with credentials", token }
    );
  } catch  {
    console.log("Error during login:");
    return NextResponse.json(
      { message: "Error occurred during login" },
      { status: 500 }
    );
  }
}
