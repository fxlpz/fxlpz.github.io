import { ProjectsPageContent } from "@/components/public/projects/projects-page-content";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fxlpz.github.io';

export const metadata: Metadata = {
  title: "Projetos",
  description: "Explore ferramentas open-source, experimentos e projetos de segurança e desenvolvimento.",
  keywords: ["código aberto", "projetos", "segurança", "desenvolvimento", "experimentos"],
  openGraph: {
    title: "Projetos · FXLPZ",
    description: "Ferramentas open-source, experimentos e projetos de segurança e desenvolvimento.",
    url: `${baseUrl}/projects`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image-projects.png`,
        width: 1200,
        height: 630,
        alt: "FXLPZ Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projetos · FXLPZ",
    description: "Ferramentas open-source, experimentos e projetos de segurança e desenvolvimento.",
    images: [`${baseUrl}/og-image-projects.png`],
  },
  alternates: {
    canonical: `${baseUrl}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      <ProjectsPageContent />
    </div>
  );
}
