import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
    async function middleware(req) {

    },
    {
        callbacks: {
            authorized({ req, token}) {
                if (req.nextUrl.pathname.includes("/api") && req.method !== "GET" || req.nextUrl.pathname.includes("/dashboard") && !req.nextUrl.pathname.includes("/api/uploadthing")) {
                    return token?.role === "admin"
                }

                return true
            },
        },
        secret: process.env.NEXTAUTH_SECRET,
    }
)

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*", "/api/sections"]
}