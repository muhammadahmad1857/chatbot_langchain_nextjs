// import NextAuth from "next-auth";
// import { authConfig } from "@/auth.config";
// import {
//   // DEFAULT_REDIRECT,
//   PUBLIC_ROUTES,
//   PROTECTED_ROUTES,
//   ROOT,
// } from "@/lib/routes";

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   const { nextUrl } = req;

//   const isAuthenticated = !!req.auth;
//   const { pathname } = nextUrl;

//   const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
//   const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);
//   // const isAuthPage = pathname === "/login" || pathname === "/signup";
//   console.log(
//     "Pathname:",
//     pathname,
//     "isPublicRoute:",
//     isPublicRoute,
//     "auth page",
//     // isAuthPage,
//     "authenticated",
//     isAuthenticated
//   );

//   // Allow access to public routes
//   if (isPublicRoute) {
//     return new Response(null, { status: 200 });
//   }

//   // Redirect logged-in users away from authentication pages
//   // if (isAuthenticated && isAuthPage) {
//   //   return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
//   // }

//   // Redirect non-authenticated users to login for protected routes
//   if (!isAuthenticated && isProtectedRoute) {
//     return Response.redirect(new URL(ROOT, nextUrl));
//   }

//   // If none of the above conditions are met, allow access
//   return new Response(null, { status: 200 });
// });

// export const config = {
//   matcher: ["/call", "/login", "/signup"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the 'logged_in' cookie and extract its value
  const loggedInCookie = request.cookies.get("logged_in");
  const isLoggedIn = loggedInCookie?.value === "true";

  // Redirect logged-in users away from the /login page
  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/call", request.url));
  }

  // Restrict access to /call for non-logged-in users
  if (pathname === "/call" && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/call", "/login"], // Apply middleware to both /call and /login routes
};
