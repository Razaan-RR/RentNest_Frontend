import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: string;
  email: string;
  name: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
}

export function proxy(request: NextRequest) {


  const token = request.cookies.get(
    "accessToken"
  )?.value;


  const pathname = request.nextUrl.pathname;


  if (pathname.startsWith("/dashboard")) {


    if (!token) {

      return NextResponse.redirect(
        new URL("/login", request.url)
      );

    }


    try {

      const decoded =
        jwtDecode<TokenPayload>(token);


      console.log(
        "🔥 User role:",
        decoded.role
      );


      if (
        pathname.startsWith("/dashboard/tenant") &&
        decoded.role !== "TENANT"
      ) {

        return NextResponse.redirect(
          new URL("/login", request.url)
        );

      }


      if (
        pathname.startsWith("/dashboard/landlord") &&
        decoded.role !== "LANDLORD"
      ) {

        return NextResponse.redirect(
          new URL("/login", request.url)
        );

      }


      if (
        pathname.startsWith("/dashboard/admin") &&
        decoded.role !== "ADMIN"
      ) {

        return NextResponse.redirect(
          new URL("/login", request.url)
        );

      }


    } catch(error) {

      console.log(error);

      return NextResponse.redirect(
        new URL("/login", request.url)
      );

    }

  }


  return NextResponse.next();
}



export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};