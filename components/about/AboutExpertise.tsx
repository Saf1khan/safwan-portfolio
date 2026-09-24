"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

interface ExpertiseItem {
  number: string;
  title: string;
  description: string;
}

const expertiseData: ExpertiseItem[] = [
  {
    number: "01",
    title: "Full-Stack Architecture",
    description:
      "I architect end-to-end solutions using modern tech stacks—from Node.js backends with PostgreSQL/MongoDB to React and Next.js frontends. Whether building multi-tenant SaaS platforms, real-time dashboards with WebSockets, or RESTful APIs with tRPC, I ensure type-safe, scalable architecture that supports rapid growth and seamless deployment.",
  },
  {
    number: "02",
    title: "AI & Advanced Integration",
    description:
      "I specialize in integrating AI capabilities that deliver real value—implementing RAG systems with vector embeddings, building LangChain workflows, and connecting OpenAI APIs for intelligent automation. Beyond AI, I excel at complex integrations: Stripe/PayPal payment processing, Auth0 authentication, real-time Firebase notifications, and third-party API orchestration that powers sophisticated business logic.",
  },
  {
    number: "03",
    title: "3D & Interactive Experiences",
    description:
      "I create immersive web experiences using Three.js, React Three Fiber, and advanced techniques like Gaussian Splatting. From interactive 3D virtual tours to shader-based animations with GSAP, I transform standard websites into engaging, memorable digital experiences. I optimize WebGL performance for cross-device compatibility while maintaining stunning visual fidelity that makes brands stand out.",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export default function AboutExpertise() {
  return (
    <div className="pt-[3rem] md:pt-[10rem] text-gray-800 md:px-[2rem] px-[1rem] grid md:grid-cols-3 grid-cols-1 flex-col gap-[2rem] lg:gap-[8rem]">
      {expertiseData.map((item, index) => (
          <motion.div
            key={item.number}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="font-cabinetGrotesk flex flex-col gap-3 group"
          >
            {/* Number with expanding divider line */}
            <div className="flex gap-1 flex-col">
              <span className="text-sm md:text-base font-mono text-gray-400 font-medium">
                {item.number}
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                style={{ transformOrigin: "left center" }}
                className="w-full h-[1px] bg-gray-300"
              />
            </div>

            {/* Title */}
            <h3 className="md:text-[1.5rem] text-[1.3rem] text-nowrap font-cabinetGrotesk font-semibold text-black group-hover:text-sec transition-colors">
              {item.title}
            </h3>

            {/* Description */}
            <p className="lg:text-base xl:text-lg text-gray-600 leading-relaxed font-cabinetGrotesk">
              {item.description}
            </p>
          </motion.div>
        ))}
    </div>
  );
}
