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

    const _GalleryData: Omit<Gallery, "id" | "sectionId">[] = [];
    body.GalleryData?.forEach((data, _) => {
        _GalleryData.push({
            imageTitle: data.imageTitle,
            imageLinkHref: data.imageLinkHref,
        })
    })

    try {
        const section = await prisma.sectionData.create({
            data: {
                ...body.SectionData,
                id: undefined,
                Gallery: body.GalleryData ? {
                    createMany: {
                        data: _GalleryData
                    }
                } : undefined
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
            data: {
                ...body.SectionData,
                Gallery: undefined,
                id: undefined
            },
            where: {
                id: body.SectionData.id,
            },
        })

        if (body.GalleryData) {
            body.GalleryData.forEach(async (data, index) => {

                const existingGallery = await prisma.gallery.findUnique({
                    where: {
                        id: data.id
                    }
                })

                if (existingGallery) {
                    const updatedGallery = await prisma.gallery.update({
                        data: {
                            ...data,
                            id: undefined,
                            sectionId: undefined,
                        },

                        where: {
                            id: data.id
                        }
                    })
                } else {
                    const createdGallery = await prisma.gallery.create({
                        data: {
                            ...data,
                            id: undefined,
                            sectionId: body.SectionData.id,
                        }
                    })

                }


            })
        }

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