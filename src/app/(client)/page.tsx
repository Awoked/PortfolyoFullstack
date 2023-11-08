
import HeroSection from "@/components/Sections/Hero";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import DrawingsSection from "@/components/DrawingsSection";
import ContactSection from "@/components/ContactSection";


import api from '@/services/api';


export default async function Home() {


    const { data: hero, error } = await api.sections.findBySection("hero");

    const { data: about, error: aboutError } = await api.sections.findBySection("about");

    const { data: skills, error: skillsError } = await api.sections.findBySection("skills");
    const { data: skillsListData, error: skillsListError } = await api.skillsList.findMany();

    const { data: projectsSection, error: projectsSectionError } = await api.sections.findBySection("projects");
    const { data: projectsData, error: projectsError } = await api.projects.findMany();

    const { data: drawingsData, error: drawingsError } = await api.sections.findBySection("drawings");
    const { data: drawingsGalleryData, error: drawingsGalleryError } = await api.drawings.findMany();


    if (error) {
        return "Error"
    }

    return (
        <main>
            <HeroSection sectionData={hero[0].attributes} />
            <AboutSection sectionData={about[0].attributes} />
            <SkillsSection sectionData={skills[0].attributes} skillsList={skillsListData} />
            <ProjectsSection sectionData={projectsSection[0].attributes} projectData={projectsData} />
            <DrawingsSection sectionData={drawingsData[0].attributes} drawings={drawingsGalleryData} />
            <ContactSection />
        </main>
    )
}
