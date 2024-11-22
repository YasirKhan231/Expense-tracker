
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import client from "@/db"
import jwt from "jsonwebtoken"

const JWT_SECRET ="yasirsecret"

export async function POST (req:NextRequest) {
  const body = await  req.json();
  try{
    const existinguser = await client.user.findFirst({
      where : {
        email : body.email
      }
    })
    if(existinguser) {
      return NextResponse.json({message :" user already exist "})
    }
    const hashedpassword =  await bcrypt.hash(body.password , 10);
    const newUser = await client.user.create({
      data:{
        username :body.username,
        email : body.email,
        password :hashedpassword
      }
    })
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: "7d" } // Token expiry
    );
    return NextResponse.json( {
      message : "user created succesfully "
     ,token})
  } catch (error) {
    return NextResponse.json({ message :"error while signinig up " , error}, {
      status : 411
    } )
  }
  
  
  // herer we hit the database 

}
