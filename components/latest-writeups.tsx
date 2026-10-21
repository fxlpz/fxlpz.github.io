import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { blogPosts } from "@/lib/blog-data"

const latestPosts = [...blogPosts]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3)

export function LatestWriteups() {
  return (
    <section id="writeups" className="px-4 py-14 sm:px-6 sm:py-20 border-t border-border/50">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 flex items-center gap-2 font-mono text-xs text-primary">
              <span aria-hidden="true" className="text-muted-foreground">[&gt;_]</span>
              Caderno de campo
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Writeups recentes</h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex shrink-0 items-center gap-2 border-b border-primary/50 pb-1 text-sm text-foreground transition-colors hover:text-primary"
          >
            <span>Ver todas as investigações</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="border-t border-border/50">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group grid gap-3 border-b border-border/50 py-6 transition-colors sm:grid-cols-[130px_1fr_auto] sm:items-center sm:gap-8 sm:py-7"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground sm:flex-col sm:items-start sm:gap-1">
                <span>{format(new Date(post.date), "d MMM yyyy", { locale: ptBR })}</span>
                <span className="hidden h-px w-5 bg-border sm:block" />
                <span className="text-primary">{post.category}</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-medium leading-snug transition-colors group-hover:text-primary sm:text-xl">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              </div>
              <ArrowRight className="hidden h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary sm:block" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
