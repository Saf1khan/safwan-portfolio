"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ProjectData } from "@/lib/projects-data";

interface ProjectBannerProps {
  project: ProjectData;
}

export default function ProjectBanner({ project }: ProjectBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const containerScale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <div
      id="project-banner-section"
      ref={containerRef}
      className="p-3 sm:p-4 md:p-[2rem] relative overflow-hidden w-full min-h-[50vh] sm:min-h-[60vh] md:min-h-[80vh] lg:min-h-screen pb-8 sm:pb-10 md:pb-20 select-none"
      style={{
        borderRadius: "0rem",
        willChange: "transform, padding",
      }}
    >
      <motion.div
        style={{ scale: containerScale, willChange: "transform, padding" }}
        className="w-full h-[50vh] sm:h-[60vh] md:h-[80vh] lg:h-[100vh] rounded-none overflow-hidden relative"
      >
        <motion.img
          style={{ scale: imageScale }}
          alt={project.title}
          src={project.heroImage || project.image}
          className="object-cover absolute inset-0 w-full h-full"
          fetchPriority="high"
          loading="eager"
        />
      </motion.div>
    </div>
  );
}
