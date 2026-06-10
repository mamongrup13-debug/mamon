'use client'

import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import ContactForm from '@/components/sections/ContactForm'
import { useLocale } from '@/context/LocaleContext'
import type { SiteContent } from '@/types/content'

export default function ContactSection({ content }: { content: SiteContent }) {
  const { ui } = useLocale()
  const contact = content.sections.contact

  const info = [
    { icon: MapPin, label: ui['contact.address'], value: contact.address },
    { icon: Phone, label: ui['contact.phone'], value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: ui['contact.email'], value: contact.email, href: `mailto:${contact.email}` },
    { icon: Clock, label: ui['contact.hours'], value: contact.workingHours },
  ]

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white -z-10" />
      <div className="absolute top-0 right-0 -z-10 h-96 w-96 translate-x-1/4 -translate-y-1/4 rounded-full bg-brand-500/5 blur-3xl" />

      <div className="container-mamon">
        <SectionHeading
          eyebrow={ui['contact.eyebrow']}
          title={ui['contact.title']}
          subtitle={ui['contact.subtitle']}
          centered
        />

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-2 stagger-children">
            {info.map((item) => (
              <div key={item.label} className="group card-premium flex gap-5 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-600/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-brand-600/30">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a href={item.href} className="mt-1 block text-base font-medium text-neutral-900 transition-colors hover:text-brand-600">
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-base font-medium text-neutral-900">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="relative rounded-3xl border border-neutral-100 bg-white p-8 shadow-xl shadow-neutral-900/5 md:p-10">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-600/20">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">{ui['contact.formTitle']}</h3>
                  <p className="text-sm text-neutral-500">{ui['contact.formSubtitle']}</p>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
