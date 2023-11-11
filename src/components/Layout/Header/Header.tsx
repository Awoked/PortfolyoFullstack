"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Logo from '../../Logo'
import Navbar from './Navbar'
import Link from 'next/link'
import { Navigation } from '@/services/api/navigations/types'
import useScroll from '@/hooks/useScroll'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import MobileMenu from './MobileMenu'

const Header = ({ navData }: { navData: Navigation[] }) => {
    const headerRef = useRef<HTMLElement>(null);
    const headerHeight = headerRef.current?.clientHeight;
    const { scrollCount } = useScroll();
    const [isFixed, setIsFixed] = useState(false);

    const fixValue = scrollCount > (headerHeight || 100) + 100;

    useEffect(() => {
        setIsFixed(fixValue)

        if (fixValue && !isFixed) {
            gsap.fromTo(headerRef.current, {
                y: "-100%"
            }, {
                y: "0%"
            })
        }

    }, [scrollCount])

    return (
        <header ref={headerRef} className={cn('absolute left-0 top-0 w-full py-4 z-20 backdrop-blur-sm bg-white bg-opacity-90', isFixed && "fixed")}>
            <div className="container flex justify-between items-center">
                <Link href={"/"} title='Alper Koşay' className='relative z-20'>
                    <Logo className='max-w-[150px]' />
                </Link>
                <Navbar navData={navData} />

                <MobileMenu navData={navData} />
            </div>
        </header>
    )
}

export default Header