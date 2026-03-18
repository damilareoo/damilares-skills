import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'damilares-skills — Expert Modes for AI Coding',
  description: 'Turn your AI into a specialist. 57 opinionated skills that give Claude Code (or any AI agent) specific modes of expertise.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
