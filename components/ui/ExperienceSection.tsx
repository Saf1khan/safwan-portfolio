"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  type Variants,
} from "framer-motion";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  type: string;
  description: string;
  period: string;
  align: "left" | "right";
}

const experiences: ExperienceItem[] = [
  {
    id: "techivation",
    company: "Techivation",
    role: "Full Stack Developer",
    type: "(Part-time)",
    description:
      "Building and maintaining Techivation’s full web and SaaS ecosystem powering audio plugin licensing and management.",
    period: "May 2025 – Present",
    align: "left",
  },
  {
    id: "vexlogic",
    company: "VexLogic",
    role: "Full Stack Engineer",
    type: "(Part-time)",
    description:
      "Developing an AI-powered SaaS platform with real-time collaboration, billing systems, and intelligent document management.",
    period: "Jun 2025 – Present",
    align: "right",
  },
  {
    id: "comra",
    company: "Comra AI",
    role: "Full Stack Developer",
    type: "(Full-time)",
    description:
      "Building immersive 3D virtual tour systems using React Three Fiber, Prisma, and PostgreSQL for real estate and architecture.",
    period: "Nov 2024 – Present",
    align: "left",
  },
  {
    id: "digital-natives",
    company: "Digital Natives",
    role: "Frontend Developer",
    type: "(Full-time)",
    description:
      "Built scalable web apps and reusable UI systems using React, Next.js, and Tailwind CSS for enterprise clients.",
    period: "Feb 2024 – Oct 2024",
    align: "right",
  },
  {
    id: "fintechracy",
    company: "Fintechracy",
    role: "Frontend Developer",
    type: "(Full-time)",
    description:
      "Developed a mobile-first PWA for financial management with offline storage, barcode scanning, and performance optimization.",
    period: "Nov 2023 – Mar 2024",
    align: "left",
  },
  {
    id: "codintex",
    company: "Codintex",
    role: "Software Engineer",
    type: "(Internship)",
    description:
      "Worked on enterprise desktop apps using .NET and C#, gaining foundational experience in backend systems and security.",
    period: "Jul 2022 – Sep 2023",
    align: "right",
  },
];

const wordVariant: Variants = {
  hidden: { y: "110%", rotateX: -15, opacity: 0 },
  visible: {
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] },
  },
};

const headlineWords =
  "Explore my journey and the technologies that define my craft.".split(" ");

// Word by word reveal component with safe headroom clipping to prevent top clipping
const AnimatedWords = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const words = text.split(" ");
  return (
    <div className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block mr-[0.3em]"
          style={{
            lineHeight: 1.25,
            clipPath: "polygon(-10% -50%, 110% -50%, 110% 100%, -10% 100%)",
          }}
        >
          <motion.span
            variants={wordVariant}
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
    </div>
  );
};

// Individual milestone row component
const ExperienceRow = ({
  exp,
  index,
}: {
  exp: ExperienceItem;
  index: number;
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { margin: "-20% 0px -20% 0px", once: false });

  const isLeft = exp.align === "left";

  return (
    <div
      ref={rowRef}
      data-index={index}
      className="experience-item relative w-full flex items-center mb-[25vh] md:mb-[35vh] lg:mb-[45vh] last:mb-12"
    >
      {/* Milestone Dot on Central Timeline Spine */}
      <div
        className={`timeline-dot absolute left-6 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full z-30 transition-all duration-500 ${
          isInView
            ? "bg-thr border-2 border-sec shadow-[0_0_15px_#d4f534] scale-125"
            : "bg-main border border-sec/40 scale-100"
        }`}
      />

      {/* Experience Content Box */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.04 }}
        className={`experience-content experience-content-${index} z-20 relative w-full ${
          isLeft
            ? "md:w-[45%] md:mr-auto pl-14 pr-4 md:pl-0 md:pr-16 lg:pr-20 text-left md:text-right"
            : "md:w-[45%] md:ml-auto pl-14 pr-4 md:pl-16 lg:pl-20 md:pr-0 text-left"
        }`}
      >
        {/* Company Name */}
        <div className="font-cabinet font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-2 lg:mb-4 leading-tight text-sec">
          <AnimatedWords text={exp.company} />
        </div>

        {/* Role & Job Type */}
        <div className="font-cabinet text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light mb-2 lg:mb-3 leading-snug text-sec/75">
          <AnimatedWords text={`${exp.role} ${exp.type}`} />
        </div>

        {/* Description */}
        <div
          className={`font-cabinet text-sm sm:text-base md:text-lg leading-relaxed mb-3 text-sec/65 max-w-xl ${
            isLeft ? "md:ml-auto" : ""
          }`}
        >
          <AnimatedWords text={exp.description} />
        </div>

        {/* Date Period Badge */}
        <div className="font-cabinet text-xs sm:text-sm md:text-base font-light text-sec/50">
          <AnimatedWords text={exp.period} />
        </div>
      </motion.div>
    </div>
  );
};

export const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Bind scroll progress across the experience container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 75%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.2,
    restDelta: 0.001,
  });

  // SVG snake line dashoffset (path length is approx 6561.77)
  const pathDashoffset = useTransform(
    smoothProgress,
    [0, 1],
    [6561.77, 0]
  );

  // Central vertical timeline height progress
  const timelineProgressHeight = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      ref={containerRef}
      className="experience-section font-cabinet relative w-full bg-main text-sec py-20 md:py-28 lg:py-36 px-4 md:px-8 lg:px-12 overflow-hidden select-none"
    >
      {/* Dynamic Background Winding SVG Snake Path */}
      <div
        className="absolute top-[10rem] md:right-[5rem] lg:top-[10rem] lg:left-0 w-full pointer-events-none z-[5] opacity-80"
        style={{ height: "calc(100% + 20vh)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 3000"
          fill="none"
          preserveAspectRatio="xMidYMin slice"
          className="w-full h-full"
        >
          <motion.path
            id="experience-line-path"
            d="M0.478149 0.14624C179.389 584.988 1024.24 241.063 1203.16 488.791C1382.07 736.519 591.549 555.192 685.399 850.592C754.827 1069.12 1251.74 767.219 1254.66 995.312C1257.47 1214.38 748.65 1128.11 748.65 1392.87C748.65 1678.93 1318.81 1483.96 1318.81 1754.67C1318.81 1978.88 826.875 1777.46 819.13 2001.55C811.613 2219.04 1126.15 2122.45 1318.81 2242.46C1511.48 2362.48 902.26 3183.15 902.26 3183.15"
            stroke="#d4f534"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray={6561.77}
            style={{ strokeDashoffset: pathDashoffset }}
          />
        </svg>
      </div>

      {/* Section Header */}
      <div className="text-center mb-16 md:mb-24 lg:mb-32 max-w-4xl mx-auto px-4 z-20 relative">
        <h3 className="lg:text-4xl text-2xl md:text-3xl font-bold leading-tight mb-4 font-cabinet">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ staggerChildren: 0.03 }}
            className="experience-text font-cabinet font-bold leading-tight text-sec"
            style={{ perspective: "1000px" }}
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
                  variants={wordVariant}
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
        </h3>
      </div>

      {/* Timeline Wrapper */}
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 lg:px-12 relative z-20">
        {/* Background Guide Line */}
        <div
          className="timeline-line absolute left-6 md:left-1/2 top-0 w-[1px] -translate-x-1/2 pointer-events-none"
          style={{
            height: "100%",
            backgroundColor: "rgba(30, 30, 30, 0.15)",
          }}
        />

        {/* Dynamic Glowing Neon Progress Line */}
        <motion.div
          className="timeline-progress absolute left-6 md:left-1/2 top-0 w-[2px] -translate-x-1/2 origin-top pointer-events-none z-10"
          style={{
            height: timelineProgressHeight,
            backgroundColor: "#d4f534",
            boxShadow: "0px 0px 15px #d4f534",
          }}
        />

        {/* Timeline Items Container */}
        <div className="relative experience-timeline-container z-20">
          {experiences.map((exp, index) => (
            <ExperienceRow key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
