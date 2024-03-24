import {
  withMiddlewareAuthRequired,
  getSession,
} from "@auth0/nextjs-auth0/edge";
import { createMiddleware } from "next-easy-middlewares";
import { NextRequest, NextResponse } from "next/server";

const middleware = async (req) => {
  const url = req.nextUrl.clone();
  const res = NextResponse.next();
  const session = await getSession(req, res);
  const user = session?.user;
  const userRoles = user?.["https://multisport.games/roles"];
  const isAllowed = userRoles?.includes("admin");
  if (!isAllowed || !userRoles) {
    return NextResponse.redirect(url.origin);
  }
  return res;
};

export default middleware;

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
