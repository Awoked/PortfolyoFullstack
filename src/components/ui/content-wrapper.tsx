"use client"
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'
import SplitType from 'split-type'


type ComponentProps = {
    children?: React.ReactNode
    className?: string
}
const ContentWrapper = ({ children, className, ...props }: ComponentProps) => {

    const contentWrapperRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (contentWrapperRef.current) {

            const contentWrapperContent = new SplitType(contentWrapperRef.current);

            gsap.set(contentWrapperRef.current, {
                opacity: 1
            })
            gsap.from(contentWrapperContent.words, {
                opacity: 0,
                y: "200%",
                stagger: 0.005,
                duration: 0.8,
                delay: 0.3,

                scrollTrigger: {
                    trigger: contentWrapperRef.current,
                    start: "top 90%",
                    end: "bottom 70%",
                    // scrub: 1,
                }
            })
        }

    }, [])

    return (
        <div ref={contentWrapperRef} className={cn('content-wrapper opacity-0', className)} {...props}>
            {children}
        </div>
    )
}

export default ContentWrapper