'use client'

import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/context/LocaleContext'
import type { Service } from '@/types/content'

export default function ServiceWebsites({
  websites,
  compact = false,
}: {
  websites: NonNullable<Service['websites']>
  compact?: boolean
}) {
  const { ui } = useLocale()

  if (!websites.length) return null

  return (
    <div className={compact ? 'mt-4' : 'mt-6'}>
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        {ui['services.websites']}
      </p>
      <ul className={cn(compact ? 'mt-2 space-y-1.5' : 'mt-3 space-y-2')}>
        {websites.map((site) => (
          <li key={site.href}>
            <a
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 transition hover:text-brand-700"
            >
              {site.label}
              <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
