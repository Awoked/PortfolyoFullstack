"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Globe, LogOutIcon } from 'lucide-react'
import Logo from '@/components/Logo'
import { Pages, RootUrls } from '@/utils/consts'


const SideBar = () => {
    const { data, status } = useSession();


    return (
        <div className='w-[200px] p-4 h-full flex flex-col'>
            <Link href={`${RootUrls.Dashboard.url}`} title={RootUrls.Dashboard.title} className='md:px-6 block'>
                <Logo />
            </Link>
            <div className='w-full py-6'>

                <div className='mb-4'>
                    <p className='text-lg font-semibold'>
                        Pages
                    </p>
                    <div className='flex flex-col gap-10'>
                        <Accordion type="single" collapsible>

                            <AccordionItem value="item-1" className='border-b-0'>
                                <AccordionTrigger className='flex-row-reverse justify-end gap-2'>
                                    Client
                                </AccordionTrigger>

                                <AccordionContent className='pl-4'>
                                    <div className='flex flex-col gap-2'>
                                        {
                                            Pages.Dashboard.map((page, idx) => (
                                                <Button asChild variant={"link"} className='w-full justify-start' key={idx}>
                                                    <Link href={page.url} title={page.title} className='text-2xl font-light gap-2'>
                                                        <span className='text-sm'>
                                                            {page.title}
                                                        </span>
                                                    </Link>
                                                </Button>
                                            ))
                                        }
                                    </div>

                                </AccordionContent>

                            </AccordionItem>
                        </Accordion>


                    </div>
                </div>

            </div>
            <div className='h-full flex items-end'>
                <div className='w-full flex flex-col gap-2 justify-between'>
                    <Button asChild>
                        <Link
                            href={RootUrls.Home.url}
                            title={RootUrls.Home.title}
                            className='flex items-center gap-1.5'
                        >
                            Home
                            <Globe size={14} />
                        </Link>
                    </Button>
                    <Button onClick={() => { signOut() }} className='flex items-center gap-1.5'>
                        Log Out
                        <LogOutIcon size={14} />
                    </Button>

                </div>
            </div>
        </div>
    )
}

export default SideBar