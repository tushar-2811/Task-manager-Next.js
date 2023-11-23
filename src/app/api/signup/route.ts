import { PrismaClient } from "@prisma/client";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {z} from 'zod'

const userSchema = z.object({
    name : z.string().min(3).max(20),
    userName : z.string().min(3).max(20),
    password : z.string().min(3).max(20)
})

const prisma = new PrismaClient();


export async function POST(request: NextRequest){
       try {
        const data = await request.json();

       const parsedInput = userSchema.safeParse(data);
       if(!parsedInput.success) {
        return NextResponse.json({
            ok : false,
            msg : "input validation failed",
            error : parsedInput.error
        },{status : 401})
       }


       const checkExistingUser = await prisma.user.findUnique({
        where : {
            userName : data.userName
        }
       })

       if(checkExistingUser){
         return NextResponse.json({
            ok : false,
            msg : "user already exist"
         } , {status : 201})
       }

       const newUser = await prisma.user.create({
        data : {
            name : data.name,
            userName : data.userName,
            password : data.password
        }
       })
  

       return NextResponse.json({
        ok : true,
        user : newUser
       },{status : 201})


       } catch (error) {
          return NextResponse.json({
            ok : false,
            msg : "error occured",
            error
          })
       }
}