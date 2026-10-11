import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check credentials against environment variables or hardcoded default
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@thefashionhub.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (email === adminEmail && password === adminPassword) {
      // Set secure cookie
      const cookieStore = cookies();
      cookieStore.set('admin_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
