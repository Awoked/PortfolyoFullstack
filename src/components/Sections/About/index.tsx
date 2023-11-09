"use client"
import React from 'react'
import { Section } from '@/services/api/sections/types';
import SectionTitle from '@/components/ui/section-title';
import ContentWrapper from '@/components/ui/content-wrapper';


const AboutSection = ({ sectionData }: { sectionData: Section }) => {


    return (
        <section className='py-8' id='hakkimda'>
            <SectionTitle>
                <h2>
                    {sectionData.attributes.title}
                </h2>
            </SectionTitle>

            <div className="container">
                <ContentWrapper>
                    <div 
                        dangerouslySetInnerHTML={{ __html: sectionData.attributes.content }}
                    ></div>
                </ContentWrapper>
            </div>
        </section>
    )
}

export default AboutSection;