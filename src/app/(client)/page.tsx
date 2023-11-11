
import HeroSection from "@/components/Sections/Hero";
import AboutSection from "@/components/Sections/About";
import SkillsSection from "@/components/Sections/Skills";
import ProjectsSection from "@/components/Sections/Projects";
import DrawingsSection from "@/components/Sections/Drawings";
import ContactSection from "@/components/Sections/Contact";

import api from '@/services/api';

export default async function Home() {

    const { data: sectionsData } = await api.sections.findMany();

    const {
        hero,
        about,
        skills,
        projects,
        drawings
    } = api.sections.filterSections(["hero", "about", "skills", "projects", "drawings"], sectionsData);


    const { data: skillsListData, error: skillsListError } = await api.skillsList.findMany();

    const { data: projectsData, error: projectsError } = await api.projects.findMany();

    const { data: drawingsGalleryData, error: drawingsGalleryError } = await api.drawings.findMany();

    // await new Promise(resolve => setTimeout(resolve, 5000))

    return (
        <main className="min-h-screen">
            <HeroSection sectionData={hero} />
            <AboutSection sectionData={about} />
            <SkillsSection sectionData={skills} skillsList={skillsListData} />
            <ProjectsSection sectionData={projects} projectData={projectsData} />
            <DrawingsSection sectionData={drawings} drawings={drawingsGalleryData} />
            <ContactSection />
        </main>
    )
}
