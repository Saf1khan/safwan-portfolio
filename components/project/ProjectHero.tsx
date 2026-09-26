"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import type { ProjectData } from "@/lib/projects-data";

interface ProjectHeroProps {
  project: ProjectData;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const sideContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.25,
    },
  },
};

const wordAnimation: Variants = {
  hidden: {
    y: "100%",
    rotateX: -20,
    opacity: 0,
  },
  visible: {
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

export default function ProjectHero({ project }: ProjectHeroProps) {
  const titleWords = project.title.split(" ");
  const subtitleWords = (project.subtitle || "Showcasing creativity").split(" ");
  const descriptionWords = (project.description || "Through outstanding project").split(" ");

  return (
    <div className="pt-8 sm:pt-10 md:pt-20 pb-6 sm:pb-8 text-black select-none">
      <div className="max-w-8xl mx-auto px-4 sm:px-[1rem] lg:px-[2rem]">
        {/* Top Header Flex Row */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-12 items-start justify-between mb-6 sm:mb-8 lg:mb-12">
          {/* Left Column: Project Title */}
          <div className="w-full lg:w-auto">
            <h1 className="project-title font-cabinetGrotesk text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] font-bold leading-[1.1] sm:leading-tight lg:leading-none">
              <motion.span
                style={{ perspective: "1000px" }}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="inline-block"
              >
                {titleWords.map((word, i) => (
                  <span
                    key={i}
                    className="inline-block overflow-hidden mr-[0.3em]"
                    style={{
                      lineHeight: 1,
                      clipPath: "polygon(0px 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    <motion.span
                      variants={wordAnimation}
                      className="inline-block mb-[0.2rem]"
                      style={{
                        transformOrigin: "center bottom",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </h1>
          </div>

          {/* Right Column: Subtitle & Italic Description */}
          <div className="lg:pt-8 lg:space-y-2 space-y-0 text-start lg:text-end w-full lg:w-auto">
            <h2 className="project-subtitle font-cabinetGrotesk text-sm sm:text-base md:text-xl lg:text-2xl font-normal">
              <motion.span
                style={{ perspective: "1000px" }}
                initial="hidden"
                animate="visible"
                variants={sideContainerVariants}
                className="inline-block"
              >
                {subtitleWords.map((word, i) => (
                  <span
                    key={i}
                    className="inline-block overflow-hidden mr-[0.3em]"
                    style={{
                      lineHeight: 1,
                      clipPath: "polygon(0px 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    <motion.span
                      variants={wordAnimation}
                      className="inline-block mb-[0.2rem]"
                      style={{
                        transformOrigin: "center bottom",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </h2>

            <div className="project-description font-cabinetGrotesk text-sm sm:text-base md:text-xl lg:text-2xl italic">
              <motion.div
                style={{ perspective: "1000px" }}
                initial="hidden"
                animate="visible"
                variants={sideContainerVariants}
              >
                {descriptionWords.map((word, i) => (
                  <span
                    key={i}
                    className="inline-block overflow-hidden mr-[0.3em]"
                    style={{
                      lineHeight: 1,
                      clipPath: "polygon(0px 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    <motion.span
                      variants={wordAnimation}
                      className="inline-block mb-[0.2rem]"
                      style={{
                        transformOrigin: "center bottom",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Scroll to Explore */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-4 h-4 md:w-5 md:h-5 text-black"
            >
              <svg
                className="w-full h-full"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
            <span className="font-cabinetGrotesk text-xs sm:text-sm md:text-base lg:text-lg font-medium">
              Scroll to Explore
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
