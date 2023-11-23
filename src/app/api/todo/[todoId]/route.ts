import { prismaDB } from "@/libs/PrismaDB";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface Params {
    params : {
        todoId : number
    }
}


// delete the todo
export async function DELETE(request : NextRequest, {params}: Params) {
      try {
        const todoId = Number(params.todoId);

        const DeletedTodo = await prismaDB.todo.delete({
            where : {
                id : todoId
            }
        })

        const RestTodo = await prismaDB.todo.findMany();

        return NextResponse.json({
            ok : true,
            msg : "deleted todo",
            todos : RestTodo
        }, {status : 201})
        
      } catch (error) {
         console.log(error);
         return NextResponse.json({
             ok : false,
             msg : "error in deleting todo",
             error
         } , {status : 401})
      }
}