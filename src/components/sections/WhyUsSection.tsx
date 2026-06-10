import {
  ShieldCheck,
  Layers,
  Compass,
  Users,
  TrendingUp,
  HeartHandshake,
  type LucideIcon,
} from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import type { SiteContent } from '@/types/content'

const iconMap: Record<string, LucideIcon> = {
  'shield-check': ShieldCheck,
  layers: Layers,
  compass: Compass,
  users: Users,
  'trending-up': TrendingUp,
  'heart-handshake': HeartHandshake,
}

const gradients = [
  {
    bg: 'from-blue-50 to-blue-100/50',
    icon: 'text-blue-600',
    iconBg: 'bg-blue-100',
    hover: 'group-hover:shadow-blue-500/10',
    badge: 'bg-blue-500',
  },
  {
    bg: 'from-emerald-50 to-emerald-100/50',
    icon: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
    hover: 'group-hover:shadow-emerald-500/10',
    badge: 'bg-emerald-500',
  },
  {
    bg: 'from-violet-50 to-violet-100/50',
    icon: 'text-violet-600',
    iconBg: 'bg-violet-100',
    hover: 'group-hover:shadow-violet-500/10',
    badge: 'bg-violet-500',
  },
  {
    bg: 'from-amber-50 to-amber-100/50',
    icon: 'text-amber-600',
    iconBg: 'bg-amber-100',
    hover: 'group-hover:shadow-amber-500/10',
    badge: 'bg-amber-500',
  },
  {
    bg: 'from-teal-50 to-teal-100/50',
    icon: 'text-teal-600',
    iconBg: 'bg-teal-100',
    hover: 'group-hover:shadow-teal-500/10',
    badge: 'bg-teal-500',
  },
  {
    bg: 'from-rose-50 to-rose-100/50',
    icon: 'text-rose-600',
    iconBg: 'bg-rose-100',
    hover: 'group-hover:shadow-rose-500/10',
    badge: 'bg-rose-500',
  },
]

export default function WhyUsSection({ content }: { content: SiteContent }) {
  const whyUs = content.sections.whyUs

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white -z-10" />
      <div className="absolute top-0 right-0 -z-10 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-brand-500/5 blur-3xl" />

      <div className="container-mamon">
        <SectionHeading
          eyebrow={whyUs.eyebrow}
          title={whyUs.title}
          subtitle={whyUs.subtitle}
          centered
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {whyUs.items.map((item, i) => {
            const Icon = iconMap[item.icon] ?? ShieldCheck
            const colors = gradients[i % gradients.length]

            return (
              <div
                key={item.title}
                className={cn(
                  'group relative overflow-hidden rounded-3xl border border-neutral-100 bg-white p-7 shadow-lg shadow-neutral-900/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl',
                  colors.hover,
                )}
              >
                {/* Hover gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Decorative dot pattern */}
                <div className="absolute top-0 right-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="grid grid-cols-3 gap-1.5 p-4">
                    {Array.from({ length: 9 }).map((_, j) => (
                      <div key={j} className={`h-1.5 w-1.5 rounded-full ${colors.badge} opacity-20`} />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${colors.iconBg} ${colors.icon} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}
                  >
                    <Icon className="h-7 w-7 transition-transform duration-500 group-hover:rotate-3" />
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-neutral-700">{item.description}</p>
                </div>

                {/* Bottom accent bar */}
                <div className={`absolute bottom-0 left-6 right-6 h-0.5 ${colors.badge} scale-x-0 transition-transform duration-500 group-hover:scale-x-100`} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Helper needed for the dynamic classes
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}
