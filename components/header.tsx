"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Github, Twitter, Linkedin } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { ThemeChanger } from "./theme-changer"
import Link from "next/link"

const navItems = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Projetos", href: "/projects" },
  { label: "Experiências", href: "/experiencias" },
  { label: "Blog", href: "/blog" },
]

const socialLinks = [
  { label: "GitHub", href: "https://github.com/fxlpz", icon: Github },
  { label: "Twitter", href: "https://x.com/FelipeBuffer", icon: Twitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/felipe0x01/", icon: Linkedin },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-sm" : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4">
        <nav aria-label="Navegação principal" className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-md border border-primary/50 bg-primary/10 font-mono text-sm font-semibold text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
              <span>F</span>
            </div>
            <span className="font-display text-sm font-semibold tracking-tight">
              FXLPZ
              <span className="text-primary font-semibold">
                .SEC
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "border-b-2 px-3 py-2.5 text-sm transition-colors duration-200",
                  isActive(item.href)
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="ml-3 flex items-center gap-1 border-l border-border/70 pl-3">
              <ThemeChanger />
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-1 lg:flex">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all duration-300 hover:text-primary hover:bg-primary/10"
                >
                  <link.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-card border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-bottom-9 pointer-events-none shadow-lg">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/50 lg:hidden transition-colors hover:bg-secondary"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span
                  className={cn(
                    "h-0.5 bg-foreground transition-all duration-300 origin-center",
                    isMobileMenuOpen ? "w-5 translate-y-2 rotate-45" : "w-5",
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-3.5 bg-foreground transition-all duration-300",
                    isMobileMenuOpen && "opacity-0 translate-x-2",
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 bg-foreground transition-all duration-300 origin-center",
                    isMobileMenuOpen ? "w-5 -translate-y-2 -rotate-45" : "w-5",
                  )}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          id="mobile-navigation"
          className={cn(
            "transition-all duration-400 ease-in-out lg:hidden bg-background overflow-hidden",
            isMobileMenuOpen ? "max-h-[100vh] opacity-100 pt-4 pb-6" : "max-h-0 opacity-0 pointer-events-none",
          )}
        >
          <nav aria-label="Navegação móvel" className="flex flex-col gap-1 border-t border-border/50 pt-4">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3.5 text-sm text-muted-foreground transition-all duration-200 active:bg-secondary hover:text-foreground hover:bg-secondary/50"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-primary">{">"}</span>
                {item.label}
              </Link>
            ))}

            <div className="mt-4 flex items-center gap-2 border-t border-border/50 pt-4 px-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors active:bg-secondary hover:border-primary/50 hover:text-primary hover:bg-primary/10"
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/50">
                <ThemeChanger />
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/50">
                <ThemeToggle />
              </div>
            </div>

          </nav>
        </div>
      </div>
    </header>
  )
}
