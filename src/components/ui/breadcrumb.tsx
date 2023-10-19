"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Breadcrumb = () => {
    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)
    return (
        <div>
            <ul className='flex gap-4 items-center'>
                {
                    pathNames.map((link, index) => {
                        let href = `/${pathNames.slice(0, index + 1).join('/')}`
                        let itemLink = link
                        return (
                            <React.Fragment key={index}>
                                <li >
                                    <Link href={href}>{itemLink}</Link>
                                </li>
                                <li>
                                    {pathNames.length !== index + 1 && "/"}
                                </li>
                            </React.Fragment>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Breadcrumb