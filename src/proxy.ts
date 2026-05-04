import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/admin/:path*', '/api/reaper/:path*', '/api/ads/:path*'],
};

export function proxy(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const expectedUser = process.env.ADMIN_USER || 'reaper';
  const expectedPass = process.env.ADMIN_PASS || 'secure123';

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (user === expectedUser && pwd === expectedPass) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
