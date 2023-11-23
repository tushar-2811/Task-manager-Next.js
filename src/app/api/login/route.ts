import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'
import {z} from 'zod'

const prisma = new PrismaClient();

const userSchema = z.object({
    userName : z.string().min(3).max(20),
    password : z.string().min(3).max(20)
})

export async function POST(request: NextRequest){
    try {
        const data = await request.json();
        const parsedInput = userSchema.safeParse(data);

        if(!parsedInput.success){
            return NextResponse.json({
                ok : false,
                msg : "input validation failed",
                error : parsedInput.error
            },{status : 401})
        }

        const existingUser = await prisma.user.findUnique({
            where : {
                userName : data.userName
            }
        })

        if(!existingUser || existingUser.password !== data.password) {
            return NextResponse.json({
                ok : false,
                msg : "Invalid Credentials"
            },{status : 401})
        }

        let key = process.env.JWT_KEY || "JWT_KEY";
        const token = jwt.sign({id : existingUser.id} , key , {expiresIn : '24h'})


        const response = NextResponse.json({
            ok : true,
            msg : "successful",
            userName : existingUser.userName,
        },{status : 201 })

        response.cookies.set("authToken" , token ,);
        return response;

        
    } catch (error) {
        return NextResponse.json({
            ok : false,
            msg : "error"
        },{status : 401 })
    }
}