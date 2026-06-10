import Image from 'next/image'
import { MapPin, Calendar } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { getUi } from '@/lib/ui'
import type { Locale } from '@/lib/i18n'
import type { SiteContent } from '@/types/content'

export default function ProjectsSection({
  content,
  locale,
}: {
  content: SiteContent
  locale: Locale
}) {
  const ui = getUi(locale)
  const categoryLabels: Record<string, string> = {
    emlak: ui['category.emlak'],
    insaat: ui['category.insaat'],
    turizm: ui['category.turizm'],
  }

  const projects = content.sections.projects
  const showcaseImage =
    projects.image ??
    projects.items.find((p) => p.featured)?.image ??
    projects.items[0]?.image

  const highlights =
    projects.items.filter((p) => p.featured).length > 0
      ? projects.items.filter((p) => p.featured)
      : projects.items.slice(0, 3)

  if (!showcaseImage) return null

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50 -z-10" />

      <div className="container-mamon">
        <SectionHeading
          eyebrow={projects.eyebrow}
          title={projects.title}
          subtitle={projects.subtitle}
          centered
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-neutral-900/10 ring-1 ring-neutral-100">
            <Image
              src={showcaseImage}
              alt={projects.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 via-transparent to-transparent" />
          </div>

          <div className="space-y-8">
            {highlights.map((project) => (
              <div
                key={project.id}
                className="border-b border-neutral-200/80 pb-8 last:border-0 last:pb-0"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                  {categoryLabels[project.category]}
                </span>
                <h3 className="mt-2 text-xl font-bold text-neutral-900">{project.title}</h3>
                <p className="mt-2 leading-relaxed text-neutral-600">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 shrink-0 text-neutral-400" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 shrink-0 text-neutral-400" />
                    {project.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
