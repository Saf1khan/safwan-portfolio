"use client";

import React, { useEffect, useRef } from "react";

export default function ProjectScrollThemeTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    let rafId: number;

    const updateTheme = () => {
      const banner = document.getElementById("project-banner-section");
      const video = document.getElementById("project-video-section");

      const vh = window.innerHeight;

      let entryProgress = 1;
      let exitProgress = 1;

      // 1. Entry Transition (as laptop image component reaches the top-middle of the screen)
      if (banner) {
        const bannerRect = banner.getBoundingClientRect();
        // Transition smoothly starts when the banner bottom is at 0.75 * vh and completes at 0.35 * vh
        const entryStart = 0.75 * vh;
        const entryEnd = 0.35 * vh;

        if (bannerRect.bottom >= entryStart) {
          entryProgress = 0;
        } else if (bannerRect.bottom <= entryEnd) {
          entryProgress = 1;
        } else {
          entryProgress = (entryStart - bannerRect.bottom) / (entryStart - entryEnd);
        }
      }

      // 2. Exit Transition (as video component is leaving and its bottom reaches the middle of viewport)
      if (video) {
        const videoRect = video.getBoundingClientRect();
        // Transition starts when video bottom is at 0.75 * vh and completes at 0.4 * vh (Screenshot 2)
        const exitStart = 0.75 * vh;
        const exitEnd = 0.4 * vh;

        if (videoRect.bottom >= exitStart) {
          exitProgress = 1;
        } else if (videoRect.bottom <= exitEnd) {
          exitProgress = 0;
        } else {
          exitProgress = (videoRect.bottom - exitEnd) / (exitStart - exitEnd);
        }
      }

      // Combined smooth progress: 0 (light rgb(231,231,231)) -> 1 (solid dark rgb(17,17,17)) -> 0 (light)
      const progress = Math.max(0, Math.min(1, Math.min(entryProgress, exitProgress)));

      // Solid color interpolation (231 -> 17) ensures rich, uniform tone with zero dimness or opacity wash
      const gray = Math.round(231 - progress * (231 - 17));
      overlay.style.backgroundColor = `rgb(${gray}, ${gray}, ${gray})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateTheme);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateTheme();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="dark-overlay fixed inset-0 w-full h-screen pointer-events-none z-0"
      style={{
        backgroundColor: "rgb(231, 231, 231)",
        willChange: "background-color",
      }}
    />
  );
}
