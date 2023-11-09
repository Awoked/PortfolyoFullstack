
import HeroSection from "@/components/Sections/Hero";
import AboutSection from "@/components/Sections/About";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import DrawingsSection from "@/components/DrawingsSection";
import ContactSection from "@/components/ContactSection";


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



    return (
        <main>
            <HeroSection sectionData={hero} />
            <AboutSection sectionData={about} />
            <SkillsSection sectionData={skills} skillsList={skillsListData} />
            <ProjectsSection sectionData={projects} projectData={projectsData} />
            <DrawingsSection sectionData={drawings} drawings={drawingsGalleryData} />
            <ContactSection />
        </main>
    )
}
