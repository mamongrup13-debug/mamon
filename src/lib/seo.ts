import type { Metadata } from 'next'
import type { SiteContent } from '@/types/content'
import { locales, ogLocales, type Locale } from '@/lib/i18n'

const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mamon.com.tr'

export function buildPageMetadata(
  content: SiteContent,
  pageSeo: { title: string; description: string; keywords?: string[]; ogImage?: string },
  path = '/',
  locale: Locale = 'tr',
): Metadata {
  const url = `${siteUrl()}${path === '/' ? '' : path}`
  const ogImage = pageSeo.ogImage ?? content.globalSeo.ogImage
  const pathWithoutLocale = path.replace(/^\/[a-z]{2}(\/|$)/, '/')
  const alternates = Object.fromEntries(
    locales.map((loc) => [
      loc,
      `${siteUrl()}${loc === 'tr' && pathWithoutLocale === '/' ? '/tr' : `/${loc}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`}`,
    ]),
  )

  return {
    title: pageSeo.title,
    description: pageSeo.description,
    keywords: pageSeo.keywords ?? content.globalSeo.keywords,
    metadataBase: new URL(siteUrl()),
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      type: 'website',
      locale: ogLocales[locale],
      url,
      siteName: content.settings.companyName,
      title: pageSeo.title,
      description: pageSeo.description,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: pageSeo.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageSeo.title,
      description: pageSeo.description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    robots: { index: true, follow: true },
  }
}

export function buildOrganizationJsonLd(content: SiteContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: content.settings.companyName,
    url: siteUrl(),
    logo: `${siteUrl()}/logo.svg`,
    foundingDate: String(content.settings.foundedYear),
    email: content.settings.primaryEmail,
    telephone: content.settings.primaryPhone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      streetAddress: content.sections.contact.address,
    },
    sameAs: [
      ...content.footer.social.map((s) => s.href),
      ...content.sections.services.items.flatMap((s) => s.websites?.map((w) => w.href) ?? []),
    ],
    description: content.globalSeo.description,
  }
}

export function buildWebSiteJsonLd(content: SiteContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: content.settings.companyName,
    url: siteUrl(),
    description: content.globalSeo.description,
    publisher: { '@type': 'Organization', name: content.settings.companyName },
  }
}
