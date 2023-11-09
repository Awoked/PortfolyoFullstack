import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Alper Koşay',
  description: 'Kişisel portfolyo websitem.',
  keywords: ["Alper Koşay", "Web Developer", "React Developer"],
  authors: {
    name: "Alper Koşay",
  }
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
