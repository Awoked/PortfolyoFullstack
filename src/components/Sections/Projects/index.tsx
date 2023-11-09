"use client"
import 'swiper/css';
import React, { useEffect, useRef } from 'react'
import { BiChevronLeft, BiChevronRight, BiCodeAlt } from "react-icons/bi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Power4, gsap } from 'gsap';
import { Navigation } from 'swiper/modules';
import { Section } from '@/services/api/sections/types';
import { Project } from '@/services/api/projects/types';
import SectionTitle from '@/components/ui/section-title';
import ProjectCard from './ProjectCard';

const ProjectsSection = ({ sectionData, projectData }: { sectionData: Section, projectData: Project[] }) => {

    const sliderNext = useRef<HTMLButtonElement>(null);
    const sliderPrev = useRef<HTMLButtonElement>(null);

    useEffect(() => {

        gsap.from(".projects-section .project-card",
            {
                opacity: 0,
                y: "100%",
                duration: 1.4,
                ease: Power4.easeInOut,
                stagger: .20,
                delay: .5,
                scrollTrigger: {
                    trigger: ".projects-section",
                    start: "top bottom",
                    end: "center 65%",
                    scrub: 1.5,
                }
            }
        )

    }, []);



    return (
        <section className='py-8 projects-section' id='projelerim'>
            <SectionTitle>
                <h2 className='!flex items-center gap-2'>
                    {sectionData.attributes.title}
                    <BiCodeAlt size={32} className='text-blue-600' />
                </h2>
            </SectionTitle>

            <div className="container py-8">
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        nextEl: sliderNext.current,
                        prevEl: sliderPrev.current
                    }}
                    spaceBetween={50}
                    slidesPerView={1}
                    breakpoints={{
                        768: {
                            slidesPerView: 2
                        },
                        1024: {
                            slidesPerView: 3
                        }
                    }}
                >
                    {
                        projectData &&
                        projectData.map((project, index) => (
                            <SwiperSlide key={index}>
                                <ProjectCard
                                    cardData={project}
                                />
                            </SwiperSlide>
                        ))
                    }
                    <div className="py-10 flex items-center justify-center gap-3 text-4xl text-black">
                        <button ref={sliderPrev}>
                            <BiChevronLeft />
                        </button>
                        <button ref={sliderNext}>
                            <BiChevronRight />
                        </button>
                    </div>
                </Swiper>
            </div>
        </section>
    )
}

export default ProjectsSection