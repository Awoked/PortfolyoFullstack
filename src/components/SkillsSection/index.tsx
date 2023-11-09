"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Bounce, Elastic, Expo, Power4, gsap } from 'gsap';
import SkillCard from './SkillCard';

import styles from "./skills.module.css";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Section } from '@/services/api/sections/types';
import { SkillsList } from '@/services/api/skills-list/types';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = ({ sectionData, skillsList }: { sectionData: Section, skillsList: SkillsList[] }) => {


    const [skillsData, setSkillsData] = useState(skillsList);



    useEffect(() => {

        gsap.fromTo(".skills-section .section-title",
            {
                opacity: 0,
                scale: .9
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                delay: 0.3,
                ease: Expo.easeInOut,
                scrollTrigger: {
                    trigger: ".skills-section .skills-description",
                    toggleActions: "restart none none none",
                    start: "top 100%",
                    end: "bottom 70%",
                    scrub: true
                }
            }
        )
        gsap.fromTo(".skills-section .skills-description",
            {
                opacity: 0
            },
            {
                opacity: 1,
                duration: .6,
                delay: 0.3,
                ease: Power4.easeIn,
                scrollTrigger: {
                    trigger: ".skills-section .skills-description",

                    toggleActions: "restart none none none",
                    start: "top 100%",
                    end: "bottom 70%",
                }
            }
        )

        gsap.fromTo(".skill-card",
            {
                scale: .95,
                opacity: 0,
                y: -60,
                x: -100
            },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                x: 0,
                stagger: .20,
                duration: 2,
                delay: .2,
                ease: Elastic.easeInOut,
                scrollTrigger: {
                    trigger: ".skills-section",
                    toggleActions: "restart none none none",
                    start: "top 100%",
                    end: "bottom 90%",
                },
            }
        )

    }, []);

    return (
        <section className={`min-h-screen skills-section py-10 ${styles.background}`}>
            <div className="section-title">
                <h2>
                    {sectionData.attributes.title}

                </h2>
            </div>

            <div className="container mx-auto">

                <div className="skills-description">

                    <p className='text-center'>
                        {sectionData.attributes.description}
                    </p>

                </div>

                <div className="skills-grid-wrapper py-8 pb-20 pt-20 grid grid-cols-1 md:grid-cols-2 gap-y-24 md:gap-y-16 gap-14 xl:gap-x-24 2xl:gap-x-40">

                    {
                        skillsData &&
                        skillsData.map((skill, index) => (
                            <SkillCard
                                key={index}
                                skillName={skill.attributes.title}
                                skillLevel={skill.attributes.level}
                                skillDetail={skill.attributes.description}
                            />
                        ))
                    }
                </div>

            </div>
        </section>
    )
}

export default SkillsSection