'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, FileText, Layers, Settings, LogOut, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/admin', label: 'Genel Bakış', icon: LayoutDashboard },
  { href: '/admin/sayfalar', label: 'Sayfalar', icon: FileText },
  { href: '/admin/bolumler', label: 'Bölümler', icon: Layers },
  { href: '/admin/ayarlar', label: 'Ayarlar', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/admin/giris')
    router.refresh()
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-neutral-200 bg-neutral-950 text-neutral-300">
      <div className="border-b border-neutral-800 p-6">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            M
          </span>
          <div>
            <p className="font-bold text-white">Mamon Admin</p>
            <p className="text-xs text-neutral-500">İçerik Yönetimi</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {nav.map((item) => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition',
                active ? 'bg-brand-600 text-white' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white',
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-1 border-t border-neutral-800 p-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-400 hover:bg-neutral-900 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          Siteyi Görüntüle
        </a>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-400 hover:bg-neutral-900 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Çıkış
        </button>
      </div>
    </aside>
  )
}
