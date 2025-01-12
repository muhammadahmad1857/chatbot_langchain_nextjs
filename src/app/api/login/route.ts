import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Match credentials with environment variables (do not use NEXT_PUBLIC_ for sensitive data)
  if (
    username === process.env.USERNAME &&
    password === process.env.PASSWORD
  ) {
    const response = NextResponse.json({ message: 'Login successful' });

    // Set a cookie to indicate the user is logged in
    response.cookies.set('logged_in', 'true', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      secure: process.env.NODE_ENV === 'production', // Ensure secure cookie in production (HTTPS)
      maxAge: 30 * 24 * 60 * 60, // Optional: Cookie expiration time (30 days)
    });

    return response;
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
