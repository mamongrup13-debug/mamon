import type { Metadata } from 'next'
import PageRenderer from '@/components/PageRenderer'
import { getSiteContent, getPageBySlug } from '@/lib/content'
import { buildPageMetadata } from '@/lib/seo'
import { resolveLocale } from '@/lib/page-params'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const content = await getSiteContent(locale)
  const page = await getPageBySlug('home', locale)
  if (!page) return buildPageMetadata(content, content.globalSeo, `/${locale}`, locale)
  return buildPageMetadata(content, page.seo, `/${locale}`, locale)
}

export default async function HomePage({ params }: Props) {
  const locale = await resolveLocale(params)
  const content = await getSiteContent(locale)
  const page = await getPageBySlug('home', locale)
  if (!page) return null

  return <PageRenderer content={content} sections={page.sections} pageSlug="home" locale={locale} />
}
