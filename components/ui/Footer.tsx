"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import * as THREE from "three";

// Rolling text link with per-character staggered wave animation on hover matching inspect markup
interface RollingLinkProps {
  href: string;
  text: string;
  isExternal?: boolean;
}

const RollingLink: React.FC<RollingLinkProps> = ({ href, text, isExternal = false }) => {
  const [hovered, setHovered] = useState(false);
  const letters = text.split("");

  return (
    <div className="overflow-hidden">
      <a
        target={isExternal ? "_blank" : ""}
        rel="noopener noreferrer"
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="block cursor-pointer"
      >
        <h1
          className="Footertext text-[0.95rem] cursor-pointer hover:text-gray-400 text-gray-300 transition-colors"
          style={{ translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)" }}
        >
          <div className="relative overflow-hidden inline-block cursor-pointer select-none">
            {/* Upper row of letters (resting at 0px, translates to -24px on hover) */}
            <div className="block">
              {letters.map((char, i) => (
                <span
                  key={`char-1-${i}`}
                  className="inline-block whitespace-pre transition-transform duration-300 ease-out"
                  style={{
                    transform: hovered ? "translate(0px, -24px)" : "translate(0px, 0px)",
                    transitionDelay: `${i * 18}ms`,
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Lower row of letters (resting at +24px, translates to 0px on hover) */}
            <div className="block absolute top-0 left-0">
              {letters.map((char, i) => (
                <span
                  key={`char-2-${i}`}
                  className="inline-block whitespace-pre transition-transform duration-300 ease-out"
                  style={{
                    transform: hovered ? "translate(0px, 0px)" : "translate(0px, 24px)",
                    transitionDelay: `${i * 18}ms`,
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </h1>
      </a>
    </div>
  );
};

// Interactive 3D Robot Character with Global Mouse-Tracking Eyes & Head Rotation
const FooterCanvasSphere = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 450;
    const height = 450;

    // Explicit attributes to prevent 0x0 initialization error
    canvas.width = width;
    canvas.height = height;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Robot Character Group
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // 1. Robot Head (Glossy white/silver metallic sphere)
    const headGeo = new THREE.SphereGeometry(2.0, 64, 64);
    const headMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#f0f0f0"),
      roughness: 0.15,
      metalness: 0.35,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.9,
    });
    const head = new THREE.Mesh(headGeo, headMat);
    robotGroup.add(head);

    // 2. Dark Curved Face Visor
    const visorGeo = new THREE.SphereGeometry(2.02, 48, 48, 0, Math.PI * 2, Math.PI * 0.32, Math.PI * 0.36);
    const visorMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#121212"),
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    robotGroup.add(visor);

    // 3. Expressive Glowing Eyes Group (Cyan / Lime)
    const eyesGroup = new THREE.Group();
    eyesGroup.position.set(0, 0, 1.88);
    robotGroup.add(eyesGroup);

    const eyeGeo = new THREE.CapsuleGeometry(0.18, 0.42, 16, 16);
    const eyeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#D4F534"),
      emissive: new THREE.Color("#D4F534"),
      emissiveIntensity: 3.5,
      roughness: 0.1,
      metalness: 0.2,
    });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.55, 0.05, 0);
    eyesGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.55, 0.05, 0);
    eyesGroup.add(rightEye);

    // 4. Robot Ears / Side Audio Pods
    const earGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.3, 32);
    const earMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#222222"),
      roughness: 0.3,
      metalness: 0.8,
    });

    const leftEar = new THREE.Mesh(earGeo, earMat);
    leftEar.rotation.z = Math.PI / 2;
    leftEar.position.set(-2.0, 0, 0);
    robotGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, earMat);
    rightEar.rotation.z = Math.PI / 2;
    rightEar.position.set(2.0, 0, 0);
    robotGroup.add(rightEar);

    // 5. Orbiting Neon Halo Ring
    const haloGeo = new THREE.TorusGeometry(2.6, 0.02, 16, 100);
    const haloMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#D4F534"),
      emissive: new THREE.Color("#D4F534"),
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.8,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = Math.PI / 3;
    robotGroup.add(halo);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight("#D4F534", 2.6);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight("#ffffff", 1.8);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    const eyeGlowPoint = new THREE.PointLight("#D4F534", 1.5, 6);
    eyeGlowPoint.position.set(0, 0, 2.5);
    robotGroup.add(eyeGlowPoint);

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let targetHeadRotX = 0;
    let targetHeadRotY = 0;
    let targetEyeX = 0;
    let targetEyeY = 0;

    // Global events-target mouse tracking across the entire viewport
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      // Head turns gently towards cursor
      targetHeadRotY = mouseX * 0.45;
      targetHeadRotX = -mouseY * 0.35;

      // Eyes look intensely at the cursor on the visor
      targetEyeX = mouseX * 0.35;
      targetEyeY = mouseY * 0.25;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const clock = new THREE.Clock();
    let nextBlink = 3.0;
    let isBlinking = false;
    let blinkProgress = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Weightless floating levitation
      const floatY = Math.sin(elapsedTime * 1.8) * 0.12;
      robotGroup.position.y = floatY;
      halo.rotation.z -= 0.006;

      // Smooth cursor-tracking lerp for head rotation
      robotGroup.rotation.x += (targetHeadRotX - robotGroup.rotation.x) * 0.06;
      robotGroup.rotation.y += (targetHeadRotY - robotGroup.rotation.y) * 0.06;

      // Smooth cursor-tracking lerp for eyes
      eyesGroup.position.x += (targetEyeX - eyesGroup.position.x) * 0.08;
      eyesGroup.position.y += (targetEyeY - eyesGroup.position.y) * 0.08;

      // Eye blinking mechanism
      if (elapsedTime > nextBlink && !isBlinking) {
        isBlinking = true;
        blinkProgress = 0;
      }

      if (isBlinking) {
        blinkProgress += 0.12;
        const scaleY = Math.max(0.08, Math.abs(Math.cos(blinkProgress * Math.PI)));
        leftEye.scale.y = scaleY;
        rightEye.scale.y = scaleY;

        if (blinkProgress >= 1) {
          isBlinking = false;
          leftEye.scale.y = 1;
          rightEye.scale.y = 1;
          nextBlink = elapsedTime + 3.0 + Math.random() * 2.5;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      headGeo.dispose();
      headMat.dispose();
      visorGeo.dispose();
      visorMat.dispose();
      eyeGeo.dispose();
      eyeMat.dispose();
      earGeo.dispose();
      earMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hidden lg:block absolute xl:-top-[15em] lg:-top-[9em] xl:scale-90 lg:scale-[0.55] translate-x-1/2 right-1/2 lg:w-[450px] lg:h-[450px] w-[300px] h-[300px] rounded-lg pointer-events-none z-40">
      <div style={{ width: 450, height: 450, overflow: "hidden" }} className="w-full h-full">
        <canvas
          id="cursor-viewer"
          ref={canvasRef}
          width={450}
          height={450}
          className="w-full h-full block"
          style={{ display: "block", width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [localTime, setLocalTime] = useState<string>("1:56 PM UTC+5:30");

  // Real-time dynamic clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setLocalTime(`${timeStr} UTC+5:30`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Top curve scroll-driven flattening physics (from scaleY: 0.5 to scaleY: 0 as footer enters view)
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "start start"], // corresponds to ScrollTrigger start: "top bottom", end: "top top"
  });

  // Curve starts at 0.5 (arched) and flattens toward 0 into a straight line
  const curveScaleY = useTransform(scrollYProgress, [0, 1], [0.5, 0]);
  const smoothCurveScaleY = useSpring(curveScaleY, { stiffness: 120, damping: 25 });

  const nameLetters = "SAFWAN".split("");

  return (
    <footer
      ref={footerRef}
      className="footerSection font-cabinetGrotesk relative overflow-hidden z-[30] bg-sec text-white"
      itemScope
      itemType="http://schema.org/Person"
    >
      {/* 
        1. Top Inverted Oval Curve (FooterCurve)
        origin-bottom ensures scaleY flattens seamlessly from 0.5 to 0 into the straight edge
      */}
      <motion.div
        className="FooterCurve absolute left-1/2 -top-[7rem] w-[120%] -translate-x-1/2 h-[100px] z-50 pointer-events-none origin-bottom"
        style={{
          scaleY: smoothCurveScaleY,
          transformOrigin: "bottom center",
        }}
      >
        <div
          className="cercel absolute right-[-10%] rounded-[50%] h-[750%] w-[120%] bg-main shadow-[0px_60px_50px_rgba(0,0,0,0.75)]"
        />
      </motion.div>

      {/* 2. Main Footer Body */}
      <div className="font-cabinetGrotesk h-[80vh] z-30 lg:h-[100vh] flex flex-col justify-between text-white lg:pt-24 pt-[2rem] px-[1rem] lg:px-[2rem] relative bg-sec">
        {/* Top Content Row: Navigation, Socials, Local Time, Version, and Buttons */}
        <div className="flex flex-col lg:flex-row justify-between w-full">
          {/* Left Columns Grid */}
          <div className="flex justify-between">
            <div className="lg:text-lg z-50 flex flex-wrap lg:gap-10 gap-6">
              {/* Column 1: LINKS */}
              <div className="flex flex-col gap-2">
                <div className="overflow-hidden">
                  <h1
                    className="Footertext opacity-50 text-sm"
                    style={{ translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)" }}
                  >
                    LINKS
                  </h1>
                </div>
                <div className="flex gap-1 flex-col whitespace-nowrap leading-6">
                  <RollingLink href="/" text="Home" />
                  <RollingLink href="/works/" text="Work" />
                  <RollingLink href="/about-me/" text="About" />
                  <RollingLink href="mailto:safwankhan.dev@gmail.com" text="Contact" />
                </div>
              </div>

              {/* Column 2: SOCIALS */}
              <div className="flex flex-col gap-2">
                <div className="overflow-hidden">
                  <h1
                    className="Footertext opacity-50 text-sm"
                    style={{ translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)" }}
                  >
                    SOCIALS
                  </h1>
                </div>
                <div className="flex gap-1 flex-col whitespace-nowrap leading-6">
                  <RollingLink
                    href="mailto:safwankhan.dev@gmail.com"
                    text="Email"
                    isExternal
                  />
                  <RollingLink
                    href="https://www.linkedin.com/in/safwankhan"
                    text="LinkedIn"
                    isExternal
                  />
                  <RollingLink
                    href="https://wa.me/919876543210"
                    text="WhatsApp"
                    isExternal
                  />
                  <RollingLink
                    href="https://github.com/Saf1khan"
                    text="GitHub"
                    isExternal
                  />
                </div>
              </div>

              {/* Column 3: LOCAL TIME */}
              <div className="flex flex-col gap-2">
                <div className="overflow-hidden">
                  <h1
                    className="Footertext opacity-50 text-sm"
                    style={{ translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)" }}
                  >
                    LOCAL TIME
                  </h1>
                </div>
                <div className="flex gap-1 flex-col whitespace-nowrap leading-6">
                  <div className="overflow-hidden">
                    <p
                      className="Footertext text-[0.95rem]"
                      style={{ translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)" }}
                    >
                      {localTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Column 4: VERSION */}
              <div className="flex flex-col gap-2">
                <div className="overflow-hidden">
                  <h1
                    className="Footertext opacity-50 text-sm"
                    style={{ translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)" }}
                  >
                    VERSION
                  </h1>
                </div>
                <div className="flex gap-1 flex-col whitespace-nowrap leading-6">
                  <div className="overflow-hidden">
                    <p
                      className="Footertext text-[0.95rem]"
                      style={{ translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)" }}
                    >
                      2026 © Edition
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Buttons with double-layered overflow-hidden hover transition */}
          <div className="lg:flex-row lg:w-fit w-full lg:px-0 px-[1rem] md:items-start items-center flex-col flex gap-5 pt-10">
            {/* Button 1: WhatsApp / Phone */}
            <div className="w-full">
              <button className="bg-sec lg:w-fit w-full hover:text-sec border-white hover:border-0 border-[1px] text-white cursor-pointer px-6 py-3 rounded-full relative overflow-hidden group">
                <div className="inline-block relative z-10 transition-colors duration-300 group-hover:text-sec font-medium" style={{ transform: "none" }}>
                  <a
                    itemProp="telephone"
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +91 98765 43210
                  </a>
                </div>
                {/* Expanding accent yellow fill on hover */}
                <div
                  className="text-sec flex items-center rounded-full justify-center absolute bg-thr inset-0 transition-transform duration-300 ease-out translate-y-full scale-[0.3] group-hover:translate-y-0 group-hover:scale-100"
                  style={{ willChange: "transform" }}
                >
                  <div style={{ willChange: "transform", backfaceVisibility: "hidden" }}>
                    <a
                      itemProp="telephone"
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </button>
            </div>

            {/* Button 2: Email */}
            <div className="w-full">
              <button className="bg-sec border-white lg:w-fit w-full hover:border-0 border-[1px] text-white cursor-pointer px-6 py-3 rounded-full relative overflow-hidden group">
                <div className="inline-block relative z-10 transition-colors duration-300 group-hover:text-sec font-medium" style={{ transform: "none" }}>
                  <a itemProp="email" href="mailto:safwankhan.dev@gmail.com">
                    safwankhan.dev@gmail.com
                  </a>
                </div>
                {/* Expanding accent yellow fill on hover */}
                <div
                  className="text-sec flex items-center rounded-full justify-center absolute bg-thr inset-0 transition-transform duration-300 ease-out translate-y-full scale-[0.3] group-hover:translate-y-0 group-hover:scale-100"
                  style={{ willChange: "transform" }}
                >
                  <div style={{ willChange: "transform", backfaceVisibility: "hidden" }}>
                    <a itemProp="email" href="mailto:safwankhan.dev@gmail.com" className="font-medium">
                      safwankhan.dev@gmail.com
                    </a>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Giant Heading Row + 3D Canvas */}
        <div className="relative z-10 flex flex-col items-center text-center justify-center w-full">
          {/* Floating 3D Robot Character with Mouse-Tracking Eyes */}
          <FooterCanvasSphere />

          {/* Giant SAFWAN Name Header with Staggered Scroll-Entrance matching stagger: 0.05 & start: top 80% */}
          <div className="font-righteous lg:leading-[28rem] leading-[10rem] lg:text-[20rem] xl:text-[30rem] text-[8rem] flex flex-col text-center select-none w-full">
            <h1 className="aziz-text font-righteous lg:-mb-[8rem] xl:-mb-[5rem] flex overflow-hidden justify-center leading-none">
              {nameLetters.map((char, index) => (
                <motion.span
                  key={`char-${index}`}
                  className="char inline-block"
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.05,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            {/* Structured Schema Data */}
            <div style={{ display: "none" }}>
              <span itemProp="name">Safwan Khan</span>
              <span itemProp="givenName">Safwan</span>
              <span itemProp="familyName">Khan</span>
              <span itemProp="jobTitle">Full-Stack Engineer</span>
              <span itemProp="jobTitle">Frontend Developer</span>
              <a itemProp="url" href="https://linkedin.com/in/safwankhan">
                LinkedIn
              </a>
              <a itemProp="url" href="https://github.com/Saf1khan">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
