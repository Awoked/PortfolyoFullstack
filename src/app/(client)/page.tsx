import { Chivo_Mono } from 'next/font/google';

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import DrawingsSection from "@/components/DrawingsSection";
import ContactSection from "@/components/ContactSection";
import { sectionService } from '@/services';
import { Gallery, SectionData } from '@prisma/client';


const chivo_mono = Chivo_Mono({ subsets: ['latin'] })

interface ISectionData extends SectionData {
    Gallery: Gallery[]
}
export default async function Home() {

    const SectionsData: ISectionData[] = await sectionService.getAll();

    const heroSectionData = SectionsData.find(x => x.section === "hero");

    return (
        <main className={`${chivo_mono.className}`}>

            <HeroSection sectionData={heroSectionData} />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <DrawingsSection />
            <ContactSection />
        </main>
    )
}
