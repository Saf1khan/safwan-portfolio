"use client";

import React from "react";
import { motion } from "framer-motion";

const rowOne = Array(4).fill(
  "FRONTEND ENGINEERING • REACT.JS • TYPESCRIPT • NODE.JS • "
);
const rowTwo = Array(4).fill(
  "FULL-STACK DEVELOPMENT • PYTHON • TAILWIND CSS • NEXT.JS • "
);

export const SlidingBars = () => {
  return (
    <section className="relative overflow-hidden w-full h-[50vh] bg-main flex items-center justify-center z-40">
      {/* Bar 2 (Counter-Clockwise, z-0) */}
      <div className="absolute w-[150%] left-[-25%] py-4 md:py-6 bg-sec text-main font-black text-2xl md:text-5xl uppercase whitespace-nowrap -rotate-6 z-0 overflow-hidden flex font-cabinet opacity-95 shadow-lg pointer-events-none">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          {rowTwo.map((text, i) => (
            <span key={i} className="shrink-0 mr-4">
              {text}
            </span>
          ))}
          {/* Duplicate set for seamless continuous looping */}
          {rowTwo.map((text, i) => (
            <span key={`dup-${i}`} className="shrink-0 mr-4">
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Centered Photo (z-10) */}
      <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-2xl border-4 border-sec shadow-2xl grayscale hover:grayscale-0 transition-all duration-500">
        <img
          src="/image_6103ab.png"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bar 1 (Clockwise, z-20) */}
      <div className="absolute w-[150%] left-[-25%] py-4 md:py-6 bg-sec text-main font-black text-2xl md:text-5xl uppercase whitespace-nowrap rotate-6 z-20 overflow-hidden flex font-cabinet border-y border-main/20 shadow-xl pointer-events-none">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          {rowOne.map((text, i) => (
            <span key={i} className="shrink-0 mr-4">
              {text}
            </span>
          ))}
          {/* Duplicate set for seamless continuous looping */}
          {rowOne.map((text, i) => (
            <span key={`dup-${i}`} className="shrink-0 mr-4">
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SlidingBars;
