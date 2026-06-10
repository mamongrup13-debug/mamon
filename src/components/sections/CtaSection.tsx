import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import { getUi } from '@/lib/ui'
import type { Locale } from '@/lib/i18n'
import type { SiteContent } from '@/types/content'

export default function CtaSection({
  content,
  locale,
}: {
  content: SiteContent
  locale: Locale
}) {
  const cta = content.sections.cta
  const ui = getUi(locale)

  return (
    <section className="section-padding">
      <div className="container-mamon">
        <div className="group relative overflow-hidden rounded-3xl">
          {cta.backgroundImage && (
            <Image
              src={cta.backgroundImage}
              alt=""
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="100vw"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/85 via-neutral-900/75 to-neutral-900/70" />
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl animate-float" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-amber-500/15 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative px-8 py-20 text-center md:px-16 md:py-28 lg:px-24">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm mb-6">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                {ui['cta.eyebrow']}
              </span>
            </div>

            <h2
              className="animate-fade-up text-3xl font-bold leading-[1.1] text-white md:text-4xl lg:text-5xl xl:text-6xl"
              style={{ animationDelay: '0.1s' }}
            >
              {cta.title}
            </h2>
            <p
              className="mx-auto mt-5 max-w-2xl animate-fade-up text-lg leading-relaxed text-white/70 md:text-xl"
              style={{ animationDelay: '0.2s' }}
            >
              {cta.subtitle}
            </p>
            <div className="mt-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button href={cta.buttonHref} locale={locale} variant="white" size="lg" className="group shadow-2xl shadow-black/20">
                {cta.buttonLabel}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
