import { Chivo_Mono } from 'next/font/google';

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import DrawingsSection from "@/components/DrawingsSection";
import ContactSection from "@/components/ContactSection";
import { sectionService } from '@/services';
import { Gallery, SectionData } from '@prisma/client';
import { findSection } from '@/lib/utils';


const chivo_mono = Chivo_Mono({ subsets: ['latin'] })

export default async function Home() {

    const SectionsData = await sectionService.getAll();

    if (!SectionsData) {
        return "Error"
    }
    const heroSectionData = findSection("hero", SectionsData);

    const getSections = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/sections`, {
            next: {
                revalidate: 1
            }
        })

        return await res.json();
    }

    const newSections = await getSections();

    const heroData = newSections.data.find(x => x.attributes.section === "hero")
    console.log('heroData', heroData)
    return (
        <main className={`${chivo_mono.className}`}>

            <HeroSection sectionData={heroData.attributes} />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <DrawingsSection />
            <ContactSection />
        </main>
    )
}
