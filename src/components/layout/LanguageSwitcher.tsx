'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { locales, localeNames, stripLocale, type Locale } from '@/lib/i18n'
import { useLocale } from '@/context/LocaleContext'

export default function LanguageSwitcher({ lightHeader }: { lightHeader: boolean }) {
  const { locale } = useLocale()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { path } = stripLocale(pathname)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition',
          lightHeader
            ? 'text-neutral-700 hover:bg-neutral-100'
            : 'text-white/90 hover:bg-white/10',
        )}
        aria-label="Language"
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{locale}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 transition', open && 'rotate-180')} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <ul className="absolute right-0 top-full z-50 mt-2 min-w-[140px] overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 shadow-xl">
            {locales.map((loc) => (
              <li key={loc}>
                <Link
                  href={loc === 'tr' && path === '/' ? '/tr' : `/${loc}${path === '/' ? '' : path}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block px-4 py-2 text-sm transition hover:bg-neutral-50',
                    loc === locale ? 'font-semibold text-brand-600' : 'text-neutral-700',
                  )}
                >
                  {localeNames[loc as Locale]}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
