import { Chivo_Mono } from 'next/font/google';

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import DrawingsSection from "@/components/DrawingsSection";
import ContactSection from "@/components/ContactSection";

import { drawings, projects, sections, skillsList } from '@/services/api';

const chivo_mono = Chivo_Mono({ subsets: ['latin'] })

export default async function Home() {


    const { data: hero, error } = await sections.findBySection("hero");

    const { data: about, error: aboutError } = await sections.findBySection("about");

    const { data: skills, error: skillsError } = await sections.findBySection("skills");
    const { data: skillsListData, error: skillsListError } = await skillsList.findMany();

    const { data: projectsSection, error: projectsSectionError } = await sections.findBySection("projects");
    const { data: projectsData, error: projectsError } = await projects.findMany();

    const { data: drawingsData, error: drawingsError } = await sections.findBySection("drawings");
    const { data: drawingsGalleryData, error: drawingsGalleryError } = await drawings.findMany();


    if (error) {
        return "Error"
    }

    return (
        <main className={`${chivo_mono.className}`}>

            <HeroSection sectionData={hero[0].attributes} />
            <AboutSection sectionData={about[0].attributes} />
            <SkillsSection sectionData={skills[0].attributes} skillsList={skillsListData} />
            <ProjectsSection sectionData={projectsSection[0].attributes} projectData={projectsData} />
            <DrawingsSection sectionData={drawingsData[0].attributes} drawings={drawingsGalleryData} />
            <ContactSection />
        </main>
    )
}
