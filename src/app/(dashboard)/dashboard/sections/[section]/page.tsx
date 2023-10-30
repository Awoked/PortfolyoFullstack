import { sectionService } from '@/services'
import React from 'react'
import { redirect } from "next/navigation"
import { RootUrls } from '@/utils/consts'
import { SectionsForm } from '@/app/(dashboard)/_components/Sections'
import { Gallery, SectionData } from '@prisma/client'
import "@uploadthing/react/styles.css"
import { SectionType } from '@/app/api/sections/types'

type PageProps = {
    params: {
        section: string
    }
}


const page = async ({ params }: PageProps) => {
    // const sectionService = new SectionService();

    const { section } = params;

    const isCreatePage = section === "create"

    let initialData: SectionType | null;
    if (isCreatePage) {
        initialData = {
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
        }
    } else {
        const SectionData = await sectionService.getBySection(params.section);
        initialData = SectionData

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