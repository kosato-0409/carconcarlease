import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'カーリース契約者向けマイページ',
  description: 'カーリース契約者のためのマイページアプリケーション',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        {/* LIFF SDK の読み込み */}
        <Script
          src="https://static.line-scdn.net/liff/edge/2.23/sdk.js"
          strategy="afterInteractive"
        />
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6 pb-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

