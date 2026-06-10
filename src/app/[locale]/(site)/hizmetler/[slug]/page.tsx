import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check } from 'lucide-react'
import { Building2, Home, Palmtree } from 'lucide-react'
import Button from '@/components/ui/Button'
import CtaSection from '@/components/sections/CtaSection'
import ServiceWebsites from '@/components/sections/ServiceWebsites'
import { getSiteContent } from '@/lib/content'
import { buildPageMetadata } from '@/lib/seo'
import { localizedPath } from '@/lib/i18n'
import { getUi } from '@/lib/ui'
import { resolveLocale } from '@/lib/page-params'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'building-2': Building2,
  home: Home,
  palmtree: Palmtree,
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  const content = await getSiteContent('tr')
  const locales = ['tr', 'en', 'de', 'ru', 'ar', 'zh'] as const
  return locales.flatMap((locale) =>
    content.sections.services.items.map((s) => ({ locale, slug: s.slug })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const locale = await resolveLocale(params)
  const content = await getSiteContent(locale)
  const service = content.sections.services.items.find((s) => s.slug === slug)
  if (!service) return buildPageMetadata(content, content.globalSeo, `/${locale}/hizmetler`, locale)
  return buildPageMetadata(
    content,
    { title: `${service.title} | Mamon`, description: service.shortDescription },
    `/${locale}/hizmetler/${slug}`,
    locale,
  )
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const locale = await resolveLocale(params)
  const ui = getUi(locale)
  const content = await getSiteContent(locale)
  const service = content.sections.services.items.find((s) => s.slug === slug)
  if (!service) notFound()

  const Icon = iconMap[service.icon] ?? Building2

  return (
    <>
      <div id="page-hero" className="relative overflow-hidden">
        <div className="relative aspect-[21/9] min-h-[280px]">
          <Image src={service.image} alt={service.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          <div className="container-mamon relative flex h-full flex-col justify-end pb-12 pt-24">
            <Link
              href={localizedPath(locale, '/hizmetler')}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {ui['service.back']}
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-600">
                <Icon className="h-7 w-7" />
              </div>
              <h1 className="text-4xl font-bold text-white md:text-5xl">{service.title}</h1>
            </div>
            <p className="mt-4 max-w-2xl text-lg text-white/85">{service.shortDescription}</p>
          </div>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-mamon grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-neutral-900">{ui['service.detail']}</h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">{service.description}</p>
            {service.websites && service.websites.length > 0 && (
              <ServiceWebsites websites={service.websites} />
            )}
          </div>
          <div className="rounded-3xl border border-neutral-100 bg-neutral-50 p-8">
            <h3 className="font-bold text-neutral-900">{ui['service.features']}</h3>
            <ul className="mt-4 space-y-3">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-neutral-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/iletisim" locale={locale} variant="secondary" className="w-full">
                {ui['service.quote']}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaSection content={content} locale={locale} />
    </>
  )
}
