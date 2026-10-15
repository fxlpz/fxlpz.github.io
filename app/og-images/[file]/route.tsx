import { ImageResponse } from "next/og"
import { blogPosts } from "@/lib/blog-data"

export const dynamic = "force-static"

const SLUG_RE = /^[a-z0-9-]+$/

export function generateStaticParams() {
  return blogPosts.map((post) => ({ file: `${post.slug}.png` }))
}

export async function GET(_req: Request, ctx: { params: Promise<{ file: string }> }) {
  const { file } = await ctx.params
  const slug = file.replace(/\.png$/, "")

  if (!SLUG_RE.test(slug)) {
    return new Response("Not found", { status: 404 })
  }

  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) {
    return new Response("Not found", { status: 404 })
  }

  const title = post.title

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0a0a12",
          backgroundImage:
            "linear-gradient(135deg, rgba(45,212,191,0.14) 0%, rgba(10,10,18,0) 50%), linear-gradient(315deg, rgba(45,212,191,0.09) 0%, rgba(10,10,18,0) 50%)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                backgroundColor: "#2dd4bf",
                boxShadow: "0 0 24px rgba(45,212,191,0.8)",
              }}
            />
            <div style={{ fontSize: 30, color: "#e6e6f0", fontWeight: 700 }}>FXLPZ</div>
            <div style={{ fontSize: 26, color: "#71718a" }}>· digital laboratory</div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 24px",
              borderRadius: 12,
              border: "1px solid rgba(45,212,191,0.5)",
              backgroundColor: "rgba(45,212,191,0.1)",
              fontSize: 24,
              color: "#2dd4bf",
            }}
          >
            {post.category}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 54 : 64,
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#ffffff",
            maxWidth: 1050,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 999,
                backgroundColor: "rgba(45,212,191,0.15)",
                border: "2px solid rgba(45,212,191,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "#2dd4bf",
                fontWeight: 700,
              }}
            >
              FR
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 26, color: "#e6e6f0", fontWeight: 600 }}>{post.author.name}</div>
              <div style={{ fontSize: 22, color: "#71718a" }}>Offensive Security Specialist</div>
            </div>
          </div>
          <div style={{ fontSize: 24, color: "#71718a" }}>fxlpz.github.io</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
