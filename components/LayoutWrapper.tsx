'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import AdminLayout from './AdminLayout'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <AdminLayout>{children}</AdminLayout>
  }

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 pb-24">
        {children}
      </main>
      <Footer />
    </>
  )
}

