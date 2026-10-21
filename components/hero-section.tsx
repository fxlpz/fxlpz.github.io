import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"
import { projects } from "@/components/projects-grid"

export function HeroSection() {
  return (
    <section className="hero-surface relative px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="relative z-10 space-y-6 lg:py-10">
          <p className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="h-px w-8 bg-primary" />
            Felipe da Silva Rosa <span className="text-border">/</span> Segurança ofensiva
          </p>

          <h1 className="max-w-2xl font-display text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-balance sm:text-6xl lg:text-[4.5rem]">
            Investigo sistemas.
            <span className="mt-1 block text-primary">Documento o que encontro.</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Pesquisa de segurança, pentest web e ferramentas open-source — documentados com contexto, evidências e caminhos de correção.
          </p>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:gap-4">
            <Link
              href="/blog"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Explorar writeups <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-border px-6 font-medium transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Ver projetos <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <dl className="flex flex-wrap gap-x-8 gap-y-3 border-t border-border/70 pt-5 text-sm text-muted-foreground">
            <div><dt className="sr-only">Writeups publicados</dt><dd><span className="mr-2 font-display text-xl font-semibold text-foreground">{blogPosts.length}</span>investigações</dd></div>
            <div><dt className="sr-only">Projetos open-source</dt><dd><span className="mr-2 font-display text-xl font-semibold text-foreground">{projects.length}</span>ferramentas</dd></div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[440px] lg:ml-auto">
          <div className="absolute -left-8 top-8 hidden h-1/2 w-px bg-primary/70 lg:block" aria-hidden="true" />
          <div className="ascii-terminal group relative overflow-hidden border border-border/70 bg-card/70 shadow-xl shadow-background/30">
            <div className="flex h-10 items-center justify-between border-b border-border/70 px-4 font-mono text-[10px] text-muted-foreground sm:h-11 sm:px-5 sm:text-xs">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />FXLPZ / sessão local</span>
              <span>INVESTIGAÇÃO_01</span>
            </div>
            <div className="ascii-screen relative grid aspect-[1.08/1] place-items-center overflow-hidden px-2 py-4 sm:px-5">
              <pre aria-hidden="true" className="ascii-art relative z-10 m-0 max-w-full overflow-hidden whitespace-pre font-mono text-[clamp(6px,1.65vw,11px)] leading-[1.08] text-foreground/90 sm:text-[11px]">{String.raw`          :::!~!!!!!:.
      .xUHWH!! !!?M88WHX:.
    .X*#M@$!!  !X!M$$$$$$WWx:.
   :!!!!!!?H! :!$!$$$$$$$$$$8X:
  !!~  ~:~!! :~!$!#$$$$$$$$$$8X:'
 :!~::!H!<   ~.U$X!?R$$$$$$$$MM!
 ~!~!!!!~~ .:XW$$$U!!?$$$$$$$MM!
  !:~~~ .:!M"T#$$$$WX??#MRRMMM!
   ~?WuxiW*\`  \`"#$$$$8!!!!??!!!
     M$$$$      \`"T#$T~!8$WUXU~
     ~#$$$m:       ~!~ ?$$$$$$
      ~T$$$$8xx. .xWW- ~""##*"
   !    ~?T#$$@@W@*?$$     /\\
  !!     .:XUW$W!~ \`"~:   :
  !H:   !WM$$$$Ti.: .!WUn+!\`
   ?H.!u "$$$B$$$!W:U!T$$M~
    ?@WTWo("*$$$W$TH$! \`
     ?$$$B$Wu("**$RM!
     ~$$$$$B$$en:\`\`
      ~"#",$$$$M~
        ~'"?*"`}</pre>
              <span className="ascii-scan" aria-hidden="true" />
            </div>
            <div className="flex min-h-10 items-center justify-between gap-3 border-t border-border/70 px-4 font-mono text-[9px] text-muted-foreground sm:min-h-11 sm:px-5 sm:text-[10px]">
              <span><span className="text-primary">root@fxlpz</span>:~# whoami</span>
              <span className="ascii-cursor text-primary">▮</span>
            </div>
          </div>
          <p className="mt-3 flex items-center justify-between gap-4 text-xs text-muted-foreground sm:text-sm">
            <span>Um olhar curioso sobre sistemas e falhas.</span>
            <span className="shrink-0 font-mono text-primary">[ conectado ]</span>
          </p>
        </div>
      </div>
    </section>
  )
}
