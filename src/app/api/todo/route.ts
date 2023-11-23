import { prismaDB } from "@/libs/PrismaDB";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {z} from 'zod';

const todoSchema = z.object({
    title : z.string().min(2).max(30),
    body : z.string().min(3).max(40),
    status : z.boolean(),
    userId : z.number()
})


// create new Todo
export async function POST(request: NextRequest) {
      try {
        let {title , body , status , userId} = await request.json();
        const parsedInput = todoSchema.safeParse({title , body , status , userId});

        if(!parsedInput.success){
            return NextResponse.json({
                ok : false,
                msg : "error in input validation",
                error : parsedInput.error
            },{status : 401})
        }
        

        const newTask = await prismaDB.todo.create({
            data : {
                title : title,
                body : body,
                status : status,
                userId : userId
            }
        })

        return NextResponse.json({
            ok : true,
            msg : "task created",
            task : newTask
        })

        
      } catch (error) {
         console.log(error);
         return NextResponse.json({
            ok : false,
            msg : "error in creating todo"
         },{status : 401})
      }
}



// to get all todo's of a user
export async function GET(request : NextRequest) {
    try {
       const searchParams = request.nextUrl.searchParams;
       const userid = Number(searchParams.get('userid'));


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