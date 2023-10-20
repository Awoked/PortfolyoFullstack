import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
    async function middleware(req) {
        // const role = req.nextauth.token?.role;

        // if (req.url.includes("/api") && role) {
        //     if (
        //         role !== "admin" &&
        //         req.method === "POST" ||
        //         req.method === "PUT" ||
        //         req.method === "DELETE"
        //     ) {
        //         console.log('unauthorized')
        //         return NextResponse.json({ message: "unauthorized" }, { status: 401 })
        //     }
        // }

    },
    {
        callbacks: {
            authorized({ req, token }) {
                if (req.nextUrl.pathname.includes("/api") && req.method !== "GET" || req.nextUrl.pathname.includes("/dashboard") ) {
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