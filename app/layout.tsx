import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

// Configure fonts with proper options
const geist = Geist({
  subsets: ["latin"],
  variable: '--font-geist',
  display: 'swap',
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono',
  display: 'swap',
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://eindev.ir'),
  title: {
    default: "FXLPZ · Felipe Rosa's Digital Laboratory",
    template: "%s | FXLPZ",
  },
  description:
    "Especialista em segurança ofensiva, pentest web e bug bounty. Experimentos, writeups e projetos open-source por Felipe da Silva Rosa.",
  keywords: ["Segurança da Informação", "Pentest Web", "Bug Bounty", "OWASP", "HackerOne", "Recon", "OSINT", "Python", "Java", "React", "Offensive Security"],
  authors: [{ name: "Felipe da Silva Rosa", url: "https://github.com/fxlpz" }],
  creator: "Felipe da Silva Rosa",
  publisher: "Felipe da Silva Rosa",
  generator: "v0.app",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "FXLPZ · Felipe Rosa's Digital Laboratory",
    description: "Especialista em segurança ofensiva, pentest web e bug bounty. Experimentos, writeups e projetos open-source por Felipe da Silva Rosa.",
    siteName: "FXLPZ",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FXLPZ · Felipe Rosa's Digital Laboratory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FXLPZ · Felipe Rosa's Digital Laboratory",
    description: "Especialista em segurança ofensiva, pentest web e bug bounty. Experimentos, writeups e projetos open-source.",
    creator: "@FelipeBuffer",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden w-full relative">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} storageKey="theme-mode">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
