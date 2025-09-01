//export { auth as middleware } from "@/auth"
'use server';
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req) {

    const path=req.nextUrl.pathname;
    const publicPaths=['/login','/register'].includes(path);
    const token= await getToken({req:req,secret:process.env.NEXTAUTH_SECRET});
    if(!token && !publicPaths){
        return NextResponse.redirect(new URL('/login',req.url));
    }else if(token && publicPaths){
        return NextResponse.redirect(new URL('/',req.url));
    }
}
export const config = {
  matcher: ["/login","/register",'/components/bookings/:path*','/components/dashboard/:path*','/components/bookings','/components/dashboard']
}
