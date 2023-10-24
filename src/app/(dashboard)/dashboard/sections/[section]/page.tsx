import { SectionService } from '@/services'
import React from 'react'
import { redirect } from "next/navigation"
import { RootUrls } from '@/utils/consts'
import { SectionsForm } from '@/app/(dashboard)/_components/Sections'
import { Gallery, SectionData } from '@prisma/client'

type PageProps = {
    params: {
        section: string
    }
}

export interface ISectionData {
    SectionData: SectionData
    GalleryData?: Gallery[]
}

const page = async ({ params }: PageProps) => {
    const sectionService = new SectionService();

    const { section } = params;

    const isCreatePage = section === "create"

    let initialData: ISectionData;
    if (isCreatePage) {
        initialData = {
            SectionData: {
                id: 0,
                section: '',
                subTitle: '',
                title: '',
                description: '',
                content: '',
                firstLinkHref: '',
                firstLinkText: '',
                secondLinkHref: '',
                secondLinkText: '',
            },
            GalleryData: [
                {
                    id: 0,
                    imageLinkHref: '',
                    imageTitle: '',
                    sectionId: 0
                }
            ]
        }
    } else {
        const SectionData = await sectionService.getBySection(params.section);
        initialData = {
            SectionData: SectionData,
            GalleryData: SectionData.Gallery
        }

        if (!initialData) {
            redirect(RootUrls.Dashboard.SubPages.Sections.url)
        }
    }


    return (
        <section>
            <div className="container">
                <SectionsForm initialData={initialData} method={isCreatePage ? "create" : "update"} />
            </div>
        </section>
    )
}

export default page