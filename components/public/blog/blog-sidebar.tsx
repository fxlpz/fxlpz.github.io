"use client"

import React, { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Mail, Rss, Search, Tag, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/lib/blog-data"

interface BlogSidebarProps {
  activeCategory: string
  onCategoryChange: (slug: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function BlogSidebar({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: BlogSidebarProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Compute dynamic categories from blogPosts
  const categoryMap = new Map<string, number>()
  blogPosts.forEach((post) => {
    categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1)
  })

  const categories = [
    { name: "All Posts", count: blogPosts.length, slug: "all" },
    ...Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    })),
  ]

  // Compute popular tags dynamically
  const tagCounts = new Map<string, number>()
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })

  const popularTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sidebarRef.current) {
      observer.observe(sidebarRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <aside ref={sidebarRef} className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      {/* Search */}
      <div className={cn("opacity-0", isVisible && "animate-fade-in-up")}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar artigos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-card/40 border-border/50 focus:border-primary/50 text-xs"
          />
        </div>
      </div>

      {/* Categories */}
      <div className={cn("opacity-0", isVisible && "animate-fade-in-up stagger-1")}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Categorias</h3>
        </div>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => onCategoryChange(category.slug)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-mono transition-all duration-300",
                activeCategory === category.slug
                  ? "bg-primary/10 text-primary border border-primary/30 font-semibold"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground border border-transparent",
              )}
            >
              <span>{category.name}</span>
              <span className="rounded-md bg-secondary/60 px-2 py-0.5 text-[10px] text-muted-foreground">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className={cn("opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
        <div className="flex items-center gap-2 mb-4">
          <Tag className="h-4 w-4 text-primary" />
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Tags Principais</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSearchChange(tag)}
              className="rounded-lg border border-border/50 bg-card/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div
        className={cn(
          "rounded-xl border border-border/50 bg-card/40 glass p-5 opacity-0",
          isVisible && "animate-fade-in-up stagger-3",
        )}
      >
        <div className="flex items-center gap-2 mb-2">
          <Mail className="h-4 w-4 text-primary" />
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Newsletter</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
          Receba notificações sobre novos writeups de CTF e artigos de pentest.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
          className="space-y-2.5"
        >
          <Input
            type="email"
            placeholder="seu.email@exemplo.com"
            className="bg-background/50 border-border/50 focus:border-primary/50 text-xs h-9"
          />
          <Button type="submit" className="w-full font-mono text-xs uppercase tracking-wider h-9">
            Inscrever-se
          </Button>
        </form>
      </div>

      {/* RSS Feed */}
      <div className={cn("opacity-0", isVisible && "animate-fade-in-up stagger-4")}>
        <a
          href="/rss.xml"
          className="flex items-center justify-center gap-2 rounded-lg border border-border/50 bg-card/40 px-4 py-2.5 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
        >
          <Rss className="h-4 w-4" />
          <span>Feed RSS</span>
        </a>
      </div>
    </aside>
  )
}
