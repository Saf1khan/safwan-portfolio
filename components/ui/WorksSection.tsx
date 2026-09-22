"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";

const headlineWords =
  "Discover my latest work and creative solutions that bring ideas to life".split(
    " "
  );

const wordAnimation: Variants = {
  hidden: { y: "110%", rotateX: -15, opacity: 0 },
  visible: {
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
  },
};

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  letters: string[];
  href: string;
}

const projects: Project[] = [
  {
    id: "vexlogic-ai",
    title: "VexLogic ai",
    category: "AI Assistant",
    image: "/projects/vexlogic-ai.jpg",
    letters: ["V", "e", "x", "L", "o", "g", "i", "c", " ", "a", "i"],
    href: "#",
  },
  {
    id: "vexlogic-business",
    title: "VexLogic bussiness",
    category: "Bussiness",
    image: "/projects/vexlogic-business.jpg",
    letters: [
      "V",
      "e",
      "x",
      "L",
      "o",
      "g",
      "i",
      "c",
      " ",
      "b",
      "u",
      "s",
      "s",
      "i",
      "n",
      "e",
      "s",
      "s",
    ],
    href: "#",
  },
  {
    id: "comra",
    title: "Comra",
    category: "3D Visualisation",
    image: "/projects/comra.jpg",
    letters: ["C", "o", "m", "r", "a"],
    href: "#",
  },
  {
    id: "superhost",
    title: "Superhost",
    category: "Property Booking",
    image: "/projects/superhost.jpg",
    letters: ["S", "u", "p", "e", "r", "h", "o", "s", "t"],
    href: "#",
  },
];

export const WorksSection = () => {
  return (
    <section className="works-section works relative py-20 px-[1rem] md:px-[4rem] bg-main text-sec font-cabinet select-none">
      <div className="max-w-[90vw] mx-auto works-section">
        {/* Section Headline with Calibrated 3D Bottom-Reveal */}
        <div
          className="text-sec w-full text-3xl lg:text-4xl font-medium max-w-3xl mb-8 sm:mb-12 leading-[1.3] lg:px-4 px-1"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ staggerChildren: 0.02 }}
          >
            {headlineWords.map((word, i) => (
              <span
                key={i}
                className="inline-block mr-[0.3em]"
                style={{
                  lineHeight: 1.25,
                  clipPath:
                    "polygon(-10% -50%, 110% -50%, 110% 100%, -10% 100%)",
                }}
              >
                <motion.span
                  variants={wordAnimation}
                  style={{
                    transformOrigin: "center bottom",
                    transformStyle: "preserve-3d",
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* 2-Column Responsive Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <div key={project.id} className="group will-change-transform">
              {/* Project Header Info */}
              <div className="mb-4">
                <div className="text-2xl md:text-3xl lg:text-4xl font-medium text-sec mb-1 transition-colors duration-300 group-hover:text-sec/80">
                  {project.title}
                </div>
                <div className="text-sec/60 text-base md:text-lg font-light">
                  {project.category}
                </div>
              </div>

              {/* Project Image Card with Hover Micro-Interactions */}
              <Link
                href={project.href}
                className="block relative overflow-hidden aspect-[4/3] cursor-pointer rounded-2xl bg-black/10 shadow-lg"
              >
                {/* Showcase Image with scale on hover */}
                <img
                  alt={project.title}
                  loading="lazy"
                  className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                  src={project.image}
                />

                {/* Dark Overlay fading in */}
                <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none" />

                {/* Staggered Neon Title Letters Wave on Hover */}
                <div className="absolute inset-0 flex items-center justify-center px-8 pointer-events-none">
                  <div className="flex flex-wrap justify-center gap-1 font-righteous">
                    {project.letters.map((char, charIdx) => (
                      <span
                        key={charIdx}
                        style={{
                          transitionDelay: `${charIdx * 25}ms`,
                        }}
                        className="inline-block text-thr text-2xl md:text-5xl font-bold transition-all duration-500 ease-out transform translate-y-5 opacity-0 [clip-path:polygon(0_0,100%_0,100%_0,0_0)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Rolling "projects" CTA Button matching DevTools */}
        <div className="relative z-10 w-full mt-16 lg:mt-24 flex items-center justify-center">
          <Link href="/works/">
            <button
              className="relative group flex items-center justify-center cursor-pointer select-none"
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              {/* Main Pill Button */}
              <div className="group relative inline-flex items-center justify-center gap-3 bg-thr text-black font-medium rounded-full transition-all duration-300 hover:gap-4 overflow-hidden text-lg px-8 py-5 shadow-lg">
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="relative z-10 overflow-hidden flex items-center">
                  <div className="relative overflow-hidden inline-block cursor-pointer select-none h-6">
                    {/* Primary Text */}
                    <div className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                      {"projects".split("").map((letter, i) => (
                        <span key={i} className="inline-block whitespace-pre">
                          {letter}
                        </span>
                      ))}
                    </div>
                    {/* Rolling Secondary Text */}
                    <div className="block absolute top-0 left-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
                      {"projects".split("").map((letter, i) => (
                        <span key={i} className="inline-block whitespace-pre">
                          {letter}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Accompanying Circle Icon Button with Diagonal Arrow Animation */}
              <div className="hidden overflow-hidden md:flex w-14 h-14 bg-thr rounded-full items-center justify-center relative ml-3 shadow-lg">
                <div className="absolute inset-0 delay-100 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                {/* Arrow 1: leaves up-right on hover */}
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
                {/* Arrow 2: enters from bottom-left on hover */}
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
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
