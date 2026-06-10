'use client'

import { useEffect, useRef, useState } from 'react'
import SectionHeading from '@/components/ui/SectionHeading'
import { useLocale } from '@/context/LocaleContext'
import { numberLocale } from '@/lib/i18n'
import type { SiteContent } from '@/types/content'

function formatStatValue(value: number, locale: string) {
  return value >= 1000 ? value.toLocaleString(locale) : String(value)
}

function isStaticYear(value: string) {
  const num = parseInt(value.replace(/\D/g, ''), 10)
  return value.length === 4 && num >= 1900 && num <= 2100
}

function AnimatedCounter({
  value,
  suffix = '',
  numLocale,
}: {
  value: string
  suffix?: string
  numLocale: string
}) {
  const numValue = parseInt(value.replace(/\D/g, ''), 10)
  const staticYear = isStaticYear(value)
  const [count, setCount] = useState(staticYear ? numValue : 0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(staticYear)

  useEffect(() => {
    if (staticYear || Number.isNaN(numValue)) return

    const el = ref.current
    if (!el) return

    const runAnimation = () => {
      if (hasAnimated.current) return
      hasAnimated.current = true

      const duration = 2000
      const steps = 60
      const increment = numValue / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= numValue) {
          setCount(numValue)
          clearInterval(timer)
        } else {
          setCount(Math.round(current))
        }
      }, duration / steps)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) runAnimation()
      },
      { threshold: 0.1 },
    )

    observer.observe(el)

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      runAnimation()
    }

    return () => observer.disconnect()
  }, [numValue, staticYear])

  return (
    <div ref={ref}>
      <span className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
        {formatStatValue(count, numLocale)}
        {suffix && <span className="text-gradient">{suffix}</span>}
      </span>
    </div>
  )
}

export default function StatsSection({ content }: { content: SiteContent }) {
  const { locale } = useLocale()
  const numLocale = numberLocale(locale)
  const stats = content.sections.stats

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-neutral-950 -z-10" />
      <div className="absolute inset-0 bg-noise -z-10 opacity-50" />
      <div className="absolute top-1/2 left-1/4 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl" />

      <div className="container-mamon">
        <SectionHeading
          eyebrow={stats.eyebrow}
          title={stats.title}
          centered
          className="[&_h2]:text-white [&_.eyebrow_span]:text-brand-400 [&_.eyebrow]:text-brand-300"
        />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.items.map((item) => (
            <div
              key={item.label}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/10 md:p-8"
            >
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 rounded-2xl animate-shimmer" />
              </div>

              <AnimatedCounter value={item.value} suffix={item.suffix} numLocale={numLocale} />

              <p className="mt-2 text-sm font-medium text-white/60 transition-colors duration-300 group-hover:text-white/80">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
