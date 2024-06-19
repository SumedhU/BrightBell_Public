import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(req: NextRequest) {
    console.log("-------");
    console.log(req.url);
    const authCookie = req.cookies.get('auth');
    const token = authCookie?.value;
    // console.log(if(token));
    console.log(token);
    
    if (token) {
        console.log("token approved");
        
        if(req.url == "http://localhost:3000/login" || req.url == "http://localhost:3000/") {
            return NextResponse.redirect(new URL('/home', req.url))
        }
    } else {
        if(req.url != "http://localhost:3000/login"){
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }
}

export const config = {
    // Apply the middleware to all routes by setting the matcher to 'all'
    // Note: Use the correct syntax with a single string
    // For applying middleware to specific routes, use an array of strings
    // Example: matcher: ['/login', '/home']
    matcher: ['/', '/login', '/home']
};
