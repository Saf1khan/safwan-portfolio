"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

const primaryBio =
  "I'm Safwan – a Full Stack Developer crafting fast, scalable, and immersive digital experiences that merge creativity with engineering precision.".split(
    " "
  );

const secondaryBio =
  "I specialize in developing production-grade web applications, interactive 3D experiences, and modern SaaS platforms using TypeScript, React, Next.js, and Node.js. Currently shipping end-to-end products as a Junior Software Engineer with the Sparklab team at IndiVillage.".split(
    " "
  );

const wordAnimation: Variants = {
  hidden: { y: "100%", rotateX: -15, opacity: 0 },
  visible: {
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
  },
};

export const HomeIntro = () => {
  return (
    <section className="relative w-full bg-sec text-white z-50 pt-28 md:pt-36 pb-28 px-4 md:px-16 font-cabinet">
      {/* 
        The Arching Curve:
        An SVG path with vector-effect="non-scaling-stroke" creates a crisp, 100% responsive,
        pixel-perfect convex arch rising over the light Hero section above.
      */}
      <div className="absolute left-0 -top-12 sm:-top-16 md:-top-24 lg:-top-32 w-full h-12 sm:h-16 md:h-24 lg:h-32 overflow-hidden pointer-events-none z-50">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <path
            d="M0,120 Q720,0 1440,120 L1440,120 L0,120 Z"
            className="fill-sec"
          />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
        {/* Primary Narrative (Large headline matching reference) */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.02 }}
          style={{ perspective: "1000px" }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight md:leading-snug tracking-tight text-white/95 max-w-4xl"
        >
          {primaryBio.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden mr-[0.25em] pb-1 align-top"
              style={{
                lineHeight: 1.15,
                clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            >
              <motion.span
                variants={wordAnimation}
                style={{ transformOrigin: "center bottom" }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        {/* Secondary Description Paragraph matching reference subtext */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.012, delayChildren: 0.2 }}
          style={{ perspective: "1000px" }}
          className="mt-12 text-base md:text-xl font-normal leading-relaxed text-main/70 max-w-3xl"
        >
          {secondaryBio.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden mr-[0.25em] pb-0.5 align-top"
              style={{
                lineHeight: 1.25,
                clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            >
              <motion.span
                variants={wordAnimation}
                style={{ transformOrigin: "center bottom" }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.p>

        {/* Stats / Counters Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-20 border-t border-main/15 pt-12 grid grid-cols-2 gap-8 md:gap-16 w-full max-w-4xl"
        >
          {/* Column 1 */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-xs md:text-sm uppercase tracking-widest text-main/60 mb-2 font-medium">
              Years of Experience
            </span>
            <span className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-accent">
              1.5+
            </span>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-xs md:text-sm uppercase tracking-widest text-main/60 mb-2 font-medium">
              Role
            </span>
            <span className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-main">
              FULL-STACK
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeIntro;
