"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

const primaryBio =
  "I'm Safwan — a Full Stack Developer crafting fast, scalable, and immersive digital experiences that merge creativity with engineering precision.".split(
    " "
  );

const secondaryBio =
  "I specialize in developing SaaS platforms, AI-driven products, and interactive 3D web experiences using technologies like Next.js, Node.js, and Three.js.".split(
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

const aboutLetters = "About Me".split("");

export const HomeIntro = () => {
  return (
    <section className="relative About-me flex flex-col items-center w-full duration-200 h-full text-white z-50 gap-[4rem] -mt-[2rem] bg-sec font-cabinet">
      {/* 
        Exact Top Curve matching DevTools extraction:
        scale(1, 3.2751) with rounded-[50%] child
      */}
      <div
        className="overflow-hidden absolute left-[50%] lg:-top-[3rem] -top-[2rem] transform -translate-x-[50%] w-full about_top_curve lg:h-[4rem] h-[2rem] mb-14 z-40 pointer-events-none"
        style={{
          transform: "translate(-50%, 0%) translate3d(0px, 0px, 0px) scale(1, 3.2751)",
          transformOrigin: "center top",
        }}
      >
        <div className="absolute right-[-10%] rounded-[50%] h-[150%] w-[120%] bg-sec"></div>
      </div>

      {/* Primary Headline Block with 3D Word Reveal */}
      <div
        className="z-[60] text-white text-xl leading-2 lg:text-4xl xl:text-5xl text-center lg:xl:mb-4 pt-10 xl:max-w-6xl lg:max-w-5xl w-full mx-auto px-4"
        style={{ perspective: "1000px" }}
      >
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.02 }}
          style={{ perspective: "1000px" }}
          className="inline"
        >
          {primaryBio.map((word, i) => (
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
                style={{
                  transformOrigin: "center bottom",
                  transformStyle: "preserve-3d",
                }}
                className="inline-block mb-[0.2rem]"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h2>
      </div>

      {/* Secondary Sub-paragraph Block with 3D Word Reveal */}
      <div
        className="text-white text-lg md:text-2xl lg:text-2xl xl:text-3xl text-center mb-1 max-w-5xl mx-auto px-4"
        style={{ perspective: "1000px" }}
      >
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.015, delayChildren: 0.15 }}
          style={{ perspective: "1000px" }}
          className="inline"
        >
          {secondaryBio.map((word, i) => (
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
                style={{
                  transformOrigin: "center bottom",
                  transformStyle: "preserve-3d",
                }}
                className="inline-block mb-[0.2rem]"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.p>
      </div>

      {/* 
        Stats Grid from Reference Extraction:
        Years of Experience (1.5+ in accent) & Role (Full-Stack) with border-t border-white/10
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 border-t border-white/10 pt-10 pb-4 max-w-4xl w-full mx-auto px-6">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">
            Years of Experience
          </p>
          <div className="text-5xl md:text-7xl font-bold text-accent">
            1.5+
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">
            Role
          </p>
          <div className="text-4xl md:text-6xl font-bold uppercase text-white">
            Full-Stack
          </div>
        </div>
      </div>

      {/* 
        Interactive 'About Me' Button matching DevTools extraction:
        - Hover white fill expansion from left
        - Rolling letter animation on 'About Me'
        - Dual flying diagonal arrow animation in circular icon button
      */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
        <a href="#about-me">
          <button
            className="relative group flex items-center justify-center cursor-pointer select-none"
            style={{ willChange: "transform", backfaceVisibility: "hidden" }}
          >
            {/* Pill Container with Rolling Text */}
            <div className="group relative inline-flex items-center justify-center gap-3 bg-accent text-black font-medium rounded-full transition-all duration-300 hover:gap-4 overflow-hidden text-lg px-8 py-5">
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="relative z-10 overflow-hidden flex items-center h-6">
                <div className="relative overflow-hidden inline-block cursor-pointer select-none">
                  {/* Primary text sliding up */}
                  <div className="flex transition-transform duration-300 group-hover:-translate-y-7">
                    {aboutLetters.map((char, idx) => (
                      <span
                        key={idx}
                        className="inline-block whitespace-pre font-bold text-sm tracking-wider uppercase"
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                  {/* Secondary duplicate sliding in from below */}
                  <div className="flex absolute top-0 left-0 transition-transform duration-300 translate-y-7 group-hover:translate-y-0">
                    {aboutLetters.map((char, idx) => (
                      <span
                        key={idx}
                        className="inline-block whitespace-pre font-bold text-sm tracking-wider uppercase"
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Circular Arrow Button with Dual Flying Arrow Transition */}
            <div className="hidden overflow-hidden md:flex w-14 h-14 bg-accent rounded-full items-center justify-center relative ml-3">
              <div className="absolute inset-0 delay-100 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              {/* First Arrow (flies out to top-right on hover) */}
              <svg
                className="w-5 h-5 text-black absolute transition-all duration-300 translate-y-0 translate-x-0 opacity-100 group-hover:-translate-y-full group-hover:translate-x-full group-hover:opacity-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
              {/* Second Arrow (flies in from bottom-left on hover) */}
              <svg
                className="w-5 h-5 text-black absolute transition-all duration-300 translate-y-full -translate-x-full opacity-0 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </div>
          </button>
        </a>
      </div>

      {/* Sub-bar: Scroll to Explore / My Short Story */}
      <div className="flex overflow-hidden justify-between items-center text-sm text-main px-4 w-full max-w-5xl">
        <div className="flex items-center gap-2">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="w-4 h-4 animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          <span>Scroll to Explore</span>
        </div>
        <span>My Short Story</span>
      </div>

      {/* Section Bottom Divider Line */}
      <div className="w-full z-[9999] h-[1px] bg-main/30"></div>
    </section>
  );
};

export default HomeIntro;
