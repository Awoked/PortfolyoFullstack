import { Chivo_Mono } from 'next/font/google';

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import DrawingsSection from "@/components/DrawingsSection";
import ContactSection from "@/components/ContactSection";
import { sectionService } from '@/services';
import { SectionDataType } from '../api/sections/route';
import { SectionData } from '@prisma/client';


const chivo_mono = Chivo_Mono({ subsets: ['latin'] })

export default async function Home() {
  // const sectionService =  SectionService;

  const SectionsData: SectionData[] = await sectionService.getAll();



  return (
    <main className={`${chivo_mono.className} transition-all`}>
      <pre>
        {JSON.stringify(SectionsData, null, 2)}
      </pre>

      {
        SectionsData.map((data, index) => (
          <div dangerouslySetInnerHTML={{ __html: data.content }}>

          </div>
        ))
      }
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <DrawingsSection />
      <ContactSection />
    </main>
  )
}
