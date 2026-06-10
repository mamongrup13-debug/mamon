import type { Metadata } from 'next'
import PageRenderer from '@/components/PageRenderer'
import PageHero from '@/components/layout/PageHero'
import { getSiteContent, getPageBySlug } from '@/lib/content'
import { buildPageMetadata } from '@/lib/seo'
import { resolveLocale } from '@/lib/page-params'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const content = await getSiteContent(locale)
  const page = await getPageBySlug('hizmetler', locale)
  if (!page) return buildPageMetadata(content, content.globalSeo, `/${locale}/hizmetler`, locale)
  return buildPageMetadata(content, page.seo, `/${locale}/hizmetler`, locale)
}

export default async function HizmetlerPage({ params }: Props) {
  const locale = await resolveLocale(params)
  const content = await getSiteContent(locale)
  const page = await getPageBySlug('hizmetler', locale)
  if (!page) return null

  return (
    <>
      <PageHero locale={locale} slug="hizmetler" title={page.title} />
      <PageRenderer content={content} sections={page.sections} pageSlug="hizmetler" locale={locale} />
    </>
  )
}
