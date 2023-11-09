"use client"
import Image from 'next/image'
import React, { useEffect } from 'react';
import { Expo, gsap } from 'gsap';
import { Section } from '@/services/api/sections/types';
import { Drawing } from '@/services/api/drawings/types';
import SectionTitle from '@/components/ui/section-title';
import Link from 'next/link';
import { BiRightArrow } from 'react-icons/bi';
import { ArrowRight } from 'lucide-react';

const DrawingsSection = ({ sectionData, drawings }: { sectionData: Section, drawings: Drawing[] }) => {

    useEffect(() => {
        gsap.from(".drawings-section .gallery-wrapper img", {
            opacity: 0,
            scale: .7,
            stagger: .10,
            duration: 1,
            scrollTrigger: {
                trigger: ".drawings-section .gallery-wrapper",
                start: "top 90%",
                end: "center 70%",
                scrub: true
            }
        })
    }, []);

    return (
        <section id='cizimlerim' className='py-8 drawings-section'>

            <SectionTitle className='flex items-center gap-2'>
                <h2>{sectionData.attributes.title}</h2>
                <Image src={"/images/peepodraw.gif"} width={64} height={64} alt='peepo draw' />
            </SectionTitle>

            <div className="gallery-wrapper">

                <div className='columns-1 sm:columns-2 md:columns-3 2xl:columns-4 mb-8'>
                    {
                        drawings.length &&
                        drawings.map((data, index) => (
                            index < 6 &&
                            <Image
                                src={data.attributes.cover?.data?.attributes.url || ""}
                                width={1024}
                                height={768}
                                alt={data.attributes.alt || 'Alper Koşay / Çizimlerim'}
                                className='w-full h-auto mb-2'
                                key={index}
                            />
                        ))
                    }

                </div>

                {
                    drawings.length > 0 &&
                    <Link href={"/drawings"} className='flex items-center gap-2 rounded-full py-1.5 px-4 border border-black mx-auto w-max'>
                        Devamını Gör <ArrowRight />
                    </Link>
                }
            </div>
        </section>
    )
}

export default DrawingsSection