"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Power3, Expo, gsap } from "gsap";

import { Section } from "@/services/api/sections/types";
import SplitType from "split-type";

import { TfiMouse } from "react-icons/tfi";

import WorldCanvas from "./WorldCanvas";
import { useTheme } from "next-themes";
import useScroll from "@/hooks/useScroll";

import { useGSAP } from "@gsap/react";

const HeroSection = ({ sectionData }: { sectionData: Section }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollDownRef = useRef<HTMLDivElement>(null);
  const { scrollCount } = useScroll();
  const theme = useTheme();

  // First Load Animations
  useLayoutEffect(() => {
    if (titleRef.current && contentRef.current) {
      const titleText = new SplitType(titleRef.current);
      const contentText = new SplitType(contentRef.current);

      let ctx = gsap.context(() => {
        const tl = gsap.timeline({
          // delay: 1.1
        });

        gsap.set(titleRef.current, {
          opacity: 1,
        });
        tl.from(titleText.words, {
          y: "120%",
          stagger: 0.3,
          duration: 1,
          ease: Power3.easeInOut,
        });

        gsap.set(contentRef.current, {
          opacity: 1,
        });
        tl.from(contentText.chars, {
          opacity: 0,
          y: 65,
          stagger: 0.04,
          duration: 0.7,
          ease: Expo.easeOut,
        });

        gsap.set(scrollDownRef.current, {
          opacity: 1,
        });
        tl.from(scrollDownRef.current, {
          autoAlpha: 0,
          duration: 1,
        });
      });

      return () => ctx.revert();
    }
  }, []);

  const ScrollDown = () => {
    window.scrollTo({ top: window.innerHeight - 100, behavior: "smooth" });
  };

  const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
  const auroraRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      repeat: -1,
    });
    COLORS.forEach((color, index) => {
      tl.to(auroraRef.current, {
        backgroundImage: `radial-gradient(125% 125% at 50% 0%, transparent 55%, ${color})`,
        duration: 2,
        ease: "power4.out",
      });
    });
  });

  return (
    <>
      <div
        ref={auroraRef}
        className={`fixed inset-0 transition-all duration-1000 ${
          scrollCount > 300 ? "opacity-0 translate-y-1/2" : "opacity-100"
        }`}
        style={{
          backgroundImage:
            "radial-gradient(125% 125% at 50% 0%, transparent 55%, #DD335C)",
        }}
      ></div>
      <section className={`relative overflow-hidden`}>
        <div className="container">
          <div className="flex justify-center items-center h-[100svh]">
            <div className="flex flex-col justify-center text-center">
              <div className="overflow-hidden">
                <h1
                  ref={titleRef}
                  className={`title text-6xl md:text-9xl md:py-2 font-bold mb-4 md:mb-6 opacity-0`}
                >
                  {sectionData?.attributes.title}
                </h1>
              </div>
              <div className="overflow-hidden py-3">
                <div
                  ref={contentRef}
                  className="text-3xl md:text-5xl font-medium content-reveal opacity-0"
                  dangerouslySetInnerHTML={{
                    __html: sectionData?.attributes.content,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={scrollDownRef}
          className="absolute bottom-10 md:bottom-20 left-1/2 -translate-x-1/2 opacity-0"
        >
          <button className="p-3 animate-bounce" onClick={ScrollDown}>
            <TfiMouse size={40} />
          </button>
        </div>
      </section>
      <div className="fixed -z-10 w-full h-screen left-0 top-0">
        <WorldCanvas />
      </div>
    </>
  );
};

export default HeroSection;
