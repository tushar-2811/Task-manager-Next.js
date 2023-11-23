import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request : NextRequest) {

      const authToken = request.cookies.get('authToken')?.value;

      let loggedInUserNotAccessedPath = request.nextUrl.pathname == '/login' || request.nextUrl.pathname === '/signup';

      if(loggedInUserNotAccessedPath){
        if(authToken){
            return NextResponse.redirect(new URL('/profile' , request.url ));
        }
      }
      else{
        if(!authToken){
            return NextResponse.redirect(new URL('/login' , request.url));
        }
      }


    //   if(!request.cookies.has("authToken")){
    //     //   return NextResponse.rewrite(new URL('/login' , request.url));
    //     return NextResponse.redirect(new URL('/login' , request.url));
    //   }

      
}

export const config = {
    matcher : ["/profile" , '/show' , '/add' , '/login' ,'/signup']
}