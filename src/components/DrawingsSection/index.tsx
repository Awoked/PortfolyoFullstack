"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import { Expo, Power4, gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Section_Plain } from '@/services/api/sections/types';
import { Drawing } from '@/services/api/drawings/types';
import config from '@/config';

gsap.registerPlugin(ScrollTrigger);



const DrawingsSection = ({ sectionData, drawings }: { sectionData: Section_Plain, drawings: Drawing[] }) => {

    // const [drawingsData, setDrawingsData] = useState([
    //     {
    //         src: "/images/drawings/daftpunk.jpg",
    //         width: 4,
    //         height: 3
    //     },
    //     {
    //         src: "/images/drawings/1.jpg",
    //         width: 4,
    //         height: 3,
    //     },
    //     {
    //         src: "/images/drawings/2.jpg",
    //         width: 24,
    //         height: 9,
    //     },
    //     {
    //         src: "/images/drawings/3.jpg",
    //         width: 4,
    //         height: 3,
    //     },
    //     {
    //         src: "/images/drawings/4.jpg",
    //         width: 24,
    //         height: 9,
    //     },
    //     {
    //         src: "/images/drawings/5.jpg",
    //         width: 4,
    //         height: 3,
    //     },
    //     {
    //         src: "/images/drawings/6.jpg",
    //         width: 4,
    //         height: 3,
    //     },
    //     {
    //         src: "/images/drawings/7.jpg",
    //         width: 4,
    //         height: 3,
    //     },
    //     {
    //         src: "/images/drawings/8.jpg",
    //         width: 4,
    //         height: 3,
    //     },
    //     {
    //         src: "/images/drawings/9.jpg",
    //         width: 4,
    //         height: 3,
    //     },
    //     {
    //         src: "/images/drawings/10.jpg",
    //         width: 4,
    //         height: 3,
    //     },
    //     {
    //         src: "/images/drawings/11.jpg",
    //         width: 4,
    //         height: 3,
    //     },
    //     {
    //         src: "/images/drawings/12.jpg",
    //         width: 4,
    //         height: 3,
    //     },
    //     {
    //         src: "/images/drawings/13.jpg",
    //         width: 24,
    //         height: 9,
    //     },
    // ]);



    useEffect(() => {

        gsap.fromTo(".drawings-section .section-title",
            {
                opacity: 0,
                scale: .9
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: Expo.easeInOut,
                scrollTrigger: {
                    trigger: ".drawings-section .section-title",
                    scrub: true,
                    end: "top 40%",
                }
            }
        )

        setTimeout(() => {
            gsap.fromTo(".drawings-section .gallery-wrapper img",
                {
                    opacity: 0,
                    scale: .7,
                },
                {
                    opacity: 1,
                    scale: 1,
                    stagger: .01,
                    duration: 1,
                    delay: .5,
                    ease: Expo.easeInOut,
                    scrollTrigger: {
                        trigger: ".drawings-section .gallery-wrapper",
                        toggleActions: "restart none none none",
                        start: "top 100%",
                        end: "bottom 90%",
                    }
                }
            )
        }, 1500);




    }, []);



    return (
        <section id='cizimlerim' className='py-8 drawings-section'>
            <div className="section-title flex gap-3 items-center">
                <h2>Çizimlerim</h2>
                <Image src={"/images/peepodraw.gif"} width={64} height={64} alt='peepo draw' />
            </div>

            <div className="gallery-wrapper">

                {/* <MyGallery photos={drawingsData} /> */}

                <div className='columns-1 sm:columns-2 md:columns-3 2xl:columns-4'>
                    {
                        drawings &&
                        drawings.map((data, index) => (
                            <Image
                                src={config.imageURL + data.attributes.cover?.data.attributes.url}
                                width={1024}
                                height={768}
                                alt={data.attributes.alt ? data.attributes.alt : 'Alper Koşay / Çizimlerim'}
                                className='w-full h-auto mb-2'
                                key={index}
                            />
                        ))
                    }
                </div>

            </div>
        </section>
    )
}

export default DrawingsSection