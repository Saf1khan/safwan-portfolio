"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Rolling letters component for navigation items matching reference site
const RollingText = ({ text }: { text: string }) => {
  return (
    <div
      className="relative block overflow-hidden whitespace-nowrap cursor-pointer select-none group"
      style={{ lineHeight: 0.9 }}
    >
      <div className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block whitespace-pre transition-transform duration-300 ease-out"
            style={{ transitionDelay: `${i * 15}ms` }}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="block absolute top-0 left-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block whitespace-pre transition-transform duration-300 ease-out"
            style={{ transitionDelay: `${i * 15}ms` }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

// Expandable floating burger drawer matching reference site
const BurgerDrawer = ({
  isOpen,
  setIsOpen,
  links,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  links: { text: string; href: string }[];
}) => {
  return (
    <motion.div
      className="fixed shadow-lg lg:top-9 top-4 right-3 lg:right-5 z-[70] bg-sec overflow-hidden flex items-center justify-center shadow-2xl"
      initial={false}
      animate={{
        width: isOpen ? "min(90vw, 420px)" : "3.5rem",
        height: isOpen ? "auto" : "3.5rem",
        borderRadius: "1.5rem",
        backgroundColor: isOpen ? "#1f1f1f" : "#1E1E1E",
      }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      style={{
        transformOrigin: "top right",
        boxShadow: isOpen
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          : "0 0 10px 0 rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* 3-Bar Burger to X animated icon */}
      <div
        className="absolute top-0 right-0 w-[3.5rem] h-[3.5rem] flex items-center justify-center flex-col gap-1.5 cursor-pointer z-[80]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          className="w-5 h-0.5 bg-white rounded-full origin-center"
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-5 h-0.5 bg-white rounded-full origin-center"
          animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-5 h-0.5 bg-white rounded-full origin-center"
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Expanded Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full flex flex-col p-8 pt-16 font-cabinet"
          >
            <div className="flex flex-col gap-5 mb-8">
              {links.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white text-3xl font-semibold hover:text-accent transition-colors flex items-center justify-between group"
                >
                  <span>{link.text}</span>
                  <span className="text-sm text-gray-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    0{idx + 1}
                  </span>
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-4 flex flex-col gap-2 text-xs text-gray-400">
              <p>Say hello</p>
              <a
                href="mailto:contact@safwankhan.com"
                className="text-white hover:text-accent transition-colors text-sm"
              >
                contact@safwankhan.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { text: "Home", href: "/" },
    { text: "About", href: "#about" },
    { text: "Works", href: "#works" },
  ];

  return (
    <>
      <div className="w-full justify-between items-center flex z-[60] p-4 md:p-8 pt-[1.5rem] md:pt-[2.5rem] font-cabinet select-none">
        {/* Logo */}
        <Link href="/">
          <img
            className="item h-[1.8rem] z-50 w-[1.7rem] lg:w-[1.9rem] lg:h-[2.3rem] cursor-pointer object-contain"
            src="/logo.png"
            alt="Logo"
          />
        </Link>

        {/* Right Section: Desktop Links, Contact Button, and Burger Triggers */}
        <div className="flex items-center gap-8">
          {/* Desktop Nav Links with Rolling Letters */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                className="text-lg hover:opacity-70 transition-opacity duration-300"
                href={item.href}
              >
                <RollingText text={item.text} />
              </Link>
            ))}
          </nav>

          {/* Interactive Contact Button */}
          <a
            href="#contact"
            className="relative group flex items-center justify-center cursor-pointer select-none"
            style={{ willChange: "transform", backfaceVisibility: "hidden" }}
          >
            {/* Pill Capsule */}
            <div className="group relative inline-flex items-center justify-center gap-3 bg-thr text-black font-medium rounded-full transition-all duration-300 hover:gap-4 overflow-hidden text-sm px-4 py-2.5 hidden md:flex -mt-1 hover:!bg-white !bg-sec text-white hover:!text-black">
              <div className="absolute inset-0 bg-white !text-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="relative z-10 overflow-hidden flex items-center">
                <div
                  className="relative overflow-hidden inline-block cursor-pointer select-none"
                  style={{ lineHeight: 0.9 }}
                >
                  <div className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    {"Contact".split("").map((char, i) => (
                      <span
                        key={i}
                        className="inline-block whitespace-pre transition-transform duration-300 ease-out"
                        style={{ transitionDelay: `${i * 15}ms` }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                  <div className="block absolute top-0 left-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
                    {"Contact".split("").map((char, i) => (
                      <span
                        key={i}
                        className="inline-block whitespace-pre transition-transform duration-300 ease-out"
                        style={{ transitionDelay: `${i * 15}ms` }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Circular Arrow Bead */}
            <div className="hidden overflow-hidden md:flex w-10 h-10 bg-thr rounded-full items-center justify-center relative !bg-sec group-hover:!bg-white transition-colors duration-300">
              <div className="absolute inset-0 delay-100 bg-white !text-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <svg
                className="w-4 h-4 text-black absolute transition-all duration-300 translate-y-0 translate-x-0 opacity-100 group-hover:-translate-y-full group-hover:translate-x-full group-hover:opacity-0"
                fill="none"
                stroke="white"
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
                className="w-4 h-4 text-black absolute transition-all duration-300 translate-y-full -translate-x-full opacity-0 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100"
                fill="none"
                stroke="black"
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

          {/* Desktop Fixed Floating Burger (Fades in when scrolled) */}
          <div
            className="hidden md:block"
            style={{
              opacity: isScrolled ? 1 : 0,
              pointerEvents: isScrolled ? "auto" : "none",
              transition: "opacity 0.3s ease",
            }}
          >
            <BurgerDrawer
              isOpen={menuOpen}
              setIsOpen={setMenuOpen}
              links={[...navLinks, { text: "Contact", href: "#contact" }]}
            />
          </div>

          {/* Mobile Fixed Burger (Always available) */}
          <div className="block md:hidden">
            <BurgerDrawer
              isOpen={menuOpen}
              setIsOpen={setMenuOpen}
              links={[...navLinks, { text: "Contact", href: "#contact" }]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
