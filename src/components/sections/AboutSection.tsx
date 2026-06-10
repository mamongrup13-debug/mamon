import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { localizedPath, type Locale } from '@/lib/i18n'
import { getUi } from '@/lib/ui'
import type { SiteContent } from '@/types/content'

export default function AboutSection({
  content,
  compact = false,
  locale,
}: {
  content: SiteContent
  compact?: boolean
  locale: Locale
}) {
  const ui = getUi(locale)
  const about = content.sections.about

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background decorative */}
      <div className="absolute top-0 right-0 -z-10 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-brand-500/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-64 w-64 -translate-x-1/4 translate-y-1/4 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="container-mamon">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image Column */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-neutral-900/10">
              <Image
                src={about.image}
                alt={about.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-5 text-white shadow-2xl shadow-brand-600/30 md:-right-8">
              <p className="text-4xl font-bold tracking-tight">{content.settings.foundedYear}</p>
              <p className="mt-0.5 text-sm font-medium text-brand-200">{ui['about.foundedYear']}</p>
            </div>

            {/* Decorative dots */}
            <div className="absolute -left-8 top-12 hidden h-24 w-24 lg:block">
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="h-2 w-2 rounded-full bg-brand-200/60" />
                ))}
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div>
            <SectionHeading eyebrow={about.eyebrow} title={about.title} className="mb-8" />
            <div className="space-y-5 text-neutral-700 leading-relaxed">
              {(compact ? about.paragraphs.slice(0, 2) : about.paragraphs).map((p, i) => (
                <p key={i} className="text-[17px]">
                  {p}
                </p>
              ))}
            </div>

            {/* Highlights */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {about.highlights.map((h) => (
                <div
                  key={h.title}
                  className="group rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-md shadow-neutral-900/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-500/10 hover:border-brand-300"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-500/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-500/30">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="font-bold text-neutral-900">{h.title}</p>
                  <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed">{h.description}</p>
                </div>
              ))}
            </div>

            {compact && (
              <Link
                href={localizedPath(locale, '/hakkimizda')}
                className="group mt-10 inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-700 transition-all"
              >
                <span className="relative">
                  {ui['about.readMore']}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-600 transition-all duration-300 group-hover:w-full" />
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
