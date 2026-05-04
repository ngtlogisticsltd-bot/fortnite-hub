import { NextRequest, NextResponse } from "next/server";

const ADMIN_USER = process.env.ADMIN_USER || "reaper";
const ADMIN_PASS = process.env.ADMIN_PASS || "tj";

function isAuthenticated(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth) return false;

  const [type, encoded] = auth.split(" ");
  if (type !== "Basic" || !encoded) return false;

  const decoded = Buffer.from(encoded, "base64").toString();
  const [user, pass] = decoded.split(":");

  return user === ADMIN_USER && pass === ADMIN_PASS;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ ONLY protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated(req)) {
      return new NextResponse("Auth required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // 🔥 only admin protected
};
