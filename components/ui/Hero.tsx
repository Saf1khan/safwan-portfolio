"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/Saf1khan",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.76-1.75 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://x.com/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio playback interrupted or failed:", err);
          setIsPlaying(false);
        });
    }
  };

  return (
    <section className="hero relative h-screen w-full flex items-center justify-center overflow-hidden z-20 bg-main font-cabinet">
      {/* Hidden background audio element */}
      <audio ref={audioRef} src="/audio/bg-music.mp3" loop />

      {/* Left Social Links & Vertical Line */}
      <div className="absolute left-0 top-0 h-[80vh] flex flex-col items-center justify-between px-6 md:px-9 pt-20 z-50">
        <div className="hidden lg:block h-[40vh] w-[1px] bg-sec/30 relative"></div>
        <div className="flex flex-col gap-6 md:gap-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sec/70 hover:text-sec hover:scale-110 transition-all duration-300"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Main Title & Personalized Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-50 text-sec text-center uppercase tracking-tighter px-4 max-w-4xl"
      >
        <h2 className="text-[1.4rem] md:text-[1.6rem] font-medium tracking-normal mb-2 text-sec/90 normal-case">
          Hi! I&apos;m Safwan
        </h2>
        <h1 className="text-[2.5rem] sm:text-[3.2rem] md:text-[4.5rem] xl:text-[5.6rem] font-black leading-none">
          Full-Stack
        </h1>
        <h1 className="text-[2.5rem] sm:text-[3.2rem] md:text-[4.5rem] xl:text-[5.6rem] font-black leading-none">
          Developer
        </h1>
        <h3 className="text-sm md:text-base font-semibold tracking-widest text-sec/75 mt-3">
          Frontend Engineer
        </h3>

        {/* Experience Highlight */}
        <p className="mt-4 text-xs md:text-sm normal-case tracking-normal font-normal text-sec/70 max-w-lg mx-auto leading-relaxed">
          Junior Software Engineer with the{" "}
          <span className="font-semibold text-sec">Sparklab team</span> at the{" "}
          <span className="font-semibold text-sec">Udupi office of IndiVillage</span>, crafting interactive and high-performance digital experiences.
        </p>
      </motion.div>

      {/* Background Layer with Extracted MP4 Video Asset */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <video
          loop
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover opacity-80 mix-blend-multiply"
        >
          <source
            src="https://azizkhaldi.com/_next/static/media/glassyObj.3c74f580.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Audio UI Toggle */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-8 right-8 z-50 mix-blend-difference text-white font-mono text-xs md:text-sm tracking-wider uppercase px-4 py-2 rounded-full border border-white/40 hover:border-white hover:scale-105 transition-all duration-300 backdrop-blur-sm cursor-pointer"
        aria-label="Toggle background audio"
      >
        Sound [{isPlaying ? "ON" : "OFF"}]
      </button>
    </section>
  );
};

export default Hero;
