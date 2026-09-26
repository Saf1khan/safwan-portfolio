"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { ProjectData } from "@/lib/projects-data";
import { projectsData } from "@/lib/projects-data";

interface ProjectOverviewProps {
  project: ProjectData;
}

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
      duration: 0.7,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

function WordReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <motion.div
      style={{ perspective: "1000px" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={containerVariants}
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.3em]"
          style={{
            lineHeight: 1.1,
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
  );
}

// Interactive Desktop Menu Item for Other Projects
function OtherProjectMenuItem({ project }: { project: ProjectData }) {
  const [isHovered, setIsHovered] = useState(false);
  const [exitDirection, setExitDirection] = useState<"top" | "bottom">("bottom");

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    setExitDirection(y < rect.height / 2 ? "top" : "bottom");
    setIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    setExitDirection(y < rect.height / 2 ? "top" : "bottom");
    setIsHovered(false);
  };

  const outerTransform = isHovered
    ? "translate3d(0px, 0%, 0px)"
    : exitDirection === "top"
      ? "translate3d(0px, -101%, 0px)"
      : "translate3d(0px, 101%, 0px)";

  const innerTransform = isHovered
    ? "translate3d(0px, 0%, 0px)"
    : exitDirection === "top"
      ? "translate3d(0px, 101%, 0px)"
      : "translate3d(0px, -101%, 0px)";

  return (
    <div
      className="relative menu-item group select-none cursor-pointer"
      style={{
        backgroundColor: "transparent",
        flex: "0 0 auto",
        height: "100px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        opacity: 1,
        willChange: "auto",
        backfaceVisibility: "hidden",
        perspective: "1000px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-black/20 via-black/40 to-black/20" />

      <Link
        href={`/project/${project.slug}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          position: "relative",
          cursor: "pointer",
          textTransform: "uppercase",
          textDecoration: "none",
          whiteSpace: "nowrap",
          fontWeight: 600,
          color: "rgb(0, 0, 0)",
          fontSize: "24px",
          zIndex: 2,
          transition: "color 0.3s",
        }}
      >
        <span
          className="transition-opacity duration-300"
          style={{ opacity: isHovered ? 0 : 1 }}
        >
          {project.title}
        </span>
      </Link>

      {/* Sliding Marquee Mask */}
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background: "rgb(0, 0, 0)",
          transform: outerTransform,
          transition: "transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
          zIndex: 4,
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            transform: innerTransform,
            transition: "transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              height: "100%",
              flexShrink: 0,
              willChange: "transform",
              animation: "marquee 40s linear 0s infinite normal none running",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "rgb(255, 255, 255)",
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  fontSize: "4vh",
                  lineHeight: 1.2,
                  paddingTop: "1vh",
                }}
              >
                <span style={{ fontSize: "24px", fontWeight: 600 }}>{project.title}</span>
                <div
                  style={{
                    backgroundImage: `url("${project.image}")`,
                    height: "7vh",
                    width: "200px",
                    margin: "0px 2vw",
                    padding: "1em 0px",
                    borderRadius: "50px",
                    backgroundSize: "cover",
                    backgroundPosition: "50% 50%",
                    flexShrink: 0,
                  }}
                />
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              height: "100%",
              flexShrink: 0,
              willChange: "transform",
              animation: "marquee 40s linear 0s infinite normal none running",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "rgb(255, 255, 255)",
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  fontSize: "4vh",
                  lineHeight: 1.2,
                  paddingTop: "1vh",
                }}
              >
                <span style={{ fontSize: "24px", fontWeight: 600 }}>{project.title}</span>
                <div
                  style={{
                    backgroundImage: `url("${project.image}")`,
                    height: "7vh",
                    width: "200px",
                    margin: "0px 2vw",
                    padding: "1em 0px",
                    borderRadius: "50px",
                    backgroundSize: "cover",
                    backgroundPosition: "50% 50%",
                    flexShrink: 0,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
  // SVG curved loop animation offset
  const [startOffset, setStartOffset] = useState(-500);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      setStartOffset((prev) => (prev <= -2800 ? 0 : prev - 1.2));
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const otherProjects = projectsData.filter((p) => p.slug !== project.slug);

  const overviewText =
    project.overviewText ||
    "A powerful SaaS platform for lead generation, AI-powered research, and automated email campaigns. Built as a multi-tenant system, it helps businesses expand their reach by automating the entire process — from discovering leads to launching personalized email workflows, tracking engagement, and managing subscriptions in real time.";

  const clientName = project.client || "VexLogic – Internal SaaS Platform";
  const skillTags = project.skillTags || ["React 19", "TypeScript", "Vite", "Fastify"];
  const detailImages = project.detailImages || [
    project.image,
    project.heroImage || project.image,
  ];
  const techStack = project.techStack || [
    "React 19",
    "TypeScript",
    "Vite",
    "Fastify",
    "tRPC",
    "PostgreSQL",
    "Drizzle ORM",
    "Redis",
    "BullMQ",
    "Stripe API",
    "OpenAI API",
    "Tailwind CSS",
    "ShadCN UI",
    "Radix UI",
    "TanStack Query",
    "Jotai",
    "Zod",
    "PM2",
    "Nginx",
    "VPS Deployment",
  ];

  const roleTitle = project.roleTitle || "Full-Stack Developer (Frontend & Backend)";
  const responsibilities = project.responsibilities || [
    "Architected a scalable monorepo setup with Fastify, tRPC, and React.",
    "Developed type-safe backend APIs using Drizzle ORM with PostgreSQL.",
    "Implemented AI-powered lead research using OpenAI API and BullMQ queues.",
    "Built a real-time dashboard using WebSocket subscriptions and TanStack Query.",
    "Integrated Stripe for subscription and payment automation with secure webhook handling.",
    "Designed a responsive UI using Tailwind CSS, ShadCN UI, and Radix UI primitives.",
    "Created modular and reusable frontend components with full TypeScript type safety.",
    "Implemented JWT authentication, role-based access control, and secure token refresh flow.",
    "Developed background job queues for automation workflows and email sending.",
    "Configured Redis caching, session management, and graceful queue shutdown handling.",
    "Led deployment and server configuration using VPS, PM2 process manager, and Nginx reverse proxy.",
    "Collaborated with a small team of two developers using Git version control and code reviews.",
  ];

  const impact = project.impact || [
    "Reduced manual lead processing time by over 80% through background job automation.",
    "Improved data consistency and scalability with fully type-safe end-to-end communication (tRPC).",
    "Enabled real-time updates via WebSockets for live campaign tracking and job progress.",
    "Delivered a production-ready SaaS infrastructure supporting multi-tenancy and subscriptions.",
    "Enhanced performance and reliability through optimized server deployment and monitoring.",
  ];

  return (
    <div
      className="project-overview-section mt-1 sm:mt-8 lg:mt-24 mb-8 sm:mb-12 lg:mb-32 bg-transparent text-[#e7e7e7] font-cabinetGrotesk select-none"
      style={{
        color: "rgb(231, 231, 231)",
        fontFamily: 'var(--font-cabinetGrotesk), "Cabinet Grotesk", sans-serif',
      }}
    >
      {/* 1. Divider Line */}
      <div
        className="project-line w-screen h-[1px] bg-black mt-12 sm:mt-16 md:mt-24 mb-8 sm:mb-10 md:mb-12"
        style={{ width: "100%", backgroundColor: "rgb(255, 255, 255)" }}
      />

      {/* 2. Overview Description, Live Button & Client Info */}
      <div className="max-w-8xl mx-auto px-4 sm:px-[1rem] lg:px-[2rem]">
        <div className="space-y-6 sm:space-y-8 flex flex-col lg:flex-row justify-between w-full gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column: Description & Live Website Button */}
          <div className="space-y-3 sm:space-y-4 w-full lg:w-1/2 flex items-start flex-col gap-3 sm:gap-4">
            <div className="project-description01 text-sm sm:text-base md:text-lg leading-relaxed font-cabinetGrotesk">
              <WordReveal text={overviewText} />
            </div>

            {/* Live Website Button */}
            <a
              href={project.liveUrl || "https://github.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group flex items-center justify-start cursor-pointer select-none no-underline"
              style={{ willChange: "transform", backfaceVisibility: "hidden" }}
            >
              <div className="group relative inline-flex items-center justify-center gap-3 bg-thr text-black font-medium rounded-full transition-all duration-300 hover:gap-4 overflow-hidden text-lg px-8 py-5">
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="relative z-10 overflow-hidden flex items-center">
                  <div className="relative overflow-hidden inline-block cursor-pointer select-none">
                    <div className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                      {"Live Website".split("").map((c, i) => (
                        <span
                          key={i}
                          className="inline-block whitespace-pre transition-transform duration-300 ease-out"
                          style={{ transitionDelay: `${i * 15}ms` }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <div className="block absolute top-0 left-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
                      {"Live Website".split("").map((c, i) => (
                        <span
                          key={i}
                          className="inline-block whitespace-pre transition-transform duration-300 ease-out"
                          style={{ transitionDelay: `${i * 15}ms` }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pill Flying Arrow Icon */}
              <div className="hidden overflow-hidden md:flex w-14 h-14 bg-thr rounded-full items-center justify-center relative -ml-2">
                <div className="absolute inset-0 delay-100 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
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
            </a>
          </div>

          {/* Right Column: Client & Skills Tags */}
          <div className="justify-start flex flex-col gap-3 sm:gap-4 w-full lg:w-auto">
            <div className="space-y-2">
              <h3 className="project-client text-sm sm:text-base md:text-lg font-semibold font-cabinetGrotesk">
                Client
              </h3>
              <div className="project-client-name text-sm sm:text-base mix-blend-difference md:text-lg">
                <WordReveal text={clientName} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {skillTags.map((tag, i) => (
                <span
                  key={i}
                  className="skill-tag px-3 md:px-4 py-1.5 md:py-2 bg-black text-white text-xs md:text-sm font-medium rounded-full"
                  style={{
                    color: "rgb(0, 0, 0)",
                    backgroundColor: "rgb(231, 231, 231)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Showcase Images (2 Columns Mockups) */}
      <div className="mt-12 sm:mt-16 md:mt-24 max-w-8xl mx-auto px-4 sm:px-[1rem] lg:px-[2rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-8">
          <div className="overflow-hidden rounded-lg relative h-[200px] sm:h-[300px] md:h-[500px] lg:h-[700px] group">
            <img
              alt={`${project.title} detail 1`}
              loading="lazy"
              decoding="async"
              className="object-cover absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
              src={detailImages[0]}
            />
          </div>
          <div className="overflow-hidden rounded-lg relative h-[200px] sm:h-[300px] md:h-[500px] lg:h-[700px] group">
            <img
              alt={`${project.title} detail 2`}
              loading="lazy"
              decoding="async"
              className="object-cover absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
              src={detailImages[1]}
            />
          </div>
        </div>
      </div>

      {/* 4. Tech Stack Section */}
      <div className="mt-12 sm:mt-16 md:mt-24 max-w-8xl mx-auto px-4 sm:px-[1rem] lg:px-[2rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <h2 className="project-tech-stack font-cabinetGrotesk text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <WordReveal text="Tech Stack" />
            </h2>
            <div className="project-tech-stack-description text-sm sm:text-base md:text-lg text-gray-300 mt-3 leading-relaxed">
              <WordReveal text="Technologies and tools used to bring this project to life" />
            </div>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {techStack.map((tech, i) => (
                <div
                  key={i}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-black rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-thr hover:scale-105 cursor-default"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Video Showcase Section */}
      <div id="project-video-section" className="mt-12 sm:mt-16 md:mt-24">
        <div className="grid grid-cols-1 gap-4 md:gap-8">
          <div
            className="w-full h-[40vh] sm:h-[50vh] md:h-[70vh] lg:h-[100vh] px-3 sm:px-4 md:px-8 rounded-xl overflow-hidden"
            style={{
              borderRadius: "1rem",
              willChange: "border-radius, padding",
              paddingRight: "2rem",
              paddingLeft: "2rem",
            }}
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              controls
              style={{
                borderRadius: "1rem",
                willChange: "border-radius, padding",
              }}
              poster={detailImages[0]}
            >
              <source
                src={project.videoUrl || "/audio/sample.mp4"}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>

      {/* 6. My Role Section (Light Mode with black text matching Screenshot 2) */}
      <div className="my-role-section mt-12 sm:mt-16 md:mt-24 max-w-8xl mx-auto px-4 sm:px-[1rem] lg:px-[2rem] text-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-3 items-start">
          <div className="lg:sticky lg:top-32">
            <h2 className="project-my-role font-cabinetGrotesk text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-black">
              <WordReveal text="My Role" />
            </h2>
            <div
              className="project-my-role-description text-sm sm:text-base md:text-lg text-gray-600 mt-3 leading-relaxed role-subtitle"
            >
              <WordReveal text="My contributions and responsibilities in this project" />
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="project-my-role-description font-cabinetGrotesk text-sm sm:text-base md:text-lg leading-relaxed text-black font-semibold">
                <WordReveal text={roleTitle} />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-cabinetGrotesk text-base sm:text-lg md:text-xl font-semibold text-black">
                Key Responsibilities
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {responsibilities.map((item, idx) => (
                  <div
                    key={idx}
                    className="font-cabinetGrotesk text-xs sm:text-sm md:text-base leading-relaxed text-gray-800"
                  >
                    • {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-cabinetGrotesk text-base sm:text-lg md:text-xl font-semibold text-black">
                Project Impact
              </h3>
              <div className="space-y-1">
                {impact.map((item, idx) => (
                  <div
                    key={idx}
                    className="font-cabinetGrotesk text-xs sm:text-sm md:text-base leading-relaxed text-gray-800"
                  >
                    • {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Other Projects Section */}
      <div className="mt-12 sm:mt-16 md:mt-24 mb-16 sm:mb-24 md:mb-32 text-black">
        {/* Curved loop SVG marquee */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div
            className="CurvedLoop_curvedLoopJacket__Rw6fg"
            style={{ visibility: "visible", cursor: "grab" }}
          >
            <svg
              className="CurvedLoop_curvedLoopSvg__z0qkS w-full"
              viewBox="0 0 1440 120"
              style={{ overflow: "visible" }}
            >
              <text
                xmlSpace="preserve"
                style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
              >
                Other Projects ✦ Explore More ✦ Creative Work ✦&nbsp;
              </text>
              <defs>
                <path
                  id="project-other-curve"
                  d="M-100,40 Q500,340 1540,40"
                  fill="none"
                  stroke="transparent"
                />
              </defs>
              <text
                fontWeight="bold"
                xmlSpace="preserve"
                className="curved-text text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem]"
                style={{ fill: "rgb(0, 0, 0)" }}
              >
                <textPath
                  href="#project-other-curve"
                  startOffset={`${startOffset}px`}
                  xmlSpace="preserve"
                >
                  Other Projects ✦ Explore More ✦ Creative Work ✦&nbsp;Other Projects
                  ✦ Explore More ✦ Creative Work ✦&nbsp;Other Projects ✦ Explore More
                  ✦ Creative Work ✦&nbsp;Other Projects ✦ Explore More ✦ Creative
                  Work ✦&nbsp;
                </textPath>
              </text>
            </svg>
          </div>
        </div>

        {/* Other Projects List (Desktop Menu & Mobile Cards) */}
        <div className="max-w-8xl mx-auto pb-[6rem] sm:pb-[8rem] md:pb-[10rem] pt-8 sm:pt-10 md:pt-14 px-4 sm:px-[1rem] lg:px-[2rem]">
          {/* Desktop Flowing Menu Item List */}
          <div className="hidden md:block">
            <div style={{ height: "400px", position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  overflowY: "auto",
                  scrollbarWidth: "none",
                }}
                className="[&::-webkit-scrollbar]:hidden"
              >
                <nav
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {otherProjects.map((p) => (
                    <OtherProjectMenuItem key={p.slug} project={p} />
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Mobile Card Grid with Staggered Hover Letters */}
          <div className="block md:hidden">
            <div className="grid grid-cols-1 gap-6 sm:gap-8">
              {otherProjects.map((p) => (
                <div key={p.slug} style={{ opacity: 1, transform: "none" }}>
                  <div className="group will-change-transform">
                    <div className="mb-4">
                      <div className="text-2xl md:hidden block md:text-4xl font-medium text-gray-900 mb-2">
                        {p.title}
                      </div>
                      <div className="text-gray-600 text-base md:text-lg font-light">
                        {p.category}
                      </div>
                    </div>
                    <Link
                      href={`/project/${p.slug}`}
                      className="block relative overflow-hidden aspect-[4/3] cursor-pointer rounded-lg"
                    >
                      <img
                        alt={p.title}
                        loading="lazy"
                        decoding="async"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        src={p.image}
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: "0px",
                          color: "transparent",
                          transform: "scale(1)",
                        }}
                      />
                      <div
                        className="absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-75"
                        style={{ willChange: "auto" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center px-8 pointer-events-none">
                        <div className="flex flex-wrap justify-center gap-1">
                          {p.title.split("").map((char, charIdx) => (
                            <span
                              key={charIdx}
                              className="inline-block text-thr text-2xl md:text-5xl transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-5 group-hover:translate-y-0"
                              style={{
                                clipPath:
                                  "polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%)",
                                transitionDelay: `${charIdx * 30}ms`,
                              }}
                            >
                              {char === " " ? "\u00A0" : char}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-100%, 0, 0);
          }
        }
        .menu-item {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
}
