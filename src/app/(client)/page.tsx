import { Chivo_Mono } from 'next/font/google';

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import DrawingsSection from "@/components/DrawingsSection";
import ContactSection from "@/components/ContactSection";
import { SectionService } from '@/services/SectionService';

const chivo_mono = Chivo_Mono({ subsets: ['latin'] })

export default async function Home() {
  const sectionService = new SectionService();

  const SectionsData = await sectionService.getAll();

  return (
    <main className={`${chivo_mono.className} transition-all`}>
      <pre>
        {JSON.stringify(SectionsData, null, 2)}
      </pre>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <DrawingsSection />
      <ContactSection />
    </main>
  )
}
