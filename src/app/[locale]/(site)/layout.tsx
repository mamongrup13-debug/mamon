import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SiteWidgets from '@/components/widgets/SiteWidgets'
import { getSiteContent } from '@/lib/content'
import { buildPageMetadata, buildOrganizationJsonLd, buildWebSiteJsonLd } from '@/lib/seo'
import { isLocale, type Locale } from '@/lib/i18n'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const locale = raw as Locale
  const content = await getSiteContent(locale)
  return buildPageMetadata(content, content.globalSeo, `/${locale}`)
}

export default async function SiteLayout({ children, params }: Props) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const content = await getSiteContent(locale)
  const orgJsonLd = buildOrganizationJsonLd(content)
  const webJsonLd = buildWebSiteJsonLd(content)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webJsonLd) }}
      />
      <Header content={content} />
      <main>{children}</main>
      <Footer content={content} />
      <SiteWidgets phone={content.settings.primaryPhone} />
    </>
  )
}
