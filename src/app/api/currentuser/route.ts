import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import prisma from "@/libs/PrismaDB";

interface JwtPayload {
    id : number
}

export async function GET(request : NextRequest){
       try {

        let authToken = request.cookies.get("authToken")?.value;
        if(!authToken) {
            return NextResponse.json({
                ok : false,
                msg : "Not authenticated(no token)",
                user : {}
            }, {status : 401})
        }
        
        let key = process.env.JWT_KEY || "JWT_KEY";
        const {id} = jwt.verify(authToken , key) as JwtPayload;

        

        const existingUser = await prisma.user.findUnique({
            where : {
                id : id
            }
        })
        

        return NextResponse.json({
            ok : true,
            user : existingUser
        }, {status : 201})
        
       } catch (error) {
         console.log(error);
         return NextResponse.json({
            ok : false,
            msg : "error in fetching current user",
            user : {},
            error
         } , {status : 401})
       }
}