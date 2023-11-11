"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Breadcrumb = () => {
    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)

    return (
        <section className='pb-4'>
            <div className="container">
                <nav aria-label='Breadcrumb'>

                    <ul className='flex gap-4 items-center overflow-x-auto pr-2'>
                        <li className={`font-medium`}>
                            <Link href={"/"}>Anasayfa</Link>
                        </li>
                        <li>/</li>
                        {
                            pathNames.map((link, index) => {
                                let href = `/${pathNames.slice(0, index + 1).join('/')}`;
                                let active = paths === href;
                                let title = link.charAt(0).toUpperCase() + link.slice(1);


                                return (
                                    <React.Fragment key={index}>
                                        <li className={`${active ? "font-bold" : "font-medium"}`}>
                                            <Link href={href} title={title}>{title}</Link>
                                        </li>
                                        {pathNames.length !== index + 1 && (
                                            <li>/</li>
                                        )}
                                    </React.Fragment>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        </section>
    )
}

export default Breadcrumb