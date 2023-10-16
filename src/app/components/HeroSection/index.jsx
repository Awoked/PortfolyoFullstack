"use client"
import React, { useEffect, useRef, useState } from 'react'

import { Bounce, Circ, Elastic, Expo, Power3, Power4, gsap } from 'gsap';

import { BsCaretDown } from "react-icons/bs";
import styles from "./hero.module.css";
import Image from 'next/image';

const HeroSection = () => {

    // First Load Animations
    useEffect(() => {
            const tl = gsap.timeline();
            tl.fromTo(".title",
                {
                    x: -200,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.5,
                    ease: Expo.easeInOut
                }
            )
            tl.fromTo(".sub-title span",
                {
                    opacity: 0,
                    background: "black"
                },
                {
                    opacity: 1,
                    stagger: .25,
                    delay: .3,
                    background: "transparent",
                    ease: Bounce.easeInOut
                }
            )


            tl.fromTo(".scroll-down",
                {
                   autoAlpha: 0,
                },
                {
                    autoAlpha: 1,
                    delay: .5,
                    duration: 1,
                }
            )

    }, [])

    const ScrollDown = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }

    return (
        <>

            <section
                className={`hero-section p-6 max-md:py-14 md:p-12 xl:p-24 relative h-[100svh] overflow-hidden text-black ${styles.background}`}
            >

                <div className="flex justify-between flex-col lg:flex-row h-full">

                    <div className='w-max'>

                        <p className={`title opacity-0 max-[320px]:text-[3rem] max-[375px]:text-[3.5rem] text-[4.5rem] md:text-[5rem] xl:text-[8rem] 2xl:text-[10rem] font-bold text-inherit`}>
                            Merhaba
                        </p>

                        <h1
                            className={`sub-title max-[320px]:text-[2.5rem] max-[375px]:text-[3rem] text-[4rem] xl:text-[7rem] 2xl:text-[9rem]`}
                        >
                            {
                                [..."Ben Alper."].map((text, index) => (
                                    <span key={index} className='opacity-0'>
                                        {text}
                                    </span>
                                ))
                            }
                        </h1>
                    </div>
                    {/* 
                    <div className='w-full h-full lg:w-[500px] flex justify-end'>
                        <Image
                            src="/images/peepocomfy-peepo.gif"
                            className='-scale-x-100 peepo w-full h-full object-contain opacity-0'
                            width={500}
                            height={500}
                            alt="peepo"
                        />
                    </div>
                     */}
                </div>
                <div className='scroll-down absolute bottom-0 md:bottom-20 left-1/2 -translate-x-1/2'>
                    <button
                        className="scrollDownBtn p-3 animate-bounce"
                        onClick={ScrollDown}
                    >
                        <BsCaretDown
                            size={40}
                        />
                    </button>
                </div>
            </section>
        </>

    )
}

export default HeroSection