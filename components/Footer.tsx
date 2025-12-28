'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'ホーム', icon: '🏠' },
    { href: '/reservation', label: '予約', icon: '📅' },
    { href: '/settings', label: '設定', icon: '⚙️' },
  ]

  return (
    <>
      <footer className="bg-white border-t border-gray-200 safe-bottom">
        <div className="container mx-auto px-4 py-4">
          {/* ナビゲーション */}
          <nav className="flex justify-around mb-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-lg transition-colors ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* プライバシーポリシーと利用規約 */}
          <div className="flex justify-center space-x-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
            <Link
              href="/privacy-policy"
              className="hover:text-primary-600 transition-colors"
            >
              プライバシーポリシー
            </Link>
            <span>|</span>
            <Link
              href="/terms"
              className="hover:text-primary-600 transition-colors"
            >
              利用規約
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}

