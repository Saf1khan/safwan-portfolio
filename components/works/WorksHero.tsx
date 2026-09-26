"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

const titleWords = ["My", "Work"];

const descText =
  "Discover my latest projects where design, technology, and creativity come together to craft engaging digital experiences. Below is a collection of my favourites.";

const descWords = descText.split(" ");

const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const descContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.015,
      delayChildren: 0.15,
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

export default function WorksHero() {
  return (
    <div className="pt-12 pb-7 px-[1rem] lg:px-[2rem]">
      {/* Works Title with 3D Word Reveal */}
      <motion.div
        className="works-title text-5xl md:text-6xl lg:text-8xl font-cabinetGrotesk leading-tight text-black mb-4 md:mb-6"
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

      {/* Description Paragraph with 3D Perspective Roll */}
      <div className="text-lg md:text-xl leading-relaxed max-w-3xl font-cabinetGrotesk">
        <motion.div
          style={{ perspective: "1000px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={descContainerVariants}
        >
          {descWords.map((word, i) => (
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
  );
}
