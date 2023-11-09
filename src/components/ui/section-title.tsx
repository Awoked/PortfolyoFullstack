"use client"
import { cn } from '@/lib/utils'
import gsap, { Expo, Power4 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'
import SplitType from 'split-type'

type ComponentProps = {
    children?: React.ReactNode
    className?: string

}
const SectionTitle = ({ children, className, ...props }: ComponentProps) => {
    const sectionTitleRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        if (sectionTitleRef.current) {
            const sectionTitle = new SplitType(sectionTitleRef.current, {
                types: "chars,words"
            });

            gsap.from(sectionTitle.words,
                {
                    opacity: 0,
                    duration: 1,
                    stagger: 0.30,
                    y: "50%",
                    delay: 0.1,
                    scrollTrigger: {
                        trigger: sectionTitleRef.current,
                        start: "top 95%",
                        end: "bottom 60%",
                        scrub: 1,
                    },
                    ease: Power4.easeInOut,

                }
            )
        }

    }, [])

    return (
        <div className='flex justify-center my-4'>
            <div ref={sectionTitleRef} className={cn('text-3xl font-bold w-max', className)} {...props}>
                {children}
            </div>
        </div>
    )
}

export default SectionTitle