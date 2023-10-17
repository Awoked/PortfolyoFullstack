"use client"
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { AiFillHome } from 'react-icons/ai'

import { Button } from '@/app/components/ui/button'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/components/ui/accordion"


const SideBar = () => {
    return (
        <div className='w-[240px] p-4'>

            <div className='w-full'>

                <div className='mb-4'>
                    <p className='text-lg mb-2'>
                        Dashboards
                    </p>
                    <div className='flex flex-col gap-10'>

                        <Button asChild variant={"outline"} className='w-max'>
                            <Link href={"/dashboard"} className='text-2xl font-light gap-2'>
                                <AiFillHome />
                                <span className='text-sm'>
                                    Home
                                </span>
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className='mb-4'>
                    <p className='text-lg mb-2'>
                        Pages
                    </p>
                    <div className='flex flex-col gap-10'>
                        <Accordion type="single" collapsible>

                            <AccordionItem value="item-1" className='border-b-0'>
                                <AccordionTrigger className='flex-row-reverse justify-end'>
                                    Home
                                </AccordionTrigger>

                                <AccordionContent>
                                    <div className='flex flex-col gap-4'>

                                        <Button asChild variant={"link"} className='w-max'>
                                            <Link href={"/dashboard"} className='text-2xl font-light gap-2'>
                                                <span className='text-sm'>
                                                    Dashboards
                                                </span>
                                            </Link>
                                        </Button>

                                        <Button asChild variant={"link"} className='w-max'>
                                            <Link href={"/dashboard"} className='text-2xl font-light gap-2'>
                                                <span className='text-sm'>
                                                    Dashboards
                                                </span>
                                            </Link>
                                        </Button>
                                    </div>

                                </AccordionContent>

                            </AccordionItem>
                        </Accordion>


                    </div>
                </div>

            </div>
        </div>
    )
}

export default SideBar