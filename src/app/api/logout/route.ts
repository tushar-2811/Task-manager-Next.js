import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            ok : true,
            msg : "logout successful"
        });

        response.cookies.set("authToken" , "" , {
            expires : new Date(0)
        });

        return response
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            ok : false,
            msg : "error in removing cookies"
        }, {status : 401})
    }
}