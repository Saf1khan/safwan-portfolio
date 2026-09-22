"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";

// Exact rotating Starburst SVG extracted from DevTools (Layer_2)
const Layer2Starburst = ({ className }: { className?: string }) => (
  <svg
    className={className || "h-16 w-16 lg:h-20 lg:w-20 shrink-0"}
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_2"
    data-name="Layer 2"
    fill="currentColor"
    viewBox="0 0 1119.69 1119.75"
  >
    <g id="Layer_1-2" data-name="Layer 1">
      <g>
        <path
          className="cls-1"
          d="m559.11,507.53c-29.54,0-53.58,23.48-53.58,52.35s24.04,52.35,53.58,52.35,53.58-23.48,53.58-52.35-24.04-52.35-53.58-52.35Z"
        />
        <path
          className="cls-1"
          d="m989.2,574.07c39.02-.24,83.25-.51,130.49-.51v-28.37c-47.24,0-91.47-.27-130.5-.51-70.92-.43-129.88-.79-178.48.5-37.87-1.01-68.9-3.11-93.82-6.88,23.05-10.2,52.43-20.4,88.69-31.36,47.21-11.56,104.04-27.45,172.32-46.55,37.58-10.51,80.17-22.43,125.74-34.88l-7.47-27.37c-45.58,12.45-88.31,23.85-126.02,33.9-68.51,18.27-125.52,33.47-172.06,47.52-35.86,8.78-65.79,14.88-90.47,17.91,19.39-15.29,44.55-32.15,75.56-51.27,42.68-23.27,93.53-53.2,154.64-89.17,33.63-19.79,71.75-42.23,112.61-65.94l-14.24-24.54c-40.86,23.71-79.25,45.69-113.12,65.07-61.54,35.22-112.75,64.52-154.13,90.04-32.11,17.51-59.3,31.02-82.25,40.27,14.88-19.98,35.07-43.02,60.56-69.91,35.28-33.45,76.74-75.42,126.58-125.86,27.42-27.76,58.51-59.23,91.92-92.63l-20.06-20.06c-33.41,33.41-64.87,64.49-92.63,91.92-50.44,49.83-92.41,91.3-125.86,126.57-26.99,25.59-50.1,45.83-70.13,60.72,9.2-23.21,22.76-50.76,40.5-83.46,25.42-41.44,54.61-92.71,89.68-154.33,19.31-33.91,41.19-72.35,64.81-113.26l-24.57-14.19c-23.62,40.91-45.97,79.08-65.68,112.75-35.82,61.19-65.64,112.11-88.81,154.84-19.81,32.29-37.15,58.11-52.87,77.81,2.69-25.05,8.54-55.6,17.19-92.48,13.6-46.67,28.24-103.83,45.85-172.51,9.69-37.8,20.66-80.65,32.67-126.34l-27.44-7.21c-12,45.69-23.51,88.4-33.65,126.08-18.43,68.46-33.77,125.44-44.87,172.76-10.51,36.08-20.36,65.41-30.26,88.47-3.7-24.71-5.81-55.38-6.89-92.63,1.18-48.59.69-107.6.1-178.5-.32-39.02-.7-83.25-.8-130.5l-28.37.06c.11,47.24-.06,91.47-.21,130.5-.27,70.9-.5,129.91.91,178.5-.88,36.04-2.72,66.06-6.08,90.38-9.66-22.66-19.32-51.26-29.64-86.03-11.33-47.27-26.95-104.17-45.71-172.55-10.33-37.63-22.03-80.28-34.26-125.91l-27.4,7.34c12.23,45.63,23.41,88.43,33.29,126.18,17.93,68.59,32.86,125.68,46.68,172.28,8.67,36.17,14.64,66.3,17.52,91.1-15.49-19.57-32.58-45.09-52.03-76.8-23.17-42.73-52.99-93.65-88.81-154.83-19.72-33.68-42.06-71.85-65.69-112.76l-24.57,14.19c23.62,40.91,45.5,79.35,64.81,113.26,35.07,61.62,64.27,112.9,89.69,154.33,18.06,33.3,31.75,61.23,40.95,84.69-20.35-14.86-43.88-35.2-71.5-61.13-33.62-35.11-75.8-76.37-126.48-125.96-27.9-27.29-59.51-58.22-93.08-91.47l-19.96,20.16c33.57,33.24,64.8,64.56,92.36,92.18,50.09,50.2,91.75,91.97,127.19,125.25,25.92,27.08,46.36,50.22,61.38,70.29-23.4-9.15-51.23-22.73-84.36-40.6-41.5-25.32-92.84-54.4-154.54-89.34-33.96-19.23-72.44-41.02-113.4-64.55l-14.13,24.6c40.97,23.53,79.19,45.79,112.91,65.43,61.27,35.68,112.25,65.38,155.03,88.46,31.03,18.94,56.23,35.65,75.67,50.82-24.38-2.98-53.87-8.91-88.97-17.31-46.6-13.83-103.69-28.75-172.29-46.69-37.75-9.87-80.55-21.06-126.18-33.29l-7.35,27.4c45.63,12.23,88.29,23.93,125.91,34.26,68.37,18.77,125.28,34.38,172.55,45.71,35.66,10.58,64.73,20.48,87.65,30.38-24.69,3.63-55.33,5.67-92.5,6.66-48.59-1.29-107.62-.94-178.52-.51-39.02.24-83.25.51-130.5.51v28.37c47.24,0,91.47.27,130.49.51,70.91.43,129.9.79,178.5-.5,37.86,1.01,68.89,3.11,93.81,6.88-23.04,10.2-52.42,20.4-88.68,31.36-47.21,11.56-104.04,27.45-172.32,46.55-37.58,10.51-80.18,22.43-125.74,34.88l7.47,27.37c45.58-12.45,88.31-23.85,126.02-33.9,68.51-18.27,125.52-33.47,172.06-47.52,35.69-8.74,65.52-14.83,90.13-17.87-19.54,15.55-45.03,32.69-76.71,52.23-42.67,23.27-93.53,53.2-154.63,89.17-33.63,19.79-71.75,42.23-112.61,65.94l14.24,24.54c40.86-23.71,79.25-45.69,113.12-65.07,61.54-35.22,112.75-64.52,154.13-90.04,32.63-17.79,60.14-31.41,83.31-40.66-14.84,19.84-34.91,42.71-60.14,69.33-35.28,33.45-76.75,75.42-126.58,125.86-27.42,27.76-58.51,59.23-91.92,92.63l20.06,20.06c33.41-33.41,64.87-64.49,92.63-91.92,50.44-49.83,92.41-91.3,125.86-126.57,26.99-25.59,50.1-45.82,70.13-60.71-9.2,23.2-22.76,50.76-40.49,83.45-25.42,41.44-54.61,92.72-89.69,154.34-19.31,33.91-41.19,72.35-64.81,113.26l24.57,14.19c23.62-40.92,45.97-79.09,65.69-112.76,35.82-61.19,65.64-112.11,88.81-154.83,19.8-32.29,37.14-58.11,52.86-77.8-2.69,25.06-8.54,55.61-17.19,92.49-13.6,46.67-28.24,103.83-45.84,172.51-9.68,37.8-20.66,80.64-32.67,126.34l27.44,7.21c12-45.69,23.51-88.4,33.65-126.08,18.43-68.46,33.77-125.44,44.87-172.76,10.09-34.63,19.57-63.18,29.06-85.83,3.54,24.42,5.55,54.61,6.6,90.98-1.18,48.59-.69,107.59-.1,178.49.33,39.02.7,83.25.8,130.5l28.37-.06c-.11-47.24.06-91.47.21-130.49.27-70.9.49-129.91-.91-178.5.92-37.68,2.93-68.6,6.6-93.47,9.98,22.99,19.94,52.21,30.6,88.13,11.33,47.27,26.95,104.18,45.71,172.55,10.33,37.63,22.03,80.28,34.26,125.91l27.4-7.34c-12.23-45.63-23.41-88.43-33.29-126.18-17.93-68.6-32.86-125.68-46.68-172.28-8.67-36.17-14.63-66.3-17.52-91.09,15.49,19.57,32.58,45.09,52.03,76.8,23.18,42.73,52.99,93.65,88.82,154.84,19.71,33.67,42.06,71.84,65.68,112.76l24.57-14.19c-23.62-40.91-45.5-79.35-64.81-113.26-35.07-61.62-64.26-112.89-89.68-154.33-18.06-33.3-31.76-61.23-40.95-84.69,20.35,14.86,43.88,35.2,71.5,61.13,33.62,35.11,75.8,76.37,126.48,125.96,27.9,27.29,59.51,58.22,93.08,91.47l19.96-20.16c-33.57-33.24-64.8-64.55-92.36-92.18-50.09-50.21-91.75-91.97-127.19-125.25-25.01-26.12-45.02-48.64-59.9-68.22,22.76,9.14,49.71,22.42,81.39,39.51,41.49,25.32,92.84,54.4,154.54,89.34,33.96,19.23,72.45,41.02,113.41,64.55l14.13-24.6c-40.97-23.53-79.19-45.79-112.91-65.43-61.26-35.68-112.26-65.38-155.04-88.46-31.92-19.48-57.56-36.58-77.21-52.09,24.96,2.84,55.36,8.82,91.98,17.6,46.61,13.83,103.69,28.75,172.29,46.69,37.75,9.87,80.55,21.06,126.18,33.29l7.35-27.4c-45.63-12.23-88.29-23.93-125.91-34.26-68.37-18.77-125.28-34.38-172.55-45.71-35.66-10.58-64.73-20.48-87.64-30.38,24.69-3.63,55.33-5.67,92.51-6.66,48.59,1.29,107.6.93,178.51.5Zm-357.81,4.1c-.86,3.29-1.06,6.69-1.38,10.06-2.15,2.63-4.41,5.18-6.11,8.12-1.67,2.89-2.72,6.06-3.91,9.17-2.7,1.95-5.49,3.79-7.85,6.15-2.42,2.42-4.31,5.27-6.3,8.04-3.27,1.23-6.58,2.37-9.61,4.12-2.63,1.52-4.87,3.58-7.25,5.47-3.24.36-6.5.56-9.65,1.42-3.28.9-6.32,2.42-9.41,3.84-3.35-.55-6.69-1.22-10.09-1.22s-6.61.67-9.9,1.2c-3.04-1.36-6.03-2.86-9.25-3.72-3.85-1.03-7.79-1.56-11.78-1.84-2.2-1.68-4.24-3.59-6.65-4.97-2.56-1.47-5.21-2.75-7.95-3.84-2.05-2.86-4.03-5.77-6.52-8.24-2.41-2.39-5.26-4.26-8.03-6.23-1.2-3.18-2.28-6.4-3.98-9.34-1.67-2.89-3.89-5.39-5.99-7.97-.34-3.31-.54-6.65-1.4-9.87-.98-3.65-2.59-7.06-4.21-10.47.34-2.67.96-5.31.95-8.01,0-2.95-.66-5.84-1.08-8.75,1.65-3.49,3.27-6.98,4.24-10.7.86-3.29,1.06-6.68,1.38-10.06,2.15-2.63,4.4-5.18,6.11-8.13,1.67-2.89,2.72-6.06,3.91-9.17,2.7-1.95,5.49-3.79,7.85-6.15,2.26-2.26,4.01-4.94,5.89-7.51,2.88-1.14,5.85-2.1,8.54-3.66,3.08-1.79,5.77-4.13,8.5-6.42,3.31-.36,6.65-.57,9.87-1.45,3.28-.9,6.32-2.42,9.4-3.84,3.35.55,6.69,1.22,10.09,1.22s6.61-.67,9.9-1.2c3.04,1.36,6.03,2.86,9.25,3.72,2.63.71,5.37.79,8.06,1.15,2.85,2.39,5.67,4.8,8.9,6.65,3.4,1.95,7.08,3.28,10.78,4.57,1.69,2.2,3.19,4.57,5.17,6.52,2.41,2.39,5.26,4.26,8.02,6.23,1.2,3.18,2.28,6.4,3.98,9.35,1.67,2.89,3.89,5.39,5.99,7.97.34,3.31.54,6.65,1.4,9.87.73,2.74,2.07,5.25,3.16,7.86-.72,3.85-1.39,7.7-1.38,11.61,0,3.65.69,7.25,1.34,10.84-1.04,2.53-2.33,4.97-3.02,7.63Z"
        />
      </g>
    </g>
  </svg>
);

const narrativeText =
  "Driving measurable growth and engagement through thoughtful design and engineering.".split(
    " "
  );

const storyParagraph =
  "Every product I build starts with understanding user goals and translating them into intuitive, high-performance experiences. From concept to launch, I focus on meaningful results—boosting user engagement, retention, and overall business impact.".split(
    " "
  );

const servicesHeadline =
  "Transforming ideas into exceptional digital experiences through expertise and innovation".split(
    " "
  );

const servicesData = [
  {
    number: "01",
    title: "Full Stack Development",
    description:
      "Building scalable and high-performance web applications using Next.js, React, Node.js, and TypeScript, with robust backend architectures, secure RESTful APIs, and clean code practices.",
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        className="ml-2 mt-2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
      >
        <path
          d="M12 18L22 12L32 18L42 12V38L32 44L22 38L12 44V18Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 12V38M32 18V44"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "UI/UX Design & Frontend",
    description:
      "Designing modern, responsive interfaces with Figma, Tailwind CSS, and Framer Motion. Creating intuitive experiences with clean design systems and pixel-perfect implementations.",
    icon: (
      <svg
        width="50"
        height="50"
        viewBox="0 0 64 64"
        fill="none"
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
      >
        <rect
          x="10"
          y="10"
          width="44"
          height="44"
          rx="6"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M10 22H54M22 10V54"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <circle
          cx="38"
          cy="38"
          r="6"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "SaaS Platform Development",
    description:
      "Developing end-to-end SaaS solutions with subscription systems, Stripe billing, and multi-tenant management. Ensuring scalability and secure user management.",
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        className="mt-2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
      >
        <path
          d="M32 10L46 18V38L32 46L18 38V18L32 10Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 10V46M18 18L46 38M46 18L18 38"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "04",
    title: "API & System Architecture",
    description:
      "Designing maintainable APIs with PostgreSQL, Prisma, and MongoDB. Focusing on performance optimization, security best practices, and reliable data flow.",
    icon: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 64 64"
        fill="none"
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
      >
        <circle cx="18" cy="18" r="6" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="46" cy="18" r="6" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="18" cy="46" r="6" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="46" cy="46" r="6" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M24 18H40M24 46H40M18 24V40M46 24V40"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
    ),
  },
];

