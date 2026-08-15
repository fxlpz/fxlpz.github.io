"use client"

import { useState, useMemo } from "react"
import { BlogHero } from "@/components/public/blog/blog-hero"
import { BlogList } from "@/components/public/blog/blog-list"
import { BlogSidebar } from "@/components/public/blog/blog-sidebar"
import { blogPosts } from "@/lib/blog-data"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fxlpz.github.io'

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "all" ||
        post.category.toLowerCase().replace(/\s+/g, "-") === activeCategory

      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div>
      <BlogHero />
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <BlogList posts={filteredPosts} />
            <BlogSidebar
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
