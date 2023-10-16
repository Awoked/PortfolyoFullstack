import { Chivo_Mono } from 'next/font/google';
import Head from 'next/head';

import HeroSection from "@/app/components/HeroSection";
import AboutSection from "@/app/components/AboutSection";
import SkillsSection from "@/app/components/SkillsSection";
import ProjectsSection from "@/app/components/ProjectsSection";
import DrawingsSection from "@/app/components/DrawingsSection";
import ContactSection from "@/app/components/ContactSection";

const chivo_mono = Chivo_Mono({ subsets: ['latin'] })


export default function Home() {

  return (
    <main className={`${chivo_mono.className} transition-all`}>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <DrawingsSection />
      <ContactSection />
    </main>
  )
}
