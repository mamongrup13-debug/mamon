import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import StatsSection from '@/components/sections/StatsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import WhyUsSection from '@/components/sections/WhyUsSection'
import CtaSection from '@/components/sections/CtaSection'
import ContactSection from '@/components/sections/ContactSection'
import type { PageSection, SiteContent } from '@/types/content'
import type { Locale } from '@/lib/i18n'

export default function PageRenderer({
  content,
  sections,
  pageSlug,
  locale,
}: {
  content: SiteContent
  sections: PageSection[]
  pageSlug?: string
  locale: Locale
}) {
  return (
    <>
      {sections
        .filter((s) => s.enabled)
        .map((section) => {
          switch (section.type) {
            case 'hero':
              return <HeroSection key={section.id} content={content} locale={locale} />
            case 'about':
              return (
                <AboutSection
                  key={section.id}
                  content={content}
                  compact={pageSlug === 'home'}
                  locale={locale}
                />
              )
            case 'services':
              return <ServicesSection key={section.id} content={content} locale={locale} />
            case 'stats':
              return <StatsSection key={section.id} content={content} />
            case 'projects':
              return <ProjectsSection key={section.id} content={content} locale={locale} />
            case 'whyUs':
              return <WhyUsSection key={section.id} content={content} />
            case 'cta':
              return <CtaSection key={section.id} content={content} locale={locale} />
            case 'contact':
              return <ContactSection key={section.id} content={content} />
            default:
              return null
          }
        })}
    </>
  )
}
