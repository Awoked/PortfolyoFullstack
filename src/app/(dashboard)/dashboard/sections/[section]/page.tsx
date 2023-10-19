import { Sections } from '@/services/api'
import React from 'react'
import { redirect } from "next/navigation"
import { RootUrls } from '@/utils/consts'
import { SectionsForm } from '@/app/(dashboard)/_components/Sections'
import { SectionData } from '@prisma/client'

type PageProps = {
    params: {
        section: string
    }
}

const page = async ({ params }: PageProps) => {
    const { section } = params;

    const isCreatePage = section === "create"

    let initialData: SectionData;
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
        initialData = await Sections.GET({ section: section });

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