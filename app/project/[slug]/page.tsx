import React from "react";
import type { Metadata } from "next";
import CurveEntrance from "@/components/ui/CurveEntrance";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectBanner from "@/components/project/ProjectBanner";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectScrollThemeTransition from "@/components/project/ProjectScrollThemeTransition";
import { projectsData, getProjectBySlug } from "@/lib/projects-data";

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return {
    title: `${project.title} | Safwan Khan`,
    description: `${project.title} - ${project.subtitle}. ${project.description}.`,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return (
    <main className="min-h-screen w-full relative bg-main flex flex-col justify-between">
      <CurveEntrance text="work" />
      <ProjectScrollThemeTransition />
      <div className="projectPage overflow-hidden relative z-10">
        <Navbar />
        <ProjectHero project={project} />
        <ProjectBanner project={project} />
        <ProjectOverview project={project} />
      </div>
      <Footer />
    </main>
  );
}
