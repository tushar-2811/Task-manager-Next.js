import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prismaDB } from "@/libs/PrismaDB";

interface Params {
    params : {
        userId : number
    }
}

export async function GET(request : NextRequest , {params}:Params) {
    try {
    //    const searchParams = request.nextUrl.searchParams;
    //    const userid = Number(searchParams.get('userid'));

    const userid = Number(params.userId);


        const allTodo = await prismaDB.todo.findMany({
              where : {
                userId : userid
              }
        });

        if(!allTodo){
            return NextResponse.json({
                ok : true,
                msg : "all todos",
                todos : []
            })
        }
 
        return NextResponse.json({
            ok : true,
            msg : "all todo's of a user",
            todos : allTodo
        })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            ok : false,
            msg : "error in getting todo's",
            error
        },{status : 401})
    }
 }