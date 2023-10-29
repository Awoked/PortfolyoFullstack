import prisma from "@/lib/db";
import { utapi } from "@/server/uploadthing";
import { Gallery } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { UploadFileResponse } from "uploadthing/client";

export type galleryPostType = {
    files: UploadFileResponse[] | undefined,
    sectionId: number,
    filterKey: string,
}

export async function POST(req: NextRequest) {
    const body: galleryPostType = await req.json();
    console.log('body', body)
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