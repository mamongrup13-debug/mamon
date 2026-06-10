import type { MetadataRoute } from 'next'
import { getSiteContent } from '@/lib/content'
import { locales } from '@/lib/i18n'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mamon.com.tr'
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    const content = await getSiteContent(locale)

    for (const page of content.pages) {
      entries.push({
        url: page.slug === 'home' ? `${base}/${locale}` : `${base}/${locale}/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page.slug === 'home' ? 1 : 0.8,
      })
    }

    for (const s of content.sections.services.items) {
      entries.push({
        url: `${base}/${locale}/hizmetler/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return entries
}
