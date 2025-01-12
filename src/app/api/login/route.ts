import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Match credentials with environment variables
  if (
    username === process.env.NEXT_PUBLIC_USERNAME &&
    password === process.env.NEXT_PUBLIC_PASSWORD
  ) {
    const response = NextResponse.json({ message: 'Login successful' });

    // Set a cookie to indicate the user is logged in
    response.cookies.set('logged_in', 'true', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    });

    return response;
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
