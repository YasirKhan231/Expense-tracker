import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
const client = new PrismaClient();


export async function POST (req:NextRequest) {
  const body = await  req.json();
  try{
    const existinguser = await client.user.findUnique({
      where : {
        email : body.email
      }
    })
    if(existinguser) {
      return NextResponse.json({message :" user already exist "})
    }
    const hashedpassword =  await bcrypt.hash(body.password , 10);
    await client.user.create({
      data:{
        username :body.username,
        email : body.email,
        password :hashedpassword
      }
    })
    return NextResponse.json( {
      message : "user created succesfully "
    })
  } catch (e) {
    return NextResponse.json({ message :"error while signinig up "}, {
      status : 411
    })
  }
  
  
  // herer we hit the database 

}
