import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const adminToken = request.cookies.get('admin_token')?.value;

  // 1. Agar user sirf /admin path par aaye
  if (path === '/admin') {
    if (adminToken) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // 2. Sirf protected admin routes ko lock karein (login page ko chhor kar)
  const isAdminRoute = path.startsWith('/admin') && path !== '/admin/login';

  if (isAdminRoute && !adminToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // 3. Agar pehle se logged in hai aur wapas login page khol raha hai
  if (path === '/admin/login' && adminToken) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};