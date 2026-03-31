import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Reselfed Leadership Identity Assessment',
  description: 'Discover how others perceive you based on your actions, beliefs, and behaviors in professional settings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
