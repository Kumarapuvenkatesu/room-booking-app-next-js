// //export { auth as middleware } from "@/auth"
// 'use server';
// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export default async function middleware(req) {

//     const path=req.nextUrl.pathname;
//     const publicPaths=['/login','/register'].includes(path);
//     const token= await getToken({req:req,secret:process.env.NEXTAUTH_SECRET});
//     if(!token && !publicPaths){
//         return NextResponse.redirect(new URL('/login',req.url));
//     }else if(token && publicPaths){
//         return NextResponse.redirect(new URL('/',req.url));
//     }
// }
// export const config = {
//   matcher: ["/login","/register",'/components/:path*']
// }

'use server';
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const path = req.nextUrl.pathname;

  // Public routes
  const publicPaths = ['/login', '/register'];
  const isPublic = publicPaths.includes(path);

  // Get JWT token if user is logged in
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If trying to access protected route without token → redirect to login
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If logged in and trying to go to login/register → redirect to home
  if (token && isPublic) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!login|register).*)', // Protect all routes except /login and /register
  ]
};
