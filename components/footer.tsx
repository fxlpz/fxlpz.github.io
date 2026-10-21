import { Github, Twitter, Linkedin, Mail, ExternalLink, Shield, Target } from "lucide-react"

const socialLinks = [
  { label: "GitHub", href: "https://github.com/fxlpz", handle: "@fxlpz", icon: Github },
  { label: "Twitter", href: "https://x.com/FelipeBuffer", handle: "@FelipeBuffer", icon: Twitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/felipe0x01/", handle: "/in/felipe0x01", icon: Linkedin },
  { label: "HackTheBox", href: "https://app.hackthebox.com/users/2483868", handle: "HTB Profile", icon: Shield },
  { label: "TryHackMe", href: "https://tryhackme.com/p/Fxplz", handle: "Fxplz", icon: Target },
  { label: "Email", href: "mailto:felipe.rosa.secdev@gmail.com", handle: "felipe.rosa.secdev@gmail.com", icon: Mail },
]

export function Footer() {
  return (
    <footer id="connect" className="border-t border-border/50 bg-secondary/35 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left column */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="space-y-3">
              <p className="font-mono text-xs text-primary">Contato</p>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-balance">
                {"Vamos construir algo "}
                <span className="text-primary">juntos</span>
              </h2>
            </div>
            <p className="max-w-md text-base sm:text-lg text-muted-foreground leading-relaxed">
              Aberto a colaborações, problemas interessantes e conversas sobre código e segurança.
            </p>

            <div className="pt-2">
              <a
                href="mailto:felipe.rosa.secdev@gmail.com"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-primary px-8 font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
              >
                <span>Enviar uma mensagem</span>
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right column - Links */}
          <div className="space-y-4 animate-fade-in-up stagger-2">
            <p className="font-mono text-xs text-muted-foreground">
              Me encontre também
            </p>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-4 border-b border-border/60 py-4 transition-colors duration-200 active:bg-secondary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
                    <span className="text-sm font-medium transition-colors group-hover:text-primary">
                      {link.label}
                    </span>
                    {link.label !== "Email" && (
                      <ExternalLink className="h-3 w-3 text-muted-foreground/50 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground truncate">{link.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-border/50 pt-7 sm:flex-row">
          <div className="flex items-center gap-2.5 font-mono text-xs text-muted-foreground">
            <span>Feito com cuidado e código</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.slice(0, 3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted-foreground/50 transition-all duration-300 hover:text-primary hover:scale-110"
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <p className="font-mono text-xs text-muted-foreground text-center sm:text-right">
            © {new Date().getFullYear()} FXLPZ · Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
