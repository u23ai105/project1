import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'thisKeyIsSupposedToBeSecret';

export async function middleware(request) {
  // Paths that don't require authentication
  const publicPaths = ['/login', '/signup', '/','/otp','/forgot-password','/reset-password','/mobile'];
  const path = request.nextUrl.pathname;

  console.log(`Request path: ${path}`); // Log the request path

  if (publicPaths.includes(path)) {
    console.log('Public path, allowing access');
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  console.log('Token from cookie:', token); // Log the token from the cookie

  if (!token) {
    console.log('No token found, redirecting to /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify token using jose
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    console.log('Decoded token:', payload); // Log the decoded token
    console.log('Token is valid');
    return NextResponse.next();
  } catch (error) {
    console.log('Token verification error:', error.message); // Log the error message
    console.log('Invalid token, redirecting to /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};