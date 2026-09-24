"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

const titleWords = ["About", "Me"];

const bioText =
  "I'm a full-stack developer who enjoys building things that genuinely make life easier for users and businesses. Most of my work sits at the intersection of AI, SaaS, and interactive 3D experiences. I like taking ideas from the first concept all the way to a polished product—whether that means designing a clean React interface or structuring reliable backend microservices. I focus heavily on real results. In past projects, I've helped cut AI response times by about 40% and built automations that removed nearly 80% of the manual work for teams. My goal is always the same: create fast, scalable, and meaningful tools that people actually enjoy using.";

const bioWords = bioText.split(" ");

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.015,
      delayChildren: 0.1,
    },
  },
};

const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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

export default function AboutHero() {
  return (
    <div className="item px-[0.8rem] md:px-[2rem] flex md:flex-row gap-7 flex-col justify-between relative">
      <div className="pt-12 pb-7">
          {/* Animated Title: About Me */}
          <motion.div
            className="works-title text-5xl md:text-6xl lg:text-8xl font-cabinetGrotesk leading-tight text-black mb-6 md:mb-8"
            style={{ perspective: "1000px" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={titleContainerVariants}
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
          </motion.div>

          {/* Animated Bio: 3D perspective word roll */}
          <motion.div
            className="lg:text-lg xl:text-xl leading-relaxed font-cabinetGrotesk max-w-full lg:max-w-4xl xl:max-w-5xl text-gray-800"
            style={{ perspective: "1000px" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {bioWords.map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden mr-[0.3em]"
                style={{
                  lineHeight: 1.25,
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
  );
}
