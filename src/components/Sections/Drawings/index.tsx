"use client"
import Image from 'next/image'
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Section } from '@/services/api/sections/types';
import { Drawing } from '@/services/api/drawings/types';
import SectionTitle from '@/components/ui/section-title';
import { ArrowRight } from 'lucide-react';
import DrawingsGrid from './DrawingsGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

                <DrawingsGrid
                    drawingsData={drawings}
                    showCount={6}
                />

                {
                    drawings.length > 0 &&
                    <div className='flex justify-center'>
                        <Button asChild className='gap-2' >
                            <Link href={"/cizimlerim"}>
                                Tümünü Gör <ArrowRight size={18} />
                            </Link>
                        </Button>
                    </div>
                }
            </div>
        </section>
    )
}

export default DrawingsSection