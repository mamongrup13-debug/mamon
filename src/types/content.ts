import { z } from 'zod'

export const seoSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),
})

export const navItemSchema = z.object({
  label: z.string(),
  href: z.string(),
})

export const heroSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string(),
  ctaPrimary: z.object({ label: z.string(), href: z.string() }),
  ctaSecondary: z.object({ label: z.string(), href: z.string() }).optional(),
  image: z.string(),
  stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
})

export const aboutSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  paragraphs: z.array(z.string()),
  image: z.string(),
  highlights: z.array(z.object({ title: z.string(), description: z.string() })),
})

export const serviceWebsiteSchema = z.object({
  label: z.string(),
  href: z.string(),
})

export const serviceSchema = z.object({
  slug: z.string(),
  title: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  image: z.string(),
  icon: z.string(),
  features: z.array(z.string()),
  websites: z.array(serviceWebsiteSchema).optional(),
  order: z.number(),
})

export const statSchema = z.object({
  value: z.string(),
  label: z.string(),
  suffix: z.string().optional(),
})

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(['emlak', 'insaat', 'turizm']),
  location: z.string(),
  year: z.string(),
  image: z.string(),
  description: z.string(),
  featured: z.boolean().optional(),
})

export const whyUsItemSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
})

export const ctaSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  buttonLabel: z.string(),
  buttonHref: z.string(),
  backgroundImage: z.string().optional(),
})

export const contactSchema = z.object({
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  mapEmbed: z.string().optional(),
  workingHours: z.string(),
})

export const footerSchema = z.object({
  tagline: z.string(),
  copyright: z.string(),
  social: z.array(z.object({ platform: z.string(), href: z.string() })),
})

export const pageSectionSchema = z.object({
  id: z.string(),
  type: z.enum(['hero', 'about', 'services', 'stats', 'projects', 'whyUs', 'cta', 'contact']),
  enabled: z.boolean(),
})

export const pageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  seo: seoSchema,
  sections: z.array(pageSectionSchema),
})

export const siteSettingsSchema = z.object({
  companyName: z.string(),
  domain: z.string(),
  foundedYear: z.number(),
  logoText: z.string(),
  primaryPhone: z.string(),
  primaryEmail: z.string(),
})

export const siteContentSchema = z.object({
  settings: siteSettingsSchema,
  navigation: z.array(navItemSchema),
  globalSeo: seoSchema,
  pages: z.array(pageSchema),
  sections: z.object({
    hero: heroSchema,
    about: aboutSchema,
    services: z.object({
      eyebrow: z.string(),
      title: z.string(),
      subtitle: z.string(),
      items: z.array(serviceSchema),
    }),
    stats: z.object({
      eyebrow: z.string(),
      title: z.string(),
      items: z.array(statSchema),
    }),
    projects: z.object({
      eyebrow: z.string(),
      title: z.string(),
      subtitle: z.string(),
      image: z.string().optional(),
      items: z.array(projectSchema),
    }),
    whyUs: z.object({
      eyebrow: z.string(),
      title: z.string(),
      subtitle: z.string(),
      items: z.array(whyUsItemSchema),
    }),
    cta: ctaSchema,
    contact: contactSchema,
  }),
  footer: footerSchema,
})

export type SiteContent = z.infer<typeof siteContentSchema>
export type PageSection = z.infer<typeof pageSectionSchema>
export type Service = z.infer<typeof serviceSchema>
export type Project = z.infer<typeof projectSchema>
