"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

interface TechCategory {
  title: string;
  skills: string[];
}

const techCategories: TechCategory[] = [
  {
    title: "Languages & Frameworks",
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Fastify",
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      "OpenAI API",
      "LangChain",
      "RAG",
      "Google Generative AI",
      "Vector Embeddings",
    ],
  },
  {
    title: "3D & Graphics",
    skills: [
      "Three.js",
      "React Three Fiber",
      "WebGL",
      "Gaussian Splatting",
      "GSAP",
      "Framer Motion",
    ],
  },
  {
    title: "Databases & State",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "Drizzle ORM",
      "Redis",
      "React Query",
      "Zustand",
    ],
  },
  {
    title: "DevOps & Cloud",
    skills: [
      "Docker",
      "CI/CD",
      "Google Cloud Platform",
      "Vercel",
      "VPS",
      "Nginx",
      "Caddy",
      "PM2",
    ],
  },
  {
    title: "UI & Styling",
    skills: [
      "Tailwind CSS",
      "ShadCN UI",
      "Radix UI",
      "MUI",
      "Framer Motion",
    ],
  },
];

const titleWords = ["Technology", "Arsenal"];
const subtitleWords =
  "A comprehensive toolkit for building modern, scalable applications".split(
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

const categoryVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export default function AboutArsenal() {
  return (
    <div className="tech-section pt-[5rem] md:pt-[12rem] md:px-[2rem] px-[1rem]">
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
            className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-cabinetGrotesk"
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

        {/* Categories Grid (3 Columns on lg, 2 on md) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.title}
              custom={index}
              variants={categoryVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="tech-category opacity-100 flex flex-col"
            >
              <h3 className="text-2xl font-bold font-cabinetGrotesk mb-6 text-black">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-cabinetGrotesk hover:bg-black hover:text-white transition-colors duration-300 cursor-default select-none shadow-sm hover:shadow"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
    </div>
  );
}
