"use client"
import React, { useEffect, useLayoutEffect, useRef } from 'react'

import { Power3, Bounce, Expo, gsap } from 'gsap';

import { BsCaretDown } from "react-icons/bs";
import Image from 'next/image';
import { Section_Plain } from '@/services/api/sections/types';
import SplitType from "split-type"
import { BiMouse } from 'react-icons/bi';

import { TfiMouse } from "react-icons/tfi"

const HeroSection = ({ sectionData }: { sectionData?: Section_Plain }) => {


    const titleRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollDownRef = useRef<HTMLDivElement>(null);


    // First Load Animations
    useLayoutEffect(() => {
        const titleText = new SplitType(titleRef.current || "");
        const contentText = new SplitType(contentRef.current || "");

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                delay: 1.1
            });

            tl.from(titleText.words, {
                y:"120%",
                stagger: 0.30,
                duration: 1,
                ease: Power3.easeInOut
            })

            tl.from(contentText.chars, {
                opacity: 0,
                y: 65,
                stagger: 0.04,
                duration: 0.7,
                ease: Expo.easeOut,
            })

            tl.from(scrollDownRef.current, {
                autoAlpha: 0,
                duration: 1,
            })
        })

        return () => ctx.revert();
    }, [])


    const ScrollDown = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }

    return (
        <>

            <section className={`relative overflow-hidden`}>
                <div className="container">
                    <div className="flex justify-center items-center h-[100svh]">

                        <div className='flex flex-col justify-center text-center'>

                            <div className="overflow-hidden">
                                <h1 ref={titleRef} className={`title text-9xl py-2 font-bold mb-6`}>
                                    {sectionData?.title}
                                </h1>
                            </div>
                            <div className='overflow-hidden'>
                                <div ref={contentRef} className='text-5xl font-medium content-reveal' dangerouslySetInnerHTML={{ __html: sectionData?.content }}></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div ref={scrollDownRef} className='absolute bottom-0 md:bottom-20 left-1/2 -translate-x-1/2'>
                    <button
                        className="p-3 animate-bounce"
                        onClick={ScrollDown}
                    >
                        <TfiMouse size={40} />
                    </button>
                </div>
            </section>
        </>

    )
}

export default HeroSection