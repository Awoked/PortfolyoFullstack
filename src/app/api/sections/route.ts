import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { Gallery, SectionData } from "@prisma/client";

type SectionDataType = {
    SectionData: SectionData;
    GalleryData: Gallery
}

export async function GET(req: NextRequest) {
    try {
        const sectionData = await prisma.sectionData.findMany({
            include: {
                Gallery: true
            }
        })
        await prisma.$disconnect();

        return NextResponse.json(sectionData, { status: 200 });

    } catch (error) {

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
        await prisma.$disconnect();

        return NextResponse.json({
            section
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
            data: {
                ...body.SectionData,
                Gallery: body.GalleryData ? {
                    update: {
                        where: {
                            id: body.GalleryData.id
                        },
                        data: body.GalleryData
                    }
                } : undefined
            },
            where: {
                id: body.SectionData.id,
            },
            include: {
                Gallery: true
            }
        })
        await prisma.$disconnect();

        return NextResponse.json({
            section
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

export async function DELETE(req:NextRequest) {
    const {searchParams} = new URL(req.url);
    const _id = searchParams.get("id");
    
    try{
        const section = await prisma.sectionData.delete({
            where: {
                id: Number(_id)
            }
        })
        await prisma.$disconnect();

        return NextResponse.json({
            section
        },{
            status: 200
        })
    } catch(error){

        return NextResponse.json({
            error
        },{
            status: 500
        })
    }
}