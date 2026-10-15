"use client"

import Link from "next/link"
import { ArrowUpRight, Clock } from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"

interface BlogListProps {
  posts: BlogPost[]
}

export function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <p className="border-t border-border/50 py-12 font-mono text-sm text-muted-foreground">
        Nenhum artigo encontrado com esse filtro.
      </p>
    )
  }

  return (
    <div className="border-t border-border/50">
      {posts.map((post) => (
        <article key={post.id} className="group border-b border-border/50 py-7 sm:py-9">
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
            <span className="text-primary/90">{post.category}</span>
            <span>{post.date}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readTime}
            </span>
            {post.featured && <span className="text-foreground">Destaque</span>}
          </div>

          <h2 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-gradient sm:text-2xl">
            <Link href={`/blog/${post.slug}`} className="focus-visible:outline-2 focus-visible:outline-primary">
              {post.title}
            </Link>
          </h2>
          <p className="mt-3 max-w-3xl text-sm sm:text-base leading-relaxed text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
              {post.tags.slice(0, 5).map((tag) => <span key={tag}>#{tag}</span>)}
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex shrink-0 items-center gap-1.5 text-sm text-foreground transition-colors hover:text-primary"
            >
              Ler artigo
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
