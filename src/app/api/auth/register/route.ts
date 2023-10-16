import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { User } from "@prisma/client";


export async function POST(req: NextRequest) {
    const { email, password, userName }: User = await req.json();

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password,
                userName
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }

}