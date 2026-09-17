"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Content arrays from DevTools extraction and Safwan's engineering focus
const barOneItems = [
  "Handcrafted Digital Solutions • ",
  "Driven by Passion • ",
  "Built with Code • ",
  "Frontend Engineering • ",
  "React.js • ",
  "TypeScript • ",
  "Next.js • ",
  "Interactive UI • ",
];

const barTwoItems = [
  "UI & UX Design • ",
  "Scalable Tech • ",
  "Creative Solutions • ",
  "Full-Stack Development • ",
  "Node.js • ",
  "Python • ",
  "SaaS Architectures • ",
  "Clean Code • ",
];

export const SlidingBars = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll tracking across the section's passage through the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Spring physics for smooth, organic scroll responsiveness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Bar 1 (rotate-6): translates left as user scrolls down
  const x1 = useTransform(smoothProgress, [0, 1], ["5%", "-35%"]);

  // Bar 2 (-rotate-6): translates right as user scrolls down (opposite direction)
  const x2 = useTransform(smoothProgress, [0, 1], ["-35%", "5%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden w-full h-[35vh] md:h-[50vh] bg-main flex items-center justify-center z-40 select-none"
    >
      {/* 
        Bar 2 (Counter-Clockwise Rotation: -rotate-6, z-0)
        Bottom layer beneath the central portrait photo
      */}
      <div className="absolute w-[180%] md:w-[150%] left-[-40%] md:left-[-25%] py-3 md:py-5 bg-sec text-main font-black text-xl md:text-4xl uppercase whitespace-nowrap -rotate-6 z-0 overflow-hidden flex font-cabinet opacity-95 shadow-md pointer-events-none">
        <motion.div
          style={{ x: x2, willChange: "transform" }}
          className="flex whitespace-nowrap shrink-0"
        >
          {/* Loop 4 sets so text never runs out at any screen width or scroll offset */}
          {[1, 2, 3, 4].map((loopIdx) => (
            <div key={loopIdx} className="flex whitespace-nowrap shrink-0">
              {barTwoItems.map((text, i) => (
                <span key={`${loopIdx}-${i}`} className="shrink-0 mr-3 md:mr-6 tracking-tight">
                  {text}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* 
        Central Photo (z-10)
        Sandwiched in the middle layer for 3D depth
      */}
      <div className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 md:w-64 md:h-64 overflow-hidden rounded-2xl border-4 border-sec shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105 group cursor-pointer">
        <img
          src="/image_6103ab.png"
          alt="Safwan Khan"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Subtle glass reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none"></div>
      </div>

      {/* 
        Bar 1 (Clockwise Rotation: rotate-6, z-20)
        Top layer in front of the central portrait photo
      */}
      <div className="absolute w-[180%] md:w-[150%] left-[-40%] md:left-[-25%] py-3 md:py-5 bg-sec text-main font-black text-xl md:text-4xl uppercase whitespace-nowrap rotate-6 z-20 overflow-hidden flex font-cabinet border-y border-main/20 shadow-2xl pointer-events-none">
        <motion.div
          style={{ x: x1, willChange: "transform" }}
          className="flex whitespace-nowrap shrink-0"
        >
          {/* Loop 4 sets for seamless horizontal coverage */}
          {[1, 2, 3, 4].map((loopIdx) => (
            <div key={loopIdx} className="flex whitespace-nowrap shrink-0">
              {barOneItems.map((text, i) => (
                <span key={`${loopIdx}-${i}`} className="shrink-0 mr-3 md:mr-6 tracking-tight">
                  {text}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SlidingBars;
