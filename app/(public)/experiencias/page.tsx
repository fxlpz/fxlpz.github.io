import { ExperienciasPageContent } from "@/components/public/experiencias/experiencias-page-content";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fxlpz.github.io';

export const metadata: Metadata = {
  title: "Experiências & Certificações",
  description:
    "Trajetória profissional em segurança ofensiva, TI e desenvolvimento. Empresas onde trabalhei, tecnologia e certificações de Pentest, Linux e Cibersegurança.",
  keywords: [
    "experiência profissional",
    "carreira",
    "segurança da informação",
    "pentest",
    "certificações",
    "DCPT",
    "Desec",
    "TryHackMe",
    "HackTheBox",
  ],
  openGraph: {
    title: "Experiências & Certificações · Felipe Rosa",
    description:
      "Trajetória profissional em segurança ofensiva, TI e desenvolvimento. Empresas e certificações.",
    url: `${baseUrl}/experiencias`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image-experiencias.png`,
        width: 1200,
        height: 630,
        alt: "Experiências & Certificações · Felipe Rosa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experiências & Certificações · Felipe Rosa",
    description: "Trajetória profissional em segurança ofensiva, TI e desenvolvimento.",
    images: [`${baseUrl}/og-image-experiencias.png`],
  },
  alternates: {
    canonical: `${baseUrl}/experiencias`,
  },
};

export default function ExperienciasPage() {
  return (
    <div className="pt-24">
      <ExperienciasPageContent />
    </div>
  );
}
