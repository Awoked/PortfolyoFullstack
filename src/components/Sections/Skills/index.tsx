"use client"
import React from 'react'
import { gsap } from 'gsap';
import SkillCard from './SkillCard';

import styles from "./skills.module.css";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Section } from '@/services/api/sections/types';
import { SkillsList } from '@/services/api/skills-list/types';
import SectionTitle from '@/components/ui/section-title';
import ContentWrapper from '@/components/ui/content-wrapper';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = ({ sectionData, skillsList }: { sectionData: Section, skillsList: SkillsList[] }) => {

    return (
        <section className={`min-h-screen skills-section py-10 overflow-x-hidden ${styles.background}`} id='yeteneklerim'>

            <SectionTitle>
                <h2>
                    {sectionData.attributes.title}
                </h2>
            </SectionTitle>

            <div className="container">

                <ContentWrapper>
                    <p className='w-full text-center'>
                        {sectionData.attributes.description}
                    </p>
                </ContentWrapper>

                <div className="py-20 grid grid-cols-1 md:grid-cols-2 gap-y-24 md:gap-y-16 gap-x-14 xl:gap-x-24 2xl:gap-x-40">

                    {
                        skillsList &&
                        skillsList.map((skill, index) => (
                            <SkillCard
                                key={index}
                                skillData={skill}
                                index={index}
                            />
                        ))
                    }
                </div>

            </div>
        </section>
    )
}

export default SkillsSection