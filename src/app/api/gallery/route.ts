import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    try {
        const data = await prisma.gallery.delete({
            where: {
                id: Number(id),
            }
        })
        
        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        console.log('error', error)
        return NextResponse.json({ error }, { status: 500 })
    }
}