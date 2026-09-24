"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

interface StatItem {
  value: string;
  title: string;
  description: string;
}

const statsData: StatItem[] = [
  {
    value: "40%",
    title: "Performance Improvement",
    description:
      "Reduced AI response latency through optimized RAG retrieval and concurrency patterns",
  },
  {
    value: "80%",
    title: "Workflow Automation",
    description:
      "Decreased manual lead processing time with background job automation",
  },
  {
    value: "10+",
    title: "Production Applications",
    description:
      "Successfully deployed and maintained across various industries",
  },
  {
    value: "100%",
    title: "Type-Safe Architecture",
    description:
      "End-to-end type safety with TypeScript, tRPC, and modern tooling",
  },
];

const titleWords = ["Proven", "Impact"];
const subtitleWords =
  "Throughout my career, I've delivered measurable results that matter".split(
    " "
  );

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.05,
    },
  },
};

const wordAnimation: Variants = {
  hidden: {
    y: "100%",
    rotateX: -15,
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export default function AboutStats() {
  return (
    <div className="stats-section pt-[5rem] md:pt-[12rem] md:px-[2rem] px-[1rem]">
      {/* Header Block with 3D Word Reveal */}
        <div className="text-center mb-16">
          <motion.div
            className="text-2xl md:text-4xl font-cabinetGrotesk font-bold text-black mb-4"
            style={{ perspective: "1000px" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
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

          <motion.div
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-cabinetGrotesk"
            style={{ perspective: "1000px" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {subtitleWords.map((word, i) => (
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

        {/* 4-Card Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-black text-white p-8 rounded-lg transition-transform duration-300 shadow-xl flex flex-col justify-between group border border-white/5"
            >
              <div>
                <div className="text-5xl md:text-6xl font-bold font-cabinetGrotesk mb-3 text-white group-hover:text-accent transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold mb-3 font-cabinetGrotesk text-white">
                  {stat.title}
                </div>
              </div>
              <div className="text-sm text-gray-300 font-cabinetGrotesk leading-relaxed">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
    </div>
  );
}
