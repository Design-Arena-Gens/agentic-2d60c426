import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI3D - Yapay Zeka Öğrenimini Görselleştir',
  description: '3D görselleştirme ile yapay zeka kavramlarını somut ve anlaşılır şekilde öğrenin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
