"use client";
import React, { useEffect, useRef } from "react";

import styles from "./skills.module.css";

import { SkillsList } from "@/services/api/skills-list/types";
import gsap from "gsap";

const SkillCard = ({
  skillData,
  index,
}: {
  skillData: SkillsList;
  index: number;
}) => {
  const skillCardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 == 0;

  useEffect(() => {
    if (skillCardRef.current) {
      gsap.from(skillCardRef.current, {
        scale: 0.95,
        opacity: 0,
        x: isEven ? "-100%" : "100%",
        duration: 2,
        scrollTrigger: {
          trigger: skillCardRef.current,
          start: "top-=100 90%",
          end: "bottom 65%",
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <div
      ref={skillCardRef}
      className={`w-full skill-card shadow-lg before:border before:border-primary before:bg-card after:bg-card shadow-card after:border after:border-primary ${styles.card}`}
    >
      <div
        className={`skill-card-inner bg-card border border-primary p-3 h-full`}
      >
        <div className="card-header flex justify-between items-baseline pb-2">
          <h3 className="skill-name font-semibold text-lg xl:text-xl">
            {skillData.attributes.title}
          </h3>

          <span className="font-medium text-sm 2xl:text-base">
            {skillData.attributes.level}%
          </span>
        </div>
        <div className="skill-level">
          <div className="level w-full h-2 rounded-md border overflow-hidden">
            <div
              className={`inner bg-primary rounded-md h-full`}
              style={{ width: `${skillData.attributes.level}%` }}
            ></div>
          </div>
        </div>
        <p className="skill-detail text-base font-medium p-1 py-3">
          {skillData.attributes.description}
        </p>
      </div>
    </div>
  );
};

export default SkillCard;
