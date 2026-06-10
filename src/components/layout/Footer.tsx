'use client'

import Link from 'next/link'
import { Linkedin, Instagram, Facebook } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'
import type { SiteContent } from '@/types/content'

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
}

export default function Footer({ content }: { content: SiteContent }) {
  const { ui, lp } = useLocale()

  return (
    <footer className="border-t border-neutral-100 bg-neutral-950 text-neutral-300">
      <div className="container-mamon pt-16 pb-6 md:pt-20 md:pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href={lp('/')} className="inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-neutral-900">
                M
              </span>
              <span className="text-xl font-bold text-white">{content.settings.logoText}</span>
            </Link>
            <p className="mt-4 max-w-md text-neutral-400">{content.footer.tagline}</p>
            <div className="mt-6 flex gap-3">
              {content.footer.social.map((s) => {
                const Icon = socialIcons[s.platform] ?? Linkedin
                return (
                  <a
                    key={s.platform}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition hover:border-white hover:text-white"
                    aria-label={s.platform}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {ui['footer.pages']}
            </h3>
            <ul className="space-y-3">
              {content.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={lp(item.href)} className="text-neutral-400 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {ui['footer.contact']}
            </h3>
            <ul className="space-y-3 text-neutral-400">
              <li>{content.sections.contact.address}</li>
              <li>
                <a href={`tel:${content.settings.primaryPhone}`} className="hover:text-white">
                  {content.settings.primaryPhone}
                </a>
              </li>
              <li>
                <a href={`mailto:${content.settings.primaryEmail}`} className="hover:text-white">
                  {content.settings.primaryEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-800 pt-6 text-center text-sm text-neutral-500 md:text-left">
          <p>{content.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