const wordAnimation: Variants = {
  hidden: { y: "110%", rotateX: -15, opacity: 0 },
  visible: {
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
  },
};

export const ProfileStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardSectionRef = useRef<HTMLDivElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);

  // 1. Neon SVG line scroll animation:
  // The path is an outlined ribbon with a total perimeter of 12500.4px.
  // The downward journey from top-right (2049, 7) to the bottom-left endpoint (6, 2795)
  // is precisely the first 6250.2px (50% of the path).
  // We bind the scroll progress directly to cardSectionRef across ["start 65%", "end 25%"],
  // and animate strokeDashoffset from 12500.4 down to 6250.2.
  // This ensures the line steadily and visibly GROWS with the user's scroll across the
  // entire section at a natural reading speed without racing ahead or stalling.
  const { scrollYProgress: lineScrollProgress } = useScroll({
    target: cardSectionRef,
    offset: ["start 65%", "end 25%"],
  });

  // Responsive spring to ensure smooth scroll-wheel tracking without lag or inertia overshoot
  const smoothLineProgress = useSpring(lineScrollProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
    restDelta: 0.0005,
  });

  const strokeDashoffset = useTransform(
    smoothLineProgress,
    [0, 1],
    [12500.4, 6250.2]
  );

  // 2. Story Card scroll-driven expansion (exact GSAP from azizkhaldi.com: width 80% -> 100%, borderRadius 34px -> 0px, y 120 -> 0):
  const { scrollYProgress: cardProgress } = useScroll({
    target: cardSectionRef,
    offset: ["start 80%", "start 10%"],
  });

  // Card dimensions & position reactive to scroll (matching DevTools snapshots)
  const cardWidth = useTransform(cardProgress, [0, 1], ["80%", "100%"]);
  const cardRadius = useTransform(cardProgress, [0, 1], ["34px", "0px"]);
  const cardY = useTransform(cardProgress, [0, 1], [120, 0]);

  // 3. Profile Photo scroll-driven expansion (exact GSAP from azizkhaldi.com: width 60% -> 100%, scale 0.95 -> 1.0):
  const { scrollYProgress: photoProgress } = useScroll({
    target: photoContainerRef,
    offset: ["start end", "start 20%"],
  });

  const photoWidth = useTransform(photoProgress, [0, 1], ["60%", "100%"]);
  const photoScale = useTransform(photoProgress, [0, 1], [0.95, 1.0]);
  const photoY = useTransform(photoProgress, [0, 1], [50, 0]);
  const photoRadius = useTransform(photoProgress, [0, 1], ["20px", "10px"]);

  // Marquee text rises up and fades in as card enters
  const marqueeOpacity = useTransform(cardProgress, [0.05, 0.45], [0, 1]);
  const marqueeY = useTransform(cardProgress, [0.05, 0.45], [120, 0]);

  // 4. Services Section Pinned Horizontal Scroll
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      const horizontal = window.innerWidth >= 768;
      setIsHorizontal(horizontal);
      if (cardsTrackRef.current && horizontal) {
        // Track width includes padding-left and padding-right
        const trackWidth = cardsTrackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Total scroll distance needed so Card 04 rests fully visible on screen
        const toScroll = Math.max(0, trackWidth - viewportWidth);
        setMaxScroll(toScroll);
      }
    };

    updateDimensions();
    const timer = setTimeout(updateDimensions, 150);

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (cardsTrackRef.current) {
      resizeObserver.observe(cardsTrackRef.current);
    }
    window.addEventListener("resize", updateDimensions);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const { scrollYProgress: servicesScroll } = useScroll({
    target: servicesSectionRef,
    offset: ["start start", "end end"],
  });

  const smoothServicesScroll = useSpring(servicesScroll, {
    stiffness: 140,
    damping: 26,
    mass: 0.15,
  });

  const cardsX = useTransform(smoothServicesScroll, (progress) => {
    if (!isHorizontal || maxScroll <= 0) return 0;
    // Map progress 0 -> 0.85 to 0 -> -maxScroll
    // From 0.85 -> 1.0, stay locked at -maxScroll so Card 04 is fully visible
    // before the page unpins to allow continuing scroll
    const clampedProgress = Math.min(Math.max(0, progress) / 0.85, 1);
    return -clampedProgress * maxScroll;
  });

  return (
    <>
      <div
        ref={containerRef}
        className="overflow-hidden -mt-[4rem] w-full relative font-cabinet select-none bg-sec"
      >


      {/* 
        Section 1: #first-story-section Card
        Scroll-reactive expansion towards full screen!
        Starts at width: 80%, borderRadius: 34px, y: 120px
        Expands to width: 98%, borderRadius: 8px, y: 0px
      */}
      <div ref={cardSectionRef} className="w-full flex justify-center overflow-hidden">
        <motion.div
          id="first-story-section"
          className="story-section flex items-center lg:pb-20 pb-10 flex-col justify-start relative text-sec bg-main overflow-hidden shadow-2xl"
          style={{
            margin: "0px auto",
            width: cardWidth,
            borderRadius: cardRadius,
            y: cardY,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundBlendMode: "overlay",
            willChange: "transform, width, border-radius",
          }}
        >
          {/* 
            Exact animated neon line SVG (#animated-line-path) from DevTools:
            Positioned at z-[30] so it weaves ON TOP of profile-photo (z-[20]) 
            and UNDER more-about-me (z-[380])!
          */}
          <div
            className="absolute lg:top-[10rem] top-[25rem] -left-44 lg:left-10 w-full h-full pointer-events-none z-[30]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2100 2850"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              className="w-full min-w-[200vw] md:min-w-[150vw] lg:min-w-full h-auto"
            >
              <motion.path
                id="animated-line-path"
                d="M2049.4 7.12338C2050.34 7.09245 2051.23 6.69369 2051.88 6.00967C2052.53 5.32571 2052.88 4.41341 2052.86 3.47254C2052.83 2.53168 2052.44 1.63823 2051.75 0.987824C2051.07 0.337364 2050.16 -0.0158818 2049.22 0.000643925C2049.22 0.000643925 2049.22 0.000643925 2049.22 0.000643925C1943.26 1.94307 1840.2 5.90331 1736.44 14.9286C1580.5 35.1176 1395.04 34.2702 1278.58 166.757C1227.87 238.526 1236.8 327.455 1207.7 401.188C1180.83 477.082 1123.39 535.224 1055.61 580.079C1016.79 606.535 979.953 634.166 955.567 675.911C927.749 717.393 946.265 778.123 980.727 808.354C1075.88 894.744 1195.98 932.824 1306.11 986.278C1361.73 1012.48 1416.74 1038.53 1465.3 1075.04C1488.69 1093.15 1510.8 1114.41 1519.8 1140.6C1529.12 1166.7 1519.29 1194.56 1500.7 1217.79C1404.12 1339.78 1268.09 1422.61 1139.05 1511.49C1075.88 1557.11 1005.55 1600.46 966.359 1674.6C923.616 1757.92 996.115 1837.3 1055.35 1883.24C1199.52 1951.53 1354.08 1931.18 1501.68 1955.38C1575.8 1965.1 1650.06 1977.47 1718.74 2004.79C1786.41 2030.3 1851.14 2084.87 1848.19 2160.07C1857.77 2265.2 1741.97 2306.5 1650.44 2305.64C1554.37 2308.8 1458.26 2296.72 1361.83 2287.47C1176.37 2275.98 949.392 2224.12 804.589 2378.02C676.379 2541.45 504.322 2672.42 307.757 2741.09C210.014 2775.13 106.864 2796.58 3.77395 2795.01C2.83192 2794.95 1.90584 2795.27 1.19933 2795.9C0.492818 2796.52 0.0637703 2797.4 0.00655131 2798.35C-0.0506677 2799.29 0.268607 2800.21 0.89412 2800.92C1.51963 2801.63 2.40016 2802.06 3.3419 2802.12C3.3419 2802.12 3.3419 2802.12 3.3419 2802.12C108.263 2804.24 211.744 2783.12 310.615 2749.26C509.168 2680.97 683.528 2549.47 813.527 2385.11C949.697 2239.53 1175.36 2287.99 1360.46 2300.99C1456.84 2310.54 1553.01 2323.05 1651 2320.16C1699.48 2317.99 1750.07 2312.84 1794.89 2288.18C1840.96 2264.57 1865.28 2210.14 1863.58 2160.07C1867.3 2076.9 1794.14 2015.79 1724.76 1989.98C1653.64 1961.52 1578.54 1948.99 1503.79 1938.98C1356.97 1915.39 1194.32 1930.71 1066.23 1869.57C1007.37 1823.57 945.361 1752.48 982.498 1682.27C1017.2 1615.88 1086.61 1571.25 1149.4 1526.47C1277.87 1438.09 1415.69 1354.9 1515.42 1229.34C1535.99 1204.15 1549.65 1167.96 1537.6 1134.63C1526.1 1101.89 1501.37 1079.39 1476.77 1060.11C1425.62 1021.67 1370.11 995.587 1314.1 969.12C1203.78 915.863 1082.67 875.787 994.272 795.03C962.857 765.637 949.342 721.103 972.099 685.095C993.13 648.632 1028.32 621.198 1065.96 595.585C1135.46 549.434 1196.38 487.653 1224.35 407.229C1254.02 328.852 1245.71 240.903 1291.77 176.154C1396.46 53.001 1582.9 47.2325 1737.51 26.2786C1840.75 16.0276 1943.59 10.6447 2049.4 7.12338Z"
                stroke="#d4f534"
                strokeWidth="70"
                opacity="0.95"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                strokeDasharray={12500.4}
                style={{
                  strokeDashoffset,
                  filter: "drop-shadow(0 0 16px rgba(212, 245, 52, 0.45))",
                }}
              />
            </svg>
          </div>
          <motion.div
            style={{
              opacity: marqueeOpacity,
              y: marqueeY,
            }}
            className="lg:my-28 my-6 w-full"
          >
            <div className="item font-semibold relative w-full overflow-hidden md:text-[8rem] text-[3rem] h-full lg:py-28 py-20">
              <div
                className="infinit-text whitespace-nowrap flex overflow-hidden items-center w-full"
                style={{
                  clipPath: "polygon(0px 0%, 100% 0%, 100% 100%, 0% 100%)",
                }}
              >
                <motion.div
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 25,
                  }}
                  className="flex items-center gap-10 whitespace-nowrap w-max"
                >
                  {[1, 2].map((loopKey) => (
                    <div key={loopKey} className="flex items-center gap-10 whitespace-nowrap">
                      {/* Block 1 */}
                      <div className="flex items-center gap-8 md:gap-12">
                        <img
                          alt="green flower"
                          loading="lazy"
                          width={900}
                          height={900}
                          className="h-16 w-16 lg:h-[8rem] lg:w-[8rem] shrink-0 object-contain"
                          src="/green-flower.svg"
                        />
                        <span className="tracking-tight uppercase">FULL-STACK DEVELOPER</span>
                        <span className="tracking-tight uppercase">UI &amp; UX DESIGNER.</span>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                          className="shrink-0 flex items-center justify-center"
                        >
                          <Layer2Starburst className="h-16 w-16 lg:h-20 lg:w-20 text-sec" />
                        </motion.div>
                      </div>

                      {/* Block 2 */}
                      <div className="flex items-center gap-8 md:gap-12">
                        <img
                          alt="green flower"
                          loading="lazy"
                          width={900}
                          height={900}
                          className="h-16 w-16 lg:h-[8rem] lg:w-[8rem] shrink-0 object-contain"
                          src="/green-flower.svg"
                        />
                        <span className="tracking-tight uppercase">FULL-STACK DEVELOPER</span>
                        <span className="tracking-tight uppercase">UI &amp; UX DESIGNER.</span>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                          className="shrink-0 flex items-center justify-center"
                        >
                          <Layer2Starburst className="h-16 w-16 lg:h-20 lg:w-20 text-sec" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Profile Photo with Scroll Expansion - slowly grows as user scrolls into view */}
          <motion.div
            ref={photoContainerRef}
            className="profile-photo text-sec px-[1rem] md:px-[6.3rem] z-[20] flex flex-col items-center justify-center rounded-lg overflow-hidden mx-auto"
            style={{
              width: photoWidth,
              scale: photoScale,
              y: photoY,
              borderRadius: photoRadius,
              willChange: "transform, width, scale",
            }}
          >
            <div className="inset-0 z-10 w-full">
              <img
                alt="Profile"
                loading="lazy"
                width={1200}
                height={800}
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 h-[50vh] lg:h-[100vh] lg:w-full w-[100vw] mx-auto rounded-lg"
                src="/image_6103ab.png"
              />
            </div>
          </motion.div>

          {/* More About Me Narrative & Stats (DevTools exact matching: relative z-[380] text-sec py-10 mt-5 px-[1rem] md:px-[6.3rem]) */}
          <div className="relative more-about-me z-[380] w-full text-sec py-10 mt-5 px-[1rem] md:px-[6.3rem] cursor-default font-cabinet">
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
                {/* Left Headline */}
                <div
                  className="text-3xl lg:text-4xl font-medium leading-snug"
                  style={{ perspective: "1000px" }}
                >
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ staggerChildren: 0.02 }}
                  >
                    {narrativeText.map((word, i) => (
                      <span
                        key={i}
                        className="inline-block mr-[0.3em]"
                        style={{
                          lineHeight: 1.25,
                          clipPath: "polygon(-10% -50%, 110% -50%, 110% 100%, -10% 100%)",
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

                {/* Right Paragraph */}
                <div className="flex items-center">
                  <div
                    className="text-lg md:text-xl leading-relaxed"
                    style={{ perspective: "1000px" }}
                  >
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        staggerChildren: 0.012,
                        delayChildren: 0.15,
                      }}
                    >
                      {storyParagraph.map((word, i) => (
                        <span
                          key={i}
                          className="inline-block mr-[0.3em]"
                          style={{
                            lineHeight: 1.3,
                            clipPath: "polygon(-10% -50%, 110% -50%, 110% 100%, -10% 100%)",
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
                </div>
              </div>

              {/* Counters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12"
              >
                <div className="border-t border-gray-600 pt-6 sm:pt-8">
                  <p className="text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-6">
                    YEARS OF EXPERIENCE
                  </p>
                  <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold years-counter">
                    4+
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-6 sm:pt-8">
                  <p className="text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-6">
                    PROJECTS COMPLETED
                  </p>
                  <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold projects-counter">
                    30+
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

      {/* 
        Section 2: Services / Offerings Section
        Matching exact DevTools extraction from user:
        - Headline: "Transforming ideas into exceptional digital experiences through expertise and innovation"
        - 4 interactive service cards with exact border system, icons, numbers, and hover glow
        - Pinned horizontal slide on desktop/tablet, stacked column on mobile
        - Sibling to Story section so position:sticky works without overflow-hidden clipping!
      */}
      <div
        ref={servicesSectionRef}
        className="bg-main w-full relative font-cabinet select-none"
        style={{ height: isHorizontal ? "260vh" : "auto" }}
      >
        <div
          className={
            isHorizontal
              ? "sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-8"
              : "relative h-auto w-full py-16 flex flex-col"
          }
        >
          {/* Section Headline */}
          <div className="flex flex-col text-left items-center max-w-3xl justify-center mx-auto mb-8 lg:mb-12 px-4 shrink-0">
            <div
              className="text-sec text-3xl lg:text-4xl font-medium leading-snug text-center"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ staggerChildren: 0.02 }}
              >
                {servicesHeadline.map((word, i) => (
                  <span
                    key={i}
                    className="inline-block mr-[0.3em]"
                    style={{
                      lineHeight: 1.25,
                      clipPath: "polygon(-10% -50%, 110% -50%, 110% 100%, -10% 100%)",
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
          </div>

          {/* 4 Interactive Service Cards Track */}
          <div className="relative w-full flex items-center overflow-hidden shrink-0">
            <motion.div
              ref={cardsTrackRef}
              style={{ x: isHorizontal ? cardsX : 0 }}
              className={
                isHorizontal
                  ? "flex flex-row w-max pl-6 sm:pl-12 lg:pl-24 pr-6 sm:pr-12 lg:pr-24"
                  : "flex flex-col w-full px-4 gap-6"
              }
            >
              {servicesData.map((service, index) => {
                const isLast = index === servicesData.length - 1;
                return (
                  <div key={service.number} className="group relative shrink-0">
                    <div
                      className={`
                        relative text-sec 
                        w-[320px] sm:w-[380px] md:w-[440px] lg:w-[480px]
                        h-[360px] sm:h-[400px] md:h-[440px] lg:h-[480px]
                        border-t border-b border-l
                        ${isLast ? "border-r" : "border-r md:border-r-0"}
                        border-gray-400 
                        p-6 sm:p-8 md:p-10
                        transition-all duration-500 cursor-pointer overflow-hidden
                        hover:bg-sec/[0.02]
                      `}
                    >
                      <div className="relative flex flex-col justify-between z-10 h-full">
                        <div className="flex items-start justify-between mb-4 sm:mb-6">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <span className="text-sec absolute -top-3 sm:-top-5 -right-3 sm:-right-5 text-base sm:text-lg md:text-2xl font-light">
                              {service.number}
                            </span>
                            <div
                              className="
                                transition-all bg-thr 
                                h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20
                                rounded-full flex items-center justify-center duration-500
                                text-sec/60 group-hover:text-sec group-hover:scale-105
                              "
                            >
                              {service.icon}
                            </div>
                          </div>
                        </div>
                        <h3
                          className="
                            text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                            font-bold my-3 w-full lg:w-[70%] leading-tight
                            transition-colors duration-500
                            text-sec/90 group-hover:text-sec
                          "
                        >
                          {service.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6"></div>
                        <div className="pt-4 sm:pt-6 border-t border-sec/10">
                          <p className="text-sec/70 text-base sm:text-lg leading-relaxed line-clamp-4 sm:line-clamp-none">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <div
                        className="
                          absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32
                          transition-opacity duration-500
                          opacity-0 group-hover:opacity-100
                          pointer-events-none
                        "
                      >
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-thr/10 to-transparent rounded-2xl"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Continuing scroll area / buffer below Services so unpinning allows smooth continuing page scroll */}
      <div className="w-full h-[40vh] bg-main" />
    </>

  );
};

export default ProfileStory;
