import { PrismaClient } from "@prisma/client";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest){
    try {

        const allUsers = await prisma.user.findMany();

        return NextResponse.json({
            ok : true,
            users : allUsers
        },{status : 201})

        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            ok : false,
            msg : "error",
            error
        },{status : 401})
    }
}