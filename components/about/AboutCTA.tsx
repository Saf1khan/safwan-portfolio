"use client";

import React from "react";
import { motion } from "framer-motion";

export const AboutCTA = () => {
  return (
    <div className="pt-[5rem] md:pt-[12rem] md:px-[2rem] px-[1rem]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-black text-white p-12 md:p-16 rounded-2xl text-center shadow-2xl relative overflow-hidden"
      >
        {/* Subtle ambient radial glow in background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/[0.07] via-transparent to-transparent pointer-events-none" />

        <h2 className="text-2xl md:text-4xl font-cabinetGrotesk font-bold mb-6 relative z-10">
          Ready to Build Something Exceptional?
        </h2>
        <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto font-cabinetGrotesk leading-relaxed relative z-10">
          Whether you need an AI-powered SaaS platform, an immersive 3D
          experience, or a high-performance web application, I bring the
          technical expertise and creative vision to make it happen. Let&apos;s
          discuss how we can turn your ambitious ideas into production-ready
          solutions that drive real business results.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutCTA;
