import HeroSection from "./_components/Sections/Hero";
import AboutSection from "./_components/Sections/About";
import SkillsSection from "./_components/Sections/Skills";
import ProjectsSection from "./_components/Sections/Projects";
import DrawingsSection from "./_components/Sections/Drawings";
import ContactSection from "./_components/Sections/Contact";

import api from "@/services/api";
import { ScrollControls } from "@react-three/drei";

export default async function Home() {
  const { data: sectionsData } = await api.sections.findMany();

  const { hero, about, skills, projects, drawings } =
    api.sections.filterSections(
      ["hero", "about", "skills", "projects", "drawings"],
      sectionsData
    );

  const { data: skillsListData, error: skillsListError } =
    await api.skillsList.findMany();

  const { data: projectsData, error: projectsError } =
    await api.projects.findMany();

  const { data: drawingsGalleryData, error: drawingsGalleryError } =
    await api.drawings.findMany();

  return (
    <main className="min-h-screen">
      <HeroSection sectionData={hero} />
      <AboutSection sectionData={about} />
      <SkillsSection sectionData={skills} skillsList={skillsListData} />
      <ProjectsSection sectionData={projects} projectData={projectsData} />
      <DrawingsSection sectionData={drawings} drawings={drawingsGalleryData} />
      <ContactSection />
    </main>
  );
}
