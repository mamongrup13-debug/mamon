import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Building2, Home, Palmtree } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { localizedPath, type Locale } from '@/lib/i18n'
import type { SiteContent } from '@/types/content'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'building-2': Building2,
  home: Home,
  palmtree: Palmtree,
}

const bgGradients = [
  'from-blue-500/10 via-blue-500/5 to-transparent',
  'from-emerald-500/10 via-emerald-500/5 to-transparent',
  'from-amber-500/10 via-amber-500/5 to-transparent',
]

const iconBgColors = [
  'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
  'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
  'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
]

export default function ServicesSection({ content, locale }: { content: SiteContent; locale: Locale }) {
  const services = content.sections.services
  const items = [...services.items].sort((a, b) => a.order - b.order)

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white -z-10" />

      <div className="container-mamon">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.title}
          subtitle={services.subtitle}
          centered
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 stagger-children">
          {items.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Building2
            return (
              <Link
                key={service.slug}
                href={localizedPath(locale, `/hizmetler/${service.slug}`)}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg shadow-neutral-900/5 ring-1 ring-neutral-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-neutral-900/10"
              >
                {/* Hover gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${bgGradients[index]} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/20 to-transparent" />

                  {/* Icon */}
                  <div className={`absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 shadow-lg transition-all duration-300 ${iconBgColors[index]}`}>
                    <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Number badge */}
                  <span className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-neutral-800 shadow-sm">
                    0{index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-neutral-900 transition-colors duration-300 group-hover:text-brand-600">
                      {service.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-neutral-300 transition-all duration-300 group-hover:text-brand-600 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                  <p className="mt-3 text-neutral-700 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  {service.websites && service.websites.length > 0 && (
                    <p className="mt-2 text-xs text-neutral-500">
                      {service.websites.map((w) => w.label).join(' · ')}
                    </p>
                  )}

                  {/* Features preview */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.features.slice(0, 2).map((f) => (
                      <span
                        key={f}
                        className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 transition-colors duration-300 group-hover:bg-white"
                      >
                        {f}
                      </span>
                    ))}
                    {service.features.length > 2 && (
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-400">
                        +{service.features.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
