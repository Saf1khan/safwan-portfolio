"use client";

import React, { useState } from "react";
import Link from "next/link";

interface ProjectItem {
  id: string;
  title: string;
  href: string;
  image: string;
}

const projects: ProjectItem[] = [
  {
    id: "vexlogic-ai-assistant",
    title: "VexLogic AI Assistant",
    href: "/project/vexlogic-ai-assistant",
    image: "/projects/vexlogic-ai.jpg",
  },
  {
    id: "vexlogic-business-expander",
    title: "VexLogic Business Expander",
    href: "/project/vexlogic-business-expander",
    image: "/projects/vexlogic-business.jpg",
  },
  {
    id: "techivation",
    title: "Techivation",
    href: "/project/techivation",
    image: "/projects/vexlogic-ai.jpg",
  },
  {
    id: "comra",
    title: "Comra",
    href: "/project/comra",
    image: "/projects/comra.jpg",
  },
  {
    id: "comra-dashboard",
    title: "Comra Dashboard",
    href: "/project/comra-dashboard",
    image: "/projects/comra.jpg",
  },
  {
    id: "siradatia-cv-builder",
    title: "SiraDatia CV Builder",
    href: "/project/siradatia-cv-builder",
    image: "/projects/vexlogic-business.jpg",
  },
  {
    id: "reservado",
    title: "Reservado – Airbnb Clone",
    href: "/project/reservado",
    image: "/projects/superhost.jpg",
  },
  {
    id: "superhost",
    title: "Superhost",
    href: "/project/superhost",
    image: "/projects/superhost.jpg",
  },
  {
    id: "fintechracy",
    title: "Fintechracy",
    href: "/project/fintechracy",
    image: "/projects/vexlogic-ai.jpg",
  },
  {
    id: "ftr-client",
    title: "FTR-Client",
    href: "/project/ftr-client",
    image: "/projects/vexlogic-business.jpg",
  },
  {
    id: "vexlogic-ai-assistant-website",
    title: "VexLogic AI Assistant Website",
    href: "/project/vexlogic-ai-assistant-website",
    image: "/projects/vexlogic-ai.jpg",
  },
];

function MenuItem({ project }: { project: ProjectItem }) {
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
      className="relative menu-item group font-cabinet select-none cursor-pointer"
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
      {/* Bottom 1px Divider Line */}
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-black via-black to-black" />

      {/* Default Link & Label (visible when unhovered) */}
      <Link
        href={project.href}
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
          style={{
            opacity: isHovered ? 0 : 1,
          }}
        >
          {project.title}
        </span>
      </Link>

      {/* Outer Sliding Dark Marquee Mask on Hover */}
      <div
        className="marquee-overlay"
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
        {/* Inner Counter-Translating Container for Window-Shade Reveal */}
        <div
          className="marquee-inner"
          style={{
            height: "100%",
            display: "flex",
            transform: innerTransform,
            transition: "transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        >
          {/* Marquee Track 1 */}
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
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
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

          {/* Marquee Track 2 (Seamless loop duplicate) */}
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
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
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

export default function WorksFlowingList() {
  return (
    <div className="pt-10 w-full pb-[10rem] lg:px-[2rem] px-[1rem]">
      <div
        style={{
          width: "100%",
          maxHeight: "100vh",
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
          {projects.map((project) => (
            <MenuItem key={project.id} project={project} />
          ))}
        </nav>
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

        .menu-item:hover .marquee-overlay {
          transform: translate3d(0px, 0%, 0px) !important;
        }

        .menu-item:hover .marquee-inner {
          transform: translate3d(0px, 0%, 0px) !important;
        }
      `}</style>
    </div>
  );
}
