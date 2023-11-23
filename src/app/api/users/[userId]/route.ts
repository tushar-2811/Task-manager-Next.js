import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/libs/PrismaDB";
import {z} from 'zod';

const userSchema = z.object({
   name : z.string().min(3).max(20),
   userName : z.string().min(3).max(20),
   password : z.string().min(3).max(20)
})

// const prisma = new PrismaClient();
interface Params{
   params : {
      userId : number
   }
}

// getting single user
export async function GET(request: NextRequest , {params} : Params) {
     try {
        const userId = Number(params.userId);
        const User = await prisma.user.findUnique({
         where : {
            id : userId
         }
        })

        return NextResponse.json({
         ok : true,
         msg : "user found",
         user : User
        })
     } catch (error) {
      console.log(error);
      return NextResponse.json({
         ok : false,
         msg : "error",
         error
      },{status : 401})
     }
    
      
}


// deleting user
export async function DELETE(request:NextRequest , {params} : Params) {
   try {
      const userId = Number(params.userId);

      const existingUser = await prisma.user.delete({
         where : {
            id : userId
         }
      })

      return NextResponse.json({
         ok: true,
         msg : `${existingUser.name}'s account deleted`
      } , {status : 201})
      
   } catch (error) {
      console.log(error);
      return NextResponse.json({
         ok : false,
         msg : "error in deleting user"
      },{status : 401})
   }
}


// updating user
export async function PUT(request : NextRequest , {params} : Params) {
   try {
     
      const userId = Number(params.userId);
      const {name , userName , password} = await request.json();

      const parsedInput = userSchema.safeParse({name , userName , password});

      if(!parsedInput.success){
         return NextResponse.json({
            ok : false,
            msg : "error in input validation",
            error : parsedInput.error
         },{status : 401})
      }

      const updatedUser = await prisma.user.update({
         where : {
            id : userId
         },
         data : {
            name : name,
            userName : userName,
            password : password
         }
      })

      return NextResponse.json({
         ok : true,
         msg : "user updated",
         user : updatedUser
      },{status : 201})
      
   } catch (error) {
      console.log(error);
      return NextResponse.json({
         ok : false,
         msg : "error in updating user"
      },{status : 401})
   }
}

