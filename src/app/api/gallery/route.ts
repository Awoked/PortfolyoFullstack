import prisma from "@/lib/db";
import { utapi } from "@/server/uploadthing";
import { Gallery } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { galleryPostType, galleryPutType } from "./types";


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const sectionId = searchParams.get("sectionId");

    try {
        const gallery = await prisma.gallery.findMany({
            where: {
                sectionId: Number(sectionId)
            }
        })

        return NextResponse.json(gallery, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const body: galleryPostType = await req.json();

    try {
        const galleries: Gallery[] = [];
        body.files?.forEach(async (data, _) => {
            const galleryData = await prisma.gallery.create({
                data: {
                    sectionId: body.sectionId,
                    imageLinkHref: data.url,
                    imageTitle: data.name,
                    filterKey: body.filterKey,
                    fileKey: data.key
                }
            })
            galleries.push(galleryData);
        });



        return NextResponse.json({ galleries }, { status: 201 });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error }, { status: 500 })
    }

}

export async function PUT(req: NextRequest) {
    const body: galleryPutType[] = await req.json();

    try {
        const galleries: Gallery[] = [];
        body.forEach(async (data, _) => {
            const gallery = await prisma.gallery.update({
                where: {
                    id: data.id
                },
                data: {
                    ...data,
                    id: undefined,
                }
            })
            galleries.push(gallery);
        })
        return NextResponse.json(galleries, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        const data = await prisma.gallery.delete({
            where: {
                id: Number(id),
            }
        })
        if (!data.fileKey) throw new Error("no key");
        utapi.deleteFiles(data.fileKey);

        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        console.log('error', error)
        return NextResponse.json({ error }, { status: 500 })
    }
}