# Portfolio Architecture & Memory
**Identity:** Safwan Khan | Full-Stack & Frontend Engineer.
**Experience Highlight:** Junior Software Engineer, Sparklab team at the Udupi office of IndiVillage.
**Stack:** Next.js (App Router), TS, Tailwind, Framer Motion, R3F.
**Design Rules:** 
- Strict adherence to Tailwind tokens.
- 3D elements belong in `components/3d/`.
- All Framer Motion components must use `"use client"`.
- Build component-by-component.
- Section 2: `HomeIntro.tsx` includes:
  1. Top curve with DevTools scale(1, 3.2751)
  2. 3D masked headline and bio
  3. Stats grid (Years of Experience 1.5+ in accent & Role Full-Stack with border-t border-white/10)
  4. Interactive rolling letter About Me button with dual flying arrows
  5. Sub-bar with "Scroll to Explore" and "My Short Story"
- Section 3: `SlidingBars.tsx` (scroll-driven intersecting marquees):
  1. Bar 1 (rotate-6, z-20) slides left on scroll
  2. Central photo (z-10) sandwiched between bars with 3D depth
  3. Bar 2 (-rotate-6, z-0) slides right on scroll in opposite direction
  4. Spring physics (useSpring) for smooth organic momentum
- Section 4: `ProfileStory.tsx` includes:
  1. `#animated-line-path` (neon lime SVG line path positioned at z-[30] between photo z-[20] and more-about-me z-[380])
  2. `#first-story-section` (scroll-driven card expansion: expands from 88% floating card to 100% full screen width, border-radius 24px -> 0px)
  3. `.profile-photo` (dedicated scroll trigger: expands from 86% -> 98% width and 0.92 -> 1.0 scale as user scrolls it into view)
  4. `.more-about-me` (z-[380] in front of neon line, 3D word reveal animations, 4+ Years Experience, 30+ Projects Completed)
  5. Services & Expertise section (4 interactive service cards with custom icons and hover glow)

