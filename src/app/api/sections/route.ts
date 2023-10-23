import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Gallery, SectionData } from "@prisma/client";

export type SectionDataType = {
    SectionData: SectionData;
    GalleryData?: Gallery[]
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("id");
    const _section = searchParams.get("section");

    try {

        if (_id) {
            const sectionData = await prisma.sectionData.findUnique({
                where: {
                    id: Number(_id)
                },
                include: {
                    Gallery: true
                }
            })
            return NextResponse.json(sectionData, { status: 200 });
        }

        if (_section) {
            const sectionData = await prisma.sectionData.findUnique({
                where: {
                    section: _section
                },
                include: {
                    Gallery: true
                }
            })

            return NextResponse.json(sectionData, { status: 200 });
        }

        const sectionData = await prisma.sectionData.findMany({
            include: {
                Gallery: true
            }
        })

        return NextResponse.json(sectionData, { status: 200 });
    } catch (error) {
        console.log('error', error)
        return NextResponse.json({
            error
        }, {
            status: 500
        })
    }
}


export async function POST(req: NextRequest) {

    const body: SectionDataType = await req.json();

    try {
        const section = await prisma.sectionData.create({
            data: {
                ...body.SectionData,
                Gallery: {
                    create: body.GalleryData ? body.GalleryData : undefined
                }
            },
            include: {
                Gallery: true
            }
        })

        return NextResponse.json({
            ...section
        }, {
            status: 201
        });

    } catch (error) {
        console.log('error', error)
        return NextResponse.json({
            error
        }, {
            status: 500
        })
    }
}

export async function PUT(req: NextRequest) {
    const body: SectionDataType = await req.json();

    try {
        const section = await prisma.sectionData.update({
            data: body.SectionData,
            where: {
                id: body.SectionData.id,
            },
            include: {
                Gallery: true
            }
        })

        return NextResponse.json({
            ...section
        }, {
            status: 200
        })

    } catch (error) {
        return NextResponse.json({
            error
        }, {
            status: 500
        })
    }

}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("id");

    try {
        const section = await prisma.sectionData.delete({
            where: {
                id: Number(_id)
            }
        })

        return NextResponse.json({
            ...section

        }, {
            status: 200
        })
    } catch (error) {

        return NextResponse.json({
            error
        }, {
            status: 500
        })
    }
}