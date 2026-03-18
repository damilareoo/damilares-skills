import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Damilares Skills',
  description: 'Collection of specialized AI skills for Claude Code',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
