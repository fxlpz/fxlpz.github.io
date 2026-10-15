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
    { name: "Todos", count: blogPosts.length, slug: "all" },
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
    <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          type="search"
          aria-label="Buscar artigos"
          placeholder="Buscar artigos"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-transparent border-border/60 text-sm"
        />
      </div>

      <div>
        <h2 className="mb-4 font-display text-lg font-semibold">Categorias</h2>
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category.slug}>
              <button
                type="button"
                aria-pressed={activeCategory === category.slug}
                onClick={() => onCategoryChange(category.slug)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                  activeCategory === category.slug
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                )}
              >
                <span>{category.name}</span>
                <span className="font-mono text-xs">{category.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-4 font-display text-lg font-semibold">Tags</h2>
        <div className="flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs">
          {popularTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onSearchChange(tag)}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
