import { Chivo_Mono } from 'next/font/google';

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import DrawingsSection from "@/components/DrawingsSection";
import ContactSection from "@/components/ContactSection";
import { sectionService } from '@/services';
import { SectionData } from '@prisma/client';
import Image from 'next/image';
import { Send } from 'lucide-react';


const chivo_mono = Chivo_Mono({ subsets: ['latin'] })

export default async function Home() {
  // const sectionService =  SectionService;

  const SectionsData: SectionData[] = await sectionService.getAll();

  const heroSectionData = SectionsData.find(x => x.section === "hero");

  return (
    <main className={`${chivo_mono.className} transition-all`}>

      <HeroSection sectionData={heroSectionData} />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <DrawingsSection />
      <ContactSection />
    </main>
  )
}
