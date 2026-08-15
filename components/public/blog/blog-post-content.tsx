"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowLeft, Calendar, Clock, Bookmark, Twitter, Linkedin, Link2, ChevronUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BlogPost, getRelatedPosts } from "@/lib/blog-data"

interface BlogPostContentProps {
  post: BlogPost
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [copied, setCopied] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const relatedPosts = getRelatedPosts(post.slug)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    // Dynamic copy button injection for code blocks
    const timer = setTimeout(() => {
      const pres = contentRef.current?.querySelectorAll("pre")
      pres?.forEach((pre) => {
        if (pre.querySelector(".copy-btn")) return

        pre.style.position = "relative"
        const btn = document.createElement("button")
        btn.className = "copy-btn absolute bottom-3 right-3 px-2 py-1 font-mono text-[10px] rounded border border-border bg-card/80 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 select-none opacity-0 group-hover:opacity-100"
        btn.innerText = "copy"
        btn.onclick = () => {
          const code = pre.querySelector("code")?.innerText || ""
          navigator.clipboard.writeText(code)
          btn.innerText = "copied!"
          btn.style.color = "var(--primary)"
          setTimeout(() => {
            btn.innerText = "copy"
            btn.style.color = ""
          }, 2000)
        }
        pre.appendChild(btn)
      })
    }, 100)

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-16 border-b border-border/30">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30 pointer-events-none", post.color)} />
        <div className="mx-auto max-w-4xl relative z-10">
          {/* Back Link */}
          <Link
            href="/blog"
            className={cn(
              "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group opacity-0",
              isVisible && "animate-fade-in-up",
            )}
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-mono">back to blog</span>
          </Link>

          {/* Category & Meta */}
          <div
            className={cn("flex flex-wrap items-center gap-3 mb-6 opacity-0", isVisible && "animate-fade-in-up")}
            style={{ animationDelay: "100ms" }}
          >
            <span className="rounded-lg border border-primary/50 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary uppercase tracking-wider">
              {post.category}
            </span>
            {post.featured && (
              <span className="rounded-lg border border-amber-500/50 bg-amber-500/10 px-3 py-1.5 font-mono text-xs text-amber-400">
                featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 opacity-0",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "150ms" }}
          >
            <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">{post.title}</span>
          </h1>

          {/* Excerpt */}
          <p
            className={cn(
              "text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 opacity-0",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "200ms" }}
          >
            {post.excerpt}
          </p>

          {/* Author & Meta Row */}
          <div
            className={cn(
              "flex flex-wrap items-center justify-between gap-6 opacity-0",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "250ms" }}
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-border">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback className="bg-secondary font-mono">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div
            className={cn("flex flex-wrap gap-2 mt-6 opacity-0", isVisible && "animate-fade-in-up")}
            style={{ animationDelay: "300ms" }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-secondary/60 border border-border/50 px-3 py-1 font-mono text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 overflow-hidden w-full">
        <div className="mx-auto max-w-4xl w-full">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] w-full min-w-0">
            {/* Main Content */}
            <article
              ref={contentRef}
              className={cn(
                "prose prose-invert prose-lg max-w-full w-full min-w-0 overflow-hidden opacity-0",
                "prose-headings:font-semibold prose-headings:tracking-tight",
                "prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-gradient",
                "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3",
                "prose-p:text-muted-foreground prose-p:leading-relaxed",
                "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
                "prose-strong:text-foreground prose-strong:font-semibold",
                "prose-code:text-primary prose-code:bg-secondary/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
                "prose-pre:bg-card/80 prose-pre:border prose-pre:border-border/50 prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto",
                "prose-ul:text-muted-foreground prose-ol:text-muted-foreground",
                "prose-li:marker:text-primary",
                "prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:italic",
                isVisible && "animate-fade-in-up",
              )}
              style={{ animationDelay: "350ms" }}
              dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
            />

            {/* Sticky Share Sidebar */}
            <aside
              className={cn("hidden lg:block opacity-0", isVisible && "animate-fade-in-up")}
              style={{ animationDelay: "400ms" }}
            >
              <div className="sticky top-32 flex flex-col gap-3">
                <span className="font-mono text-xs text-muted-foreground mb-2 text-center">share</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/10 bg-transparent"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,
                      "_blank",
                    )
                  }
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/10 bg-transparent"
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">Share on LinkedIn</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-10 w-10 rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/10",
                    copied && "border-primary/50 bg-primary/10",
                  )}
                  onClick={handleCopyLink}
                >
                  <Link2 className="h-4 w-4" />
                  <span className="sr-only">Copy link</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/10 bg-transparent"
                >
                  <Bookmark className="h-4 w-4" />
                  <span className="sr-only">Bookmark</span>
                </Button>
              </div>
            </aside>
          </div>

          {/* Mobile Share Bar */}
          <div
            className={cn(
              "lg:hidden flex items-center justify-center gap-4 mt-12 pt-8 border-t border-border/30 opacity-0",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "450ms" }}
          >
            <span className="font-mono text-xs text-muted-foreground">share:</span>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg border-border/50 bg-transparent"
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,
                  "_blank",
                )
              }
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg border-border/50 bg-transparent"
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                  "_blank",
                )
              }
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn("h-9 w-9 rounded-lg border-border/50", copied && "border-primary/50 bg-primary/10")}
              onClick={handleCopyLink}
            >
              <Link2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-border/50 bg-transparent">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <span className="inline-block rounded-lg border border-border bg-secondary/50 px-3 py-1.5 font-mono text-xs tracking-wider text-muted-foreground mb-4">
                [RELATED_POSTS]
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Continue <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">Reading</span>
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost, index) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border border-border bg-card/40 glass p-5 transition-all duration-300 hover:border-primary/40 hover:bg-card/60 hover-lift opacity-0",
                    isVisible && "animate-fade-in-up",
                  )}
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      relatedPost.color,
                    )}
                  />
                  <div className="relative z-10">
                    <span className="inline-block rounded-md bg-secondary/60 px-2 py-1 font-mono text-[10px] text-muted-foreground mb-3">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-gradient transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{relatedPost.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{relatedPost.date}</span>
                      <span className="text-border">•</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full border border-border bg-card/90 glass backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:border-primary/50 hover:bg-card",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        )}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </>
  )
}

// Markdown parser · supports: headers, bold, italic, inline code, fenced code blocks,
// unordered/ordered lists, blockquotes, horizontal rules, tables, checkboxes
function parseMarkdown(content: string): string {
  // 1. Escape HTML to avoid XSS from raw content
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

  // 2. Extract and protect fenced code blocks (replace with placeholders)
  const codeBlocks: string[] = []
  let s = content.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, lang, code) => {
    const escaped = escape(code)
    const langAttr = lang ? ` class="language-${lang}"` : ""
    const langName = lang ? lang : 'code'
    codeBlocks.push(`<pre data-lang="${langName}"><code${langAttr}>${escaped}</code></pre>`)
    return `\x00CODE${codeBlocks.length - 1}\x00`
  })

  // 3. Inline transforms (applied line-by-line or globally, order matters)
  const inlineTransform = (line: string): string =>
    line
      // Checkbox items
      .replace(/\[x\]/gi, '<span class="inline-flex items-center gap-1 font-mono text-primary">[x]</span>')
      .replace(/\[ \]/g, '<span class="inline-flex items-center gap-1 font-mono text-muted-foreground">[ ]</span>')
      // Bold+italic
      .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Inline code (after code block extraction)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<figure><img src="$2" alt="$1" loading="lazy" /><figcaption>$1</figcaption></figure>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  // 4. Process line by line into blocks
  const lines = s.split("\n")
  const out: string[] = []
  let i = 0

  while (i < lines.length) {
    const raw = lines[i]

    // Horizontal rule
    if (/^---+$/.test(raw.trim())) {
      out.push('<hr class="border-border/40 my-8" />')
      i++
      continue
    }

    // Code block placeholder
    if (/^\x00CODE\d+\x00$/.test(raw.trim())) {
      const idx = parseInt(raw.trim().replace(/\x00CODE(\d+)\x00/, "$1"))
      out.push(codeBlocks[idx])
      i++
      continue
    }

    // ATX headers
    const hMatch = raw.match(/^(#{1,4}) (.+)$/)
    if (hMatch) {
      const level = hMatch[1].length
      const text = inlineTransform(hMatch[2])
      out.push(`<h${level}>${text}</h${level}>`)
      i++
      continue
    }

    // Blockquote
    if (raw.startsWith("> ")) {
      const bqLines: string[] = []
      while (i < lines.length && lines[i].startsWith("> ")) {
        bqLines.push(inlineTransform(lines[i].slice(2)))
        i++
      }
      out.push(`<blockquote><p>${bqLines.join(" ")}</p></blockquote>`)
      continue
    }

    // Table (line starting with |)
    if (raw.startsWith("|")) {
      const tableRows: string[] = []
      let isHeader = true
      while (i < lines.length && lines[i].startsWith("|")) {
        const row = lines[i]
        i++
        // separator row (e.g. |---|---|)
        if (/^\|[-| :]+\|$/.test(row.trim())) {
          isHeader = false
          continue
        }
        const cells = row
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim())
        if (isHeader) {
          tableRows.push(
            `<thead><tr>${cells.map((c) => `<th>${inlineTransform(c)}</th>`).join("")}</tr></thead>`
          )
        } else {
          tableRows.push(`<tr>${cells.map((c) => `<td>${inlineTransform(c)}</td>`).join("")}</tr>`)
        }
      }
      // wrap non-thead rows in tbody
      const thead = tableRows.filter((r) => r.startsWith("<thead"))
      const tbodyRows = tableRows.filter((r) => !r.startsWith("<thead"))
      out.push(
        `<div class="overflow-x-auto my-6"><table>${thead.join("")}${tbodyRows.length ? `<tbody>${tbodyRows.join("")}</tbody>` : ""}</table></div>`
      )
      continue
    }

    // Unordered list
    if (/^- /.test(raw) || /^\* /.test(raw)) {
      const items: string[] = []
      while (i < lines.length && (/^- /.test(lines[i]) || /^\* /.test(lines[i]))) {
        items.push(`<li>${inlineTransform(lines[i].replace(/^[-*] /, ""))}</li>`)
        i++
      }
      out.push(`<ul>${items.join("")}</ul>`)
      continue
    }

    // Ordered list
    if (/^\d+\. /.test(raw)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(`<li>${inlineTransform(lines[i].replace(/^\d+\. /, ""))}</li>`)
        i++
      }
      out.push(`<ol>${items.join("")}</ol>`)
      continue
    }

    // Empty line · skip (paragraph breaks handled below)
    if (raw.trim() === "") {
      i++
      continue
    }

    // Inline code placeholder passthrough
    if (/\x00CODE\d+\x00/.test(raw)) {
      out.push(raw)
      i++
      continue
    }

    // Regular paragraph · collect consecutive non-special lines
    const paraLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("> ") &&
      !lines[i].startsWith("|") &&
      !/^- /.test(lines[i]) &&
      !/^\* /.test(lines[i]) &&
      !/^\d+\. /.test(lines[i]) &&
      !/^---+$/.test(lines[i].trim()) &&
      !/^\x00CODE\d+\x00$/.test(lines[i].trim())
    ) {
      paraLines.push(inlineTransform(lines[i]))
      i++
    }
    if (paraLines.length) {
      out.push(`<p>${paraLines.join(" ")}</p>`)
    }
  }

  return out.join("\n")
}
