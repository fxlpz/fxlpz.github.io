'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16">
      <main className="mx-auto min-h-[70vh] max-w-4xl px-4 py-16 sm:px-6">
        <div className="border-y border-border py-10 sm:py-14">
          <div className="grid gap-8 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-12">
            <p className="text-sm font-medium text-destructive">Erro</p>
            <div>
              <h1 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">Não foi possível carregar a página</h1>
              <p className="max-w-2xl leading-relaxed text-muted-foreground">
                Ocorreu um erro inesperado. Tente novamente ou volte ao início.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-5">
                <button
                  onClick={reset}
                  className="border border-primary bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Tentar novamente
                </button>
                <Link
                  href="/"
                  className="border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Voltar ao início
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
