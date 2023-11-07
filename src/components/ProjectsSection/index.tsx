"use client"
import React, { useEffect, useRef, useState } from 'react'


import { BiChevronLeft, BiChevronRight, BiCodeAlt } from "react-icons/bi";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import ProjectCard from './ProjectCard';
import { Expo, Power4, gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Navigation } from 'swiper/modules';
import { Section_Plain } from '@/services/api/sections/types';
import { Project } from '@/services/api/projects/types';
import config from '@/config';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = ({ sectionData, projectData }: { sectionData: Section_Plain, projectData: Project[] }) => {


    const [projectsData, setProjectsData] = useState(projectData);




    const sliderNext = useRef(null);
    const sliderPrev = useRef(null);

    useEffect(() => {

        const tl = gsap.timeline();
        tl.fromTo(".projects-section .section-title",
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
                    trigger: ".projects-section .section-title",
                    scrub: true
                }
            }
        )
        gsap.fromTo(".projects-section .project-card",
            {
                opacity: 0,
                x: -100,
            },
            {
                opacity: 1,
                x: 0,
                duration: 1.4,
                ease: Power4.easeInOut,
                stagger: .10,
                delay: .5,
                scrollTrigger: {
                    trigger: ".projects-section .projects-wrapper",
                    toggleActions: "restart none none none",
                    end: "bottom 40%",
                }
            }
        )


    }, []);



    return (
        <section className='py-8 projects-section'>

            <div className="section-title items-center gap-2">
                <h2>{sectionData.title} </h2>
                <BiCodeAlt size={32} className='text-blue-600' />
            </div>


            <div className="container mx-auto">
                <div className="projects-wrapper py-8">
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
                            projectsData &&
                            projectsData.map((project, index) => {
                                let cover = project.attributes.cover?.data?.attributes.url;

                                return <SwiperSlide key={index}>

                                    <ProjectCard
                                        imageUrl={cover ? config.imageURL + cover : ""}
                                        githubLink={project.attributes.githubLink}
                                        liveLink={project.attributes.liveLink}
                                        details={project.attributes.details}
                                        title={project.attributes.title}
                                    />

                                </SwiperSlide>
                            })
                        }
                        <div className="navigation py-10 flex justify-center gap-3 text-4xl text-black">
                            <button ref={sliderPrev}>
                                <BiChevronLeft />
                            </button>
                            <button ref={sliderNext}>
                                <BiChevronRight />
                            </button>
                        </div>
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default ProjectsSection