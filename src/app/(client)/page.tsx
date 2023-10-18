import { Chivo_Mono } from 'next/font/google';
import Head from 'next/head';

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import DrawingsSection from "@/components/DrawingsSection";
import ContactSection from "@/components/ContactSection";

const chivo_mono = Chivo_Mono({ subsets: ['latin'] })

const getData = async () => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/sections`, {
      next: {
        revalidate: 0
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error)
    return {
      error,
    }
  }
}

export default async function Home() {

  const myData = await getData();
  return (
    <main className={`${chivo_mono.className} transition-all`}>
      {JSON.stringify(myData)}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <DrawingsSection />
      <ContactSection />
    </main>
  )
}
