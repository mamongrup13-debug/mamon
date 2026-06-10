import fs from 'fs/promises'
import path from 'path'
import { siteContentSchema, type SiteContent } from '@/types/content'
import type { Locale } from '@/lib/i18n'
import { defaultLocale } from '@/lib/i18n'
import trContent from '@/data/locales/tr.json'
import enContent from '@/data/locales/en.json'
import deContent from '@/data/locales/de.json'
import ruContent from '@/data/locales/ru.json'
import arContent from '@/data/locales/ar.json'
import zhContent from '@/data/locales/zh.json'

const CONTENT_PATH = path.join(process.cwd(), 'src/data/site-content.json')

const bundledLocales: Record<Locale, SiteContent> = {
  tr: siteContentSchema.parse(trContent),
  en: siteContentSchema.parse(enContent),
  de: siteContentSchema.parse(deContent),
  ru: siteContentSchema.parse(ruContent),
  ar: siteContentSchema.parse(arContent),
  zh: siteContentSchema.parse(zhContent),
}

const cache = new Map<Locale, SiteContent>()

export async function getSiteContent(locale: Locale = defaultLocale): Promise<SiteContent> {
  if (cache.has(locale)) return cache.get(locale)!

  if (locale === defaultLocale) {
    try {
      const raw = await fs.readFile(CONTENT_PATH, 'utf-8')
      const parsed = siteContentSchema.parse(JSON.parse(raw))
      cache.set(locale, parsed)
      return parsed
    } catch {
      // fall through to bundled
    }
  }

  const parsed = bundledLocales[locale] ?? bundledLocales.tr
  cache.set(locale, parsed)
  return parsed
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  const validated = siteContentSchema.parse(content)
  await fs.writeFile(CONTENT_PATH, JSON.stringify(validated, null, 2), 'utf-8')
  cache.set(defaultLocale, validated)
  await fs.writeFile(
    path.join(process.cwd(), 'src/data/locales/tr.json'),
    JSON.stringify(validated, null, 2),
    'utf-8',
  )
}

export function invalidateContentCache() {
  cache.clear()
}

export async function getPageBySlug(slug: string, locale: Locale = defaultLocale) {
  const content = await getSiteContent(locale)
  return content.pages.find((p) => p.slug === slug)
}

export function getPageSlugFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]
  const locales = ['tr', 'en', 'de', 'ru', 'ar', 'zh']
  const pathSegments = locales.includes(first) ? segments.slice(1) : segments
  if (pathSegments.length === 0) return 'home'
  return pathSegments[0] || 'home'
}
