import { NextResponse } from "next/server";

const BASIC_USER = process.env.INTERNAL_USER;
const BASIC_PASS = process.env.INTERNAL_PASS;

export function middleware(req) {
  const url = req.nextUrl;

  // Solo protegemos las rutas internas
  if (!url.pathname.startsWith("/internal")) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Next Business Internal Area"',
      },
    });
  }

  const [scheme, encoded] = authHeader.split(" ");

  if (scheme !== "Basic" || !encoded) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Next Business Internal Area"',
      },
    });
  }

  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const [user, pass] = decoded.split(":");

  if (user === BASIC_USER && pass === BASIC_PASS) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Next Business Internal Area"',
    },
  });
}

// Indicamos que el middleware solo se aplique a /internal/*
export const config = {
  matcher: ["/internal/:path*"],
};
