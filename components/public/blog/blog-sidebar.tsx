"use client"

import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
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
  const categoryMap = new Map<string, number>()
  blogPosts.forEach((post) => {
    categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1)
  })

  const categories = [
    { name: "Todas", count: blogPosts.length, slug: "all" },
    ...Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    })),
  ]

  const tagCounts = new Map<string, number>()
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })

  const popularTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([tag]) => tag)

  return (
    <aside className="space-y-9 lg:sticky lg:top-28 lg:self-start">
      <div className="border-b border-border/60 pb-7">
        <label htmlFor="blog-search" className="mb-3 block font-display text-lg font-semibold">Buscar no caderno</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="blog-search"
            type="search"
            aria-label="Buscar artigos"
            placeholder="Título, tema ou palavra-chave"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border-border/60 bg-transparent pl-10 text-sm focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="border-b border-border/60 pb-7">
        <h2 className="mb-4 font-display text-lg font-semibold">Categorias</h2>
        <ul className="divide-y divide-border/40 border-y border-border/40">
          {categories.map((category) => (
            <li key={category.slug}>
              <button
                type="button"
                aria-pressed={activeCategory === category.slug}
                onClick={() => onCategoryChange(category.slug)}
                className={cn(
                  "flex w-full items-center justify-between py-2.5 text-left text-sm transition-colors focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  activeCategory === category.slug
                    ? "font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span>{category.name}</span>
                <span className="text-xs tabular-nums text-muted-foreground">{category.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-4 font-display text-lg font-semibold">Temas recorrentes</h2>
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm">
          {popularTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onSearchChange(tag)}
              className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
