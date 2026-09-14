"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  return (
    <header className="w-full flex justify-between items-center z-60 p-4 md:p-8 pt-[1.5rem] md:pt-[2.5rem] font-cabinet bg-transparent sticky top-0">
      <Link href="/" className="z-50 flex items-center">
        {/* Logo container with fallback text / styling if logo.png is missing */}
        <span className="font-bold text-xl tracking-tight flex items-center gap-1">
          <span className="w-7 h-7 rounded-full bg-sec text-main flex items-center justify-center font-black text-sm">
            S
          </span>
          <span className="font-black text-lg text-sec">Safwan</span>
        </span>
      </Link>

      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/works"
            className="text-lg hover:opacity-70 transition-opacity duration-300 relative group overflow-hidden block"
          >
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">
              Works
            </span>
            <span className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              Works
            </span>
          </Link>
        </nav>

        <a
          href="#contact"
          className="group flex items-center gap-0 hover:gap-2 transition-all duration-300 cursor-pointer"
        >
          <div className="relative bg-[#1E1E1E] text-white px-4 py-2.5 rounded-full overflow-hidden text-sm font-medium group-hover:bg-white group-hover:text-black hidden md:flex items-center">
            <span className="relative z-10 transition-colors duration-300">Contact</span>
            <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </div>
          <div className="hidden md:flex w-10 h-10 bg-[#1E1E1E] rounded-full items-center justify-center relative overflow-hidden group-hover:bg-white transition-colors duration-300">
            <svg
              className="w-4 h-4 text-white group-hover:text-black relative z-10 transition-all duration-300 group-hover:rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7v10"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
