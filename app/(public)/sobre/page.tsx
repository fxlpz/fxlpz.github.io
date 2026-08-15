import { SobrePageContent } from "@/components/public/sobre/sobre-page-content";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fxlpz.github.io';

export const metadata: Metadata = {
  title: "Sobre o Analista",
  description:
    "Conheça mais sobre Felipe da Silva Rosa, especialista em segurança ofensiva. Histórico, diferenciais em AppSec, estatísticas e habilidades técnicas.",
  keywords: [
    "Felipe da Silva Rosa",
    "sobre mim",
    "analista de segurança",
    "offensive security",
    "perfil profissional",
    "bug bounty",
  ],
  openGraph: {
    title: "Sobre o Analista · Felipe Rosa",
    description:
      "Conheça a trajetória e o arsenal técnico de Felipe da Silva Rosa em cibersegurança.",
    url: `${baseUrl}/sobre`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image-sobre.png`,
        width: 1200,
        height: 630,
        alt: "Sobre o Analista · Felipe Rosa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre o Analista · Felipe Rosa",
    description: "Conheça a trajetória de Felipe da Silva Rosa em cibersegurança.",
    images: [`${baseUrl}/og-image-sobre.png`],
  },
  alternates: {
    canonical: `${baseUrl}/sobre`,
  },
};

export default function SobrePage() {
  return (
    <div className="pt-24">
      <SobrePageContent />
    </div>
  );
}
