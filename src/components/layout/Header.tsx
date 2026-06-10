'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'
import { useLocale } from '@/context/LocaleContext'
import { stripLocale } from '@/lib/i18n'
import type { SiteContent } from '@/types/content'

const HEADER_HEIGHT = 80

export default function Header({ content }: { content: SiteContent }) {
  const pathname = usePathname()
  const { locale, ui, lp } = useLocale()
  const { path: pathWithoutLocale } = stripLocale(pathname)
  const [open, setOpen] = useState(false)
  const [lightHeader, setLightHeader] = useState(false)

  useEffect(() => {
    const updateHeader = () => {
      const hero = document.getElementById('page-hero')
      if (!hero) {
        setLightHeader(true)
        return
      }
      setLightHeader(hero.getBoundingClientRect().bottom <= HEADER_HEIGHT)
    }

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    window.addEventListener('resize', updateHeader)
    return () => {
      window.removeEventListener('scroll', updateHeader)
      window.removeEventListener('resize', updateHeader)
    }
  }, [pathname])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    const normalized = href === '/' ? '/' : href
    return (
      pathWithoutLocale === normalized ||
      (normalized !== '/' && pathWithoutLocale.startsWith(normalized))
    )
  }

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        lightHeader
          ? 'border-b border-neutral-200/80 bg-white/95 shadow-md shadow-neutral-900/5 backdrop-blur-xl'
          : 'bg-neutral-950/30 backdrop-blur-md',
      )}
    >
      <div className="container-mamon flex h-16 items-center justify-between md:h-20">
        <Link href={lp('/')} className="group flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-neutral-900 text-sm font-bold text-white transition-all duration-300 group-hover:rounded-2xl group-hover:bg-brand-600">
            <span className="relative z-10">M</span>
            <span className="absolute inset-0 bg-gradient-to-br from-brand-600 to-brand-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </span>
          <div className="leading-tight">
            <span
              className={cn(
                'block text-lg font-bold tracking-tight transition-colors duration-300',
                lightHeader ? 'text-neutral-900' : 'text-white',
              )}
            >
              {content.settings.logoText}
            </span>
            <span
              className={cn(
                'hidden text-xs transition-colors duration-300 sm:block',
                lightHeader ? 'text-neutral-500' : 'text-white/70',
              )}
            >
              {ui['header.est']} {content.settings.foundedYear}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {content.navigation.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={lp(item.href)}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                  active
                    ? cn(
                        lightHeader
                          ? 'bg-neutral-900 text-white'
                          : 'bg-white/20 text-white backdrop-blur-md',
                      )
                    : cn(
                        lightHeader
                          ? 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                          : 'text-white/90 hover:bg-white/10 hover:text-white',
                      ),
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher lightHeader={lightHeader} />
          <a
            href={`tel:${content.settings.primaryPhone.replace(/\s/g, '')}`}
            className={cn(
              'flex items-center gap-2 text-sm font-medium transition-colors duration-300',
              lightHeader
                ? 'text-neutral-700 hover:text-neutral-900'
                : 'text-white/90 hover:text-white',
            )}
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">{content.settings.primaryPhone}</span>
          </a>
          <Button
            href={lp('/iletisim')}
            locale={locale}
            variant={lightHeader ? 'secondary' : 'ghost'}
            size="sm"
            className={cn(
              !lightHeader &&
                'border-white/40 text-white hover:border-white hover:bg-white/15',
            )}
          >
            {ui['header.contact']}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher lightHeader={lightHeader} />
          <button
            type="button"
            className={cn(
              'rounded-lg p-2 transition-colors',
              lightHeader
                ? 'text-neutral-800 hover:bg-neutral-100'
                : 'text-white hover:bg-white/10',
            )}
            onClick={() => setOpen(!open)}
            aria-label={ui['header.menu']}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-fade-in border-t border-neutral-200 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {content.navigation.map((item) => (
              <Link
                key={item.href}
                href={lp(item.href)}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-xl px-4 py-3 text-base font-medium transition-all',
                  isActive(item.href)
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-800 hover:bg-neutral-50',
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={lp('/iletisim')}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-4 py-3 text-center font-medium text-white shadow-lg shadow-brand-600/25"
            >
              {ui['header.contact']}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
