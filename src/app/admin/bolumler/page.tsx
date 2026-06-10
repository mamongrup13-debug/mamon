'use client'

import { useState } from 'react'
import AdminContentEditor, { Field, inputClass, textareaClass } from '@/components/admin/AdminContentEditor'

const tabs = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'Hakkımızda' },
  { id: 'services', label: 'Hizmetler' },
  { id: 'stats', label: 'İstatistikler' },
  { id: 'projects', label: 'Projeler' },
  { id: 'whyUs', label: 'Neden Biz' },
  { id: 'cta', label: 'CTA' },
  { id: 'contact', label: 'İletişim' },
] as const

type TabId = (typeof tabs)[number]['id']

export default function AdminSectionsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('hero')

  return (
    <AdminContentEditor>
      {({ content, setContent }) => (
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Bölüm Yönetimi</h1>
          <p className="mt-2 text-neutral-600">
            Site genelinde kullanılan bölüm içeriklerini düzenleyin.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 ring-1 ring-neutral-200 hover:ring-neutral-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
            {activeTab === 'hero' && (
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Üst Etiket">
                  <input className={inputClass} value={content.sections.hero.eyebrow}
                    onChange={(e) => setContent({ ...content, sections: { ...content.sections, hero: { ...content.sections.hero, eyebrow: e.target.value } } })} />
                </Field>
                <Field label="Görsel URL">
                  <input className={inputClass} value={content.sections.hero.image}
                    onChange={(e) => setContent({ ...content, sections: { ...content.sections, hero: { ...content.sections.hero, image: e.target.value } } })} />
                </Field>
                <Field label="Başlık (\\n ile satır kır)">
                  <textarea className={textareaClass} rows={3} value={content.sections.hero.title}
                    onChange={(e) => setContent({ ...content, sections: { ...content.sections, hero: { ...content.sections.hero, title: e.target.value } } })} />
                </Field>
                <Field label="Alt Başlık">
                  <textarea className={textareaClass} rows={3} value={content.sections.hero.subtitle}
                    onChange={(e) => setContent({ ...content, sections: { ...content.sections, hero: { ...content.sections.hero, subtitle: e.target.value } } })} />
                </Field>
                <Field label="Birincil Buton Metni">
                  <input className={inputClass} value={content.sections.hero.ctaPrimary.label}
                    onChange={(e) => setContent({ ...content, sections: { ...content.sections, hero: { ...content.sections.hero, ctaPrimary: { ...content.sections.hero.ctaPrimary, label: e.target.value } } } })} />
                </Field>
                <Field label="Birincil Buton Link">
                  <input className={inputClass} value={content.sections.hero.ctaPrimary.href}
                    onChange={(e) => setContent({ ...content, sections: { ...content.sections, hero: { ...content.sections.hero, ctaPrimary: { ...content.sections.hero.ctaPrimary, href: e.target.value } } } })} />
                </Field>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Etiket"><input className={inputClass} value={content.sections.about.eyebrow}
                    onChange={(e) => setContent({ ...content, sections: { ...content.sections, about: { ...content.sections.about, eyebrow: e.target.value } } })} /></Field>
                  <Field label="Görsel URL"><input className={inputClass} value={content.sections.about.image}
                    onChange={(e) => setContent({ ...content, sections: { ...content.sections, about: { ...content.sections.about, image: e.target.value } } })} /></Field>
                  <Field label="Başlık"><input className={inputClass} value={content.sections.about.title}
                    onChange={(e) => setContent({ ...content, sections: { ...content.sections, about: { ...content.sections.about, title: e.target.value } } })} /></Field>
                </div>
                {content.sections.about.paragraphs.map((p, i) => (
                  <Field key={i} label={`Paragraf ${i + 1}`}>
                    <textarea className={textareaClass} rows={3} value={p}
                      onChange={(e) => {
                        const paragraphs = [...content.sections.about.paragraphs]
                        paragraphs[i] = e.target.value
                        setContent({ ...content, sections: { ...content.sections, about: { ...content.sections.about, paragraphs } } })
                      }} />
                  </Field>
                ))}
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Etiket"><input className={inputClass} value={content.sections.services.eyebrow}
                    onChange={(e) => setContent({ ...content, sections: { ...content.sections, services: { ...content.sections.services, eyebrow: e.target.value } } })} /></Field>
                  <Field label="Başlık"><input className={inputClass} value={content.sections.services.title}
                    onChange={(e) => setContent({ ...content, sections: { ...content.sections, services: { ...content.sections.services, title: e.target.value } } })} /></Field>
                </div>
                {content.sections.services.items.map((service, i) => (
                  <div key={service.slug} className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
                    <h3 className="mb-4 font-bold">{service.title}</h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Field label="Başlık"><input className={inputClass} value={service.title}
                        onChange={(e) => {
                          const items = [...content.sections.services.items]
                          items[i] = { ...service, title: e.target.value }
                          setContent({ ...content, sections: { ...content.sections, services: { ...content.sections.services, items } } })
                        }} /></Field>
                      <Field label="Görsel URL"><input className={inputClass} value={service.image}
                        onChange={(e) => {
                          const items = [...content.sections.services.items]
                          items[i] = { ...service, image: e.target.value }
                          setContent({ ...content, sections: { ...content.sections, services: { ...content.sections.services, items } } })
                        }} /></Field>
                      <Field label="Kısa Açıklama"><input className={inputClass} value={service.shortDescription}
                        onChange={(e) => {
                          const items = [...content.sections.services.items]
                          items[i] = { ...service, shortDescription: e.target.value }
                          setContent({ ...content, sections: { ...content.sections, services: { ...content.sections.services, items } } })
                        }} /></Field>
                      <Field label="Detaylı Açıklama"><textarea className={textareaClass} rows={2} value={service.description}
                        onChange={(e) => {
                          const items = [...content.sections.services.items]
                          items[i] = { ...service, description: e.target.value }
                          setContent({ ...content, sections: { ...content.sections, services: { ...content.sections.services, items } } })
                        }} /></Field>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="grid gap-4 sm:grid-cols-2">
                {content.sections.stats.items.map((stat, i) => (
                  <div key={i} className="rounded-xl border border-neutral-100 p-4">
                    <Field label="Değer"><input className={inputClass} value={stat.value}
                      onChange={(e) => {
                        const items = [...content.sections.stats.items]
                        items[i] = { ...stat, value: e.target.value }
                        setContent({ ...content, sections: { ...content.sections, stats: { ...content.sections.stats, items } } })
                      }} /></Field>
                    <Field label="Etiket"><input className={inputClass} value={stat.label}
                      onChange={(e) => {
                        const items = [...content.sections.stats.items]
                        items[i] = { ...stat, label: e.target.value }
                        setContent({ ...content, sections: { ...content.sections, stats: { ...content.sections.stats, items } } })
                      }} /></Field>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-6">
                <Field label="Vitrin Görseli URL">
                  <input
                    className={inputClass}
                    value={content.sections.projects.image ?? ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        sections: {
                          ...content.sections,
                          projects: { ...content.sections.projects, image: e.target.value },
                        },
                      })
                    }
                  />
                </Field>
                {content.sections.projects.items.map((project, i) => (
                  <div key={project.id} className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      <Field label="Proje Adı"><input className={inputClass} value={project.title}
                        onChange={(e) => {
                          const items = [...content.sections.projects.items]
                          items[i] = { ...project, title: e.target.value }
                          setContent({ ...content, sections: { ...content.sections, projects: { ...content.sections.projects, items } } })
                        }} /></Field>
                      <Field label="Konum"><input className={inputClass} value={project.location}
                        onChange={(e) => {
                          const items = [...content.sections.projects.items]
                          items[i] = { ...project, location: e.target.value }
                          setContent({ ...content, sections: { ...content.sections, projects: { ...content.sections.projects, items } } })
                        }} /></Field>
                      <Field label="Görsel URL"><input className={inputClass} value={project.image}
                        onChange={(e) => {
                          const items = [...content.sections.projects.items]
                          items[i] = { ...project, image: e.target.value }
                          setContent({ ...content, sections: { ...content.sections, projects: { ...content.sections.projects, items } } })
                        }} /></Field>
                      <Field label="Açıklama"><input className={inputClass} value={project.description}
                        onChange={(e) => {
                          const items = [...content.sections.projects.items]
                          items[i] = { ...project, description: e.target.value }
                          setContent({ ...content, sections: { ...content.sections, projects: { ...content.sections.projects, items } } })
                        }} /></Field>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'whyUs' && (
              <div className="space-y-4">
                {content.sections.whyUs.items.map((item, i) => (
                  <div key={i} className="grid gap-3 rounded-xl border border-neutral-100 p-4 md:grid-cols-2">
                    <Field label="Başlık"><input className={inputClass} value={item.title}
                      onChange={(e) => {
                        const items = [...content.sections.whyUs.items]
                        items[i] = { ...item, title: e.target.value }
                        setContent({ ...content, sections: { ...content.sections, whyUs: { ...content.sections.whyUs, items } } })
                      }} /></Field>
                    <Field label="Açıklama"><input className={inputClass} value={item.description}
                      onChange={(e) => {
                        const items = [...content.sections.whyUs.items]
                        items[i] = { ...item, description: e.target.value }
                        setContent({ ...content, sections: { ...content.sections, whyUs: { ...content.sections.whyUs, items } } })
                      }} /></Field>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'cta' && (
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Başlık"><input className={inputClass} value={content.sections.cta.title}
                  onChange={(e) => setContent({ ...content, sections: { ...content.sections, cta: { ...content.sections.cta, title: e.target.value } } })} /></Field>
                <Field label="Alt Başlık"><input className={inputClass} value={content.sections.cta.subtitle}
                  onChange={(e) => setContent({ ...content, sections: { ...content.sections, cta: { ...content.sections.cta, subtitle: e.target.value } } })} /></Field>
                <Field label="Buton Metni"><input className={inputClass} value={content.sections.cta.buttonLabel}
                  onChange={(e) => setContent({ ...content, sections: { ...content.sections, cta: { ...content.sections.cta, buttonLabel: e.target.value } } })} /></Field>
                <Field label="Arka Plan Görsel"><input className={inputClass} value={content.sections.cta.backgroundImage ?? ''}
                  onChange={(e) => setContent({ ...content, sections: { ...content.sections, cta: { ...content.sections.cta, backgroundImage: e.target.value } } })} /></Field>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Adres"><textarea className={textareaClass} rows={2} value={content.sections.contact.address}
                  onChange={(e) => setContent({ ...content, sections: { ...content.sections, contact: { ...content.sections.contact, address: e.target.value } } })} /></Field>
                <Field label="Telefon"><input className={inputClass} value={content.sections.contact.phone}
                  onChange={(e) => setContent({ ...content, sections: { ...content.sections, contact: { ...content.sections.contact, phone: e.target.value } } })} /></Field>
                <Field label="E-posta"><input className={inputClass} value={content.sections.contact.email}
                  onChange={(e) => setContent({ ...content, sections: { ...content.sections, contact: { ...content.sections.contact, email: e.target.value } } })} /></Field>
                <Field label="Çalışma Saatleri"><input className={inputClass} value={content.sections.contact.workingHours}
                  onChange={(e) => setContent({ ...content, sections: { ...content.sections, contact: { ...content.sections.contact, workingHours: e.target.value } } })} /></Field>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminContentEditor>
  )
}
