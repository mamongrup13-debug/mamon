'use client'

import AdminContentEditor, { Field, inputClass } from '@/components/admin/AdminContentEditor'
import type { PageSection } from '@/types/content'

const sectionTypes = [
  { value: 'hero', label: 'Hero (Ana Görsel)' },
  { value: 'about', label: 'Hakkımızda' },
  { value: 'services', label: 'Hizmetler' },
  { value: 'stats', label: 'İstatistikler' },
  { value: 'projects', label: 'Projeler' },
  { value: 'whyUs', label: 'Neden Biz' },
  { value: 'cta', label: 'Çağrı (CTA)' },
  { value: 'contact', label: 'İletişim' },
]

export default function AdminPagesPage() {
  return (
    <AdminContentEditor>
      {({ content, setContent }) => (
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Sayfa Yönetimi</h1>
          <p className="mt-2 text-neutral-600">
            Her sayfanın SEO bilgilerini ve hangi bölümlerin görüneceğini düzenleyin.
          </p>

          <div className="mt-8 space-y-8">
            {content.pages.map((page, pageIndex) => (
              <div key={page.slug} className="rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-neutral-900">{page.title}</h2>
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                    /{page.slug === 'home' ? '' : page.slug}
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Sayfa Başlığı">
                    <input
                      className={inputClass}
                      value={page.title}
                      onChange={(e) => {
                        const pages = [...content.pages]
                        pages[pageIndex] = { ...page, title: e.target.value }
                        setContent({ ...content, pages })
                      }}
                    />
                  </Field>
                  <Field label="SEO Title">
                    <input
                      className={inputClass}
                      value={page.seo.title}
                      onChange={(e) => {
                        const pages = [...content.pages]
                        pages[pageIndex] = {
                          ...page,
                          seo: { ...page.seo, title: e.target.value },
                        }
                        setContent({ ...content, pages })
                      }}
                    />
                  </Field>
                  <Field label="SEO Description">
                    <input
                      className={inputClass}
                      value={page.seo.description}
                      onChange={(e) => {
                        const pages = [...content.pages]
                        pages[pageIndex] = {
                          ...page,
                          seo: { ...page.seo, description: e.target.value },
                        }
                        setContent({ ...content, pages })
                      }}
                    />
                  </Field>
                </div>

                <div className="mt-6">
                  <p className="mb-3 text-sm font-semibold text-neutral-700">Sayfa Bölümleri</p>
                  <div className="space-y-2">
                    {page.sections.map((section, sectionIndex) => (
                      <div
                        key={section.id}
                        className="flex flex-wrap items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50 p-3"
                      >
                        <select
                          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                          value={section.type}
                          onChange={(e) => {
                            const pages = [...content.pages]
                            const sections = [...page.sections]
                            sections[sectionIndex] = {
                              ...section,
                              type: e.target.value as PageSection['type'],
                            }
                            pages[pageIndex] = { ...page, sections }
                            setContent({ ...content, pages })
                          }}
                        >
                          {sectionTypes.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={section.enabled}
                            onChange={(e) => {
                              const pages = [...content.pages]
                              const sections = [...page.sections]
                              sections[sectionIndex] = { ...section, enabled: e.target.checked }
                              pages[pageIndex] = { ...page, sections }
                              setContent({ ...content, pages })
                            }}
                          />
                          Aktif
                        </label>
                        <button
                          type="button"
                          className="ml-auto text-sm text-red-600 hover:underline"
                          onClick={() => {
                            const pages = [...content.pages]
                            pages[pageIndex] = {
                              ...page,
                              sections: page.sections.filter((_, i) => i !== sectionIndex),
                            }
                            setContent({ ...content, pages })
                          }}
                        >
                          Kaldır
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-3 text-sm font-medium text-brand-600 hover:underline"
                    onClick={() => {
                      const pages = [...content.pages]
                      pages[pageIndex] = {
                        ...page,
                        sections: [
                          ...page.sections,
                          {
                            id: `section-${Date.now()}`,
                            type: 'cta' as const,
                            enabled: true,
                          },
                        ],
                      }
                      setContent({ ...content, pages })
                    }}
                  >
                    + Bölüm Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminContentEditor>
  )
}
