import Image from 'next/image'
import { ArrowRight, Play } from 'lucide-react'
import Button from '@/components/ui/Button'
import type { SiteContent } from '@/types/content'
import type { Locale } from '@/lib/i18n'

export default function HeroSection({ content, locale }: { content: SiteContent; locale: Locale }) {
  const hero = content.sections.hero
  const titleLines = hero.title.split('\n')

  return (
    <section id="page-hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt={hero.title.replace('\n', ' ')}
          fill
          priority
          className="object-cover scale-105"
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/85 via-neutral-900/60 to-neutral-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent" />
      </div>

      {/* Subtle animated particles effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="container-mamon relative z-10 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/90 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse-soft" />
              {hero.eyebrow}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-6 animate-fade-up text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl" style={{ animationDelay: '0.1s' }}>
            {titleLines.map((line, i) => (
              <span key={i}>
                {i === 1 ? (
                  <span className="text-gradient-gold">{line}</span>
                ) : (
                  line
                )}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-white/75 md:text-xl" style={{ animationDelay: '0.2s' }}>
            {hero.subtitle}
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button
              href={hero.ctaPrimary.href}
              locale={locale}
              variant="white"
              size="lg"
              className="group shadow-2xl shadow-brand-600/20"
            >
              {hero.ctaPrimary.label}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            {hero.ctaSecondary && (
              <Button
                href={hero.ctaSecondary.href}
                locale={locale}
                variant="ghost"
                size="lg"
                className="border-white/25 text-white hover:border-white hover:bg-white/10"
              >
                <Play className="mr-2 h-4 w-4" />
                {hero.ctaSecondary.label}
              </Button>
            )}
          </div>
        </div>

        {/* Stats Bar */}
        {hero.stats && hero.stats.length > 0 && (
          <div
            className="mt-16 animate-fade-up grid grid-cols-3 gap-px rounded-2xl bg-white/10 overflow-hidden backdrop-blur-xl border border-white/10 md:mt-20 md:max-w-2xl"
            style={{ animationDelay: '0.4s' }}
          >
            {hero.stats.map((stat, i, stats) => (
              <div
                key={stat.label}
                className="relative bg-neutral-900/60 px-6 py-5 text-center md:px-8 md:py-6"
              >
                <p className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-white/60 md:text-sm">
                  {stat.label}
                </p>
                {i < stats.length - 1 && (
                  <div className="absolute right-0 top-1/4 h-1/2 w-px bg-white/10 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-surface to-transparent" />
    </section>
  )
}
