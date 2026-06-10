import { getPageEyebrow } from '@/lib/page-hero'
import type { Locale } from '@/lib/i18n'

const gradients: Record<string, string> = {
  hakkimizda: 'from-brand-900 via-brand-800 to-blue-900',
  hizmetler: 'from-blue-900 via-brand-800 to-violet-900',
  projeler: 'from-violet-900 via-brand-800 to-emerald-900',
  iletisim: 'from-emerald-900 via-brand-800 to-blue-900',
}

export default function PageHero({
  locale,
  slug,
  title,
}: {
  locale: Locale
  slug: string
  title: string
}) {
  const eyebrow = getPageEyebrow(locale, slug)
  const gradient = gradients[slug] ?? 'from-brand-900 via-brand-800 to-blue-900'

  return (
    <div id="page-hero" className={`relative overflow-hidden bg-gradient-to-br ${gradient} py-20 md:py-28`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.2)_0%,transparent_60%)]" />
      <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/4 -translate-y-1/4 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="container-mamon relative z-10">
        {eyebrow && (
          <p className="mb-3 inline-block rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
            {eyebrow}
          </p>
        )}
        <h1 className="heading-display text-white">{title}</h1>
      </div>
    </div>
  )
}
