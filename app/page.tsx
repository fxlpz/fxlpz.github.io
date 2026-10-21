import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { LatestWriteups } from "@/components/latest-writeups"
import { ProjectsGrid } from "@/components/projects-grid"
import { Footer } from "@/components/footer"
import { generateWebsiteStructuredData, generatePersonStructuredData } from "@/lib/structured-data"

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fxlpz.github.io'
  const websiteStructuredData = generateWebsiteStructuredData(baseUrl)
  const personStructuredData = generatePersonStructuredData()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
      />
      <main className="homepage relative min-h-screen overflow-hidden">
        <div className="relative z-10">
          <Header />
          <HeroSection />
          <LatestWriteups />
          <ProjectsGrid />
          <Footer />
        </div>
      </main>
    </>
  )
}
