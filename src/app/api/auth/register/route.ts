import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { User } from "@prisma/client";
import { AdminKey } from "@/utils/consts";

interface UserBody extends User {
    sudoKey: string
}

export async function POST(req: NextRequest) {
    const { email, password, userName, sudoKey }: UserBody = await req.json();

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password,
                userName,
                role: sudoKey === AdminKey ? "admin" : undefined
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    const { email, sudoKey } = await req.json();

    try {
        if (sudoKey === AdminKey) {
            const user = await prisma.user.update({
                data: {
                    role: "admin"
                },
                where: {
                    email
                }
            })
            return NextResponse.json(user, {status: 201})
        }

        return  NextResponse.json({message: "unauthorized"}, {status: 401})
    }catch(error){

        return  NextResponse.json({error}, {status: 500})
    }
}