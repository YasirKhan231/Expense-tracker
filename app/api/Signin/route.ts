import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';  
const client = new PrismaClient();


export async function  POST (req : NextRequest) {
const body = await req.json();
try{
const existinguser =  await client.user.findUnique({
  where : {
    email : body.email
  }
})
if(!existinguser) {
  return NextResponse.json({
    message : "user not exist in the database "
  },{status : 403})
}

const ispasswordvalid =  await bcrypt.compare(body.password,existinguser.password)
if(!ispasswordvalid) {
  return NextResponse.json({
    message : "password is not valid "
  }, {status : 403})
}
  return NextResponse.json({
    message :" login succesful with credirentioals",
  }, {status : 200})

} catch (e) {
return NextResponse.json({
  message :"eror while the login "})
}
}