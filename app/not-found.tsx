import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center px-4 py-16 sm:px-6">
      <div className="mx-auto w-full max-w-4xl border-y border-border py-10 sm:py-14">
        <div className="grid gap-8 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-12">
          <p className="text-6xl font-semibold tracking-tight text-primary sm:text-7xl">404</p>
          <div>
            <p className="mb-3 text-sm font-medium text-primary">Página não encontrada</p>
            <h1 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">Este endereço não está disponível</h1>
            <p className="max-w-2xl leading-relaxed text-muted-foreground">
              A página que você procura não existe ou foi movida. Escolha um destes caminhos para continuar.
            </p>
            <nav aria-label="Páginas principais" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5">
              <Link href="/" className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Início</Link>
              <Link href="/blog" className="text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Blog</Link>
              <Link href="/projects" className="text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Projetos</Link>
            </nav>
          </div>
        </div>
      </div>
    </main>
  )
}
