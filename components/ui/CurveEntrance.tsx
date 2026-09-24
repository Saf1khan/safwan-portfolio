"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CurveEntrance() {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [step, setStep] = useState<"enter" | "exit" | "done">("enter");

  useEffect(() => {
    // Lock scrolling on page load
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Timing sequence:
    // 1. Text fades in (0 to 0.7s)
    // 2. Text holds for ~0.8s, then exit starts at 1.4s
    const exitTimer = setTimeout(() => {
      setStep("exit");
    }, 1400);

    // 3. Morph duration is ~1.1s, total time ~2.5s -> mark done
    const doneTimer = setTimeout(() => {
      setStep("done");
      document.body.style.overflow = originalOverflow || "";
    }, 2600);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = originalOverflow || "";
    };
  }, []);

  if (step === "done") return null;

  const w = dimensions.width || (typeof window !== "undefined" ? window.innerWidth : 1920);
  const h = dimensions.height || (typeof window !== "undefined" ? window.innerHeight : 1080);

  // SVG paths:
  // initialPath: Covers the entire viewport with a bottom convex curve (+300px bulge)
  const initialPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 300} 0 ${h} L0 0`;
  // targetPath: Retracts completely to the top edge (y = 0)
  const targetPath = `M0 0 L${w} 0 L${w} 0 Q${w / 2} 0 0 0 L0 0`;

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Central Greeting Text */}
      <AnimatePresence>
        {step === "enter" && (
          <motion.div
            key="loader-text"
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{
              duration: 0.65,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[110] flex items-center justify-center pointer-events-none"
          >
            <div className="flex items-center gap-3 md:gap-4 px-6 py-3">
              <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#D4F534] inline-block animate-pulse shadow-[0_0_12px_#D4F534]" />
              <span className="font-righteous text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider lowercase first-letter:capitalize">
                hello
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Solid Dark Background Overlay (fades out as curve morphs) */}
      <motion.div
        className="fixed inset-0 bg-[#111111] z-[101]"
        initial={{ opacity: 1 }}
        animate={{ opacity: step === "exit" ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Curved SVG Mask / Overlay */}
      {dimensions.width > 0 && (
        <svg
          className="fixed top-0 left-0 w-full pointer-events-none z-[102] overflow-visible"
          style={{ height: h + 300 }}
          viewBox={`0 0 ${w} ${h + 300}`}
        >
          <motion.path
            fill="#111111"
            initial={{ d: initialPath }}
            animate={{ d: step === "exit" ? targetPath : initialPath }}
            transition={{
              duration: 1.15,
              ease: [0.76, 0, 0.24, 1], // Equivalent to power4.inOut
            }}
          />
        </svg>
      )}
    </div>
  );
}
