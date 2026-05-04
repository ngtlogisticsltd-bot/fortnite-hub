import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ONLY protect admin routes
  if (pathname.startsWith('/admin')) {
    const auth = request.headers.get('authorization');

    if (!auth) {
      return new NextResponse('Auth required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
    }
  }

  // Allow everything else
  return NextResponse.next();
}
