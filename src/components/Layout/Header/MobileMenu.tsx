"use client"
import { Button } from '@/components/ui/button'
import { Navigation } from '@/services/api/navigations/types'
import gsap from 'gsap'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { BiMenu } from 'react-icons/bi'

const MobileMenu = ({ navData }: { navData: Navigation[] }) => {

    const [isActive, setIsActive] = useState<boolean>(false);
    const toggleActive = () => setIsActive((prev) => !prev)

    const navigationListRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        if (navigationListRef.current) {
            if (isActive) {
                tl.from(navigationListRef.current.children, {
                    opacity:0,
                    x: "-100%",
                    stagger: 0.10,
                })
            }
        }


    }, [isActive])

    return (
        <React.Fragment>

            <Button className='p-1 flex flex-col gap-2.5 text-4xl relative z-20' onClick={toggleActive}>
                <BiMenu />
            </Button>
            {
                isActive &&

                <div className='fixed inset-0 h-screen z-10 bg-white bg-opacity-90 backdrop-blur-md pt-24'>
                    <div className="container h-full">
                        <ul className='space-y-2 h-full pb-2 overflow-y-auto' ref={navigationListRef}>
                            {
                                navData.length &&
                                navData.map((data, index) => (
                                    <li onClick={toggleActive} key={index}>
                                        <Link
                                            href={data.attributes.href || '/'}
                                            title={data.attributes.title}
                                            className='py-2 inline-block text-3xl font-semibold'
                                        >
                                            {data.attributes.title}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default MobileMenu