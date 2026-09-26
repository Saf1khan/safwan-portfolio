"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";

const paragraph1 =
  "I'm a Full-Stack Developer who bridges the gap between cutting-edge technology and exceptional user experience. With proven experience building AI-powered SaaS platforms, 3D virtual tour systems, and enterprise-grade applications, I specialize in solving complex technical challenges while delivering intuitive, visually stunning interfaces.".split(
    " "
  );

const paragraph2 =
  "My approach combines strategic architecture with hands-on development—whether it's implementing Retrieval-Augmented Generation (RAG) systems, optimizing WebGL rendering for 3D experiences, or architecting type-safe monorepo setups with tRPC. I've worked across diverse industries from PropTech to FinTech, consistently delivering production-ready solutions that scale.".split(
    " "
  );

const paragraph3 =
  "What sets me apart is my ability to work across the entire stack: designing systems in Node.js, building dynamic React frontends, integrating AI capabilities, and deploying Dockerized microservices with CI/CD pipelines. I don't just write code—I architect solutions that drive measurable business outcomes.".split(
    " "
  );

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.015,
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

export default function AboutDetails() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll on the right image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawImageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const imageY = useSpring(rawImageY, { stiffness: 100, damping: 25 });

  return (
    <div
      ref={containerRef}
      className="h-auto md:min-h-[100vh] item flex md:flex-row flex-col w-full font-cabinetGrotesk gap-10 pt-10 md:text-lg text-base md:px-[2rem] px-[1rem] relative"
    >
      {/* Left Column: 3 Paragraphs with 3D Word Reveal */}
      <div className="w-full md:w-[50%] flex flex-col gap-6 text-lg md:text-xl text-gray-600 leading-relaxed font-cabinetGrotesk">
          {/* Paragraph 1 */}
          <motion.div
            style={{ perspective: "1000px" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
          >
            {paragraph1.map((word, i) => (
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

          {/* Paragraph 2 */}
          <motion.div
            style={{ perspective: "1000px" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
          >
            {paragraph2.map((word, i) => (
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

          {/* Paragraph 3 */}
          <motion.div
            style={{ perspective: "1000px" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
          >
            {paragraph3.map((word, i) => (
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

        {/* Right Column: Parallax Image Container */}
        <div
          ref={imageContainerRef}
          className="relative overflow-hidden h-[500px] sm:h-[550px] md:h-full md:min-h-[550px] w-full md:w-[50%] rounded-md bg-neutral-900 shadow-xl"
        >
          <motion.img
            loading="lazy"
            decoding="async"
            src="/safwan-about.jpg"
            alt="Safwan Khan - Full-Stack Developer"
            className="object-cover object-top absolute inset-0 w-full h-full"
            style={{
              y: imageY,
              scale: 1.08,
            }}
          />
        </div>
    </div>
  );
}
