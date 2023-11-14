"use client"
import { cn } from '@/lib/utils';
import { Meta } from '@/services/api/types'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { Url } from 'url';
import { Button } from './button';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


type PaginationLinkType = {
    href: Partial<Url>
    className?: string
    children?: React.ReactNode
    disabled: boolean
}
const PaginationLink = ({ href, children, className, disabled }: PaginationLinkType) => {

    return (
        <Button disabled={disabled} asChild>
            <Link href={href} className={disabled ? 'pointer-events-none !cursor-not-allowed opacity-50' : ''}>
                {children}
            </Link>
        </Button>
    )
}

const Pagination = ({ meta }: { meta: Meta }) => {

    const pathname = usePathname();
    const { pagination } = meta;

    return (
        !!pagination &&
        <div className='flex justify-center py-4'>
            <TooltipProvider>

                <ul className='flex gap-2 flex-wrap items-center'>

                    <li>
                        <Tooltip>
                            <TooltipTrigger>
                                <PaginationLink
                                    href={{ pathname, query: `page=${pagination.page - 1}` }}
                                    disabled={pagination.page === 1}
                                >
                                    Geri
                                </PaginationLink>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Önceki sayfaya git</p>
                            </TooltipContent>
                        </Tooltip>
                    </li>

                    {
                        [...Array(pagination.pageCount)].map((data, index) => {
                            let page = index + 1;
                            let isCurrentPage = page === pagination.page
                            return (
                                <li key={index} className={`${isCurrentPage ? "font-bold" : "font-medium"}`}>

                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button asChild variant={isCurrentPage ? "outline" : "default"}>
                                                <Link href={{ pathname, query: `page=${page}` }}>
                                                    {page}
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{isCurrentPage ? "Mevcut sayfa" : `Sayfa ${page}`}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </li>
                            )
                        })
                    }
                    <li>
                        <Tooltip>
                            <TooltipTrigger>
                                <PaginationLink
                                    href={{ pathname, query: `page=${pagination.page + 1}` }}
                                    disabled={pagination.page === pagination.pageCount}
                                >
                                    İleri
                                </PaginationLink>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Sonraki sayfaya git</p>
                            </TooltipContent>
                        </Tooltip>
                    </li>

                </ul>
            </TooltipProvider>

        </div >
    )
}

export default Pagination