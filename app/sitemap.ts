import type { MetadataRoute } from "next"
import { blogPosts } from "@/lib/blog-data"

export const dynamic = "force-static"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fxlpz.github.io"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/sobre/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/projects/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/experiencias/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog/`, changeFrequency: "daily", priority: 0.9 },
  ]

  const postRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  return [...staticRoutes, ...postRoutes]
}
