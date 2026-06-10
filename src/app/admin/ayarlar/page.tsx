'use client'

import AdminContentEditor, { Field, inputClass, textareaClass } from '@/components/admin/AdminContentEditor'

export default function AdminSettingsPage() {
  return (
    <AdminContentEditor>
      {({ content, setContent }) => (
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Site Ayarları</h1>
          <p className="mt-2 text-neutral-600">Genel site bilgileri, SEO ve footer ayarları.</p>

          <div className="mt-8 space-y-8">
            <section className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="mb-4 font-bold text-neutral-900">Şirket Bilgileri</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Şirket Adı">
                  <input className={inputClass} value={content.settings.companyName}
                    onChange={(e) => setContent({ ...content, settings: { ...content.settings, companyName: e.target.value } })} />
                </Field>
                <Field label="Domain">
                  <input className={inputClass} value={content.settings.domain}
                    onChange={(e) => setContent({ ...content, settings: { ...content.settings, domain: e.target.value } })} />
                </Field>
                <Field label="Kuruluş Yılı">
                  <input type="number" className={inputClass} value={content.settings.foundedYear}
                    onChange={(e) => setContent({ ...content, settings: { ...content.settings, foundedYear: Number(e.target.value) } })} />
                </Field>
                <Field label="Logo Metni">
                  <input className={inputClass} value={content.settings.logoText}
                    onChange={(e) => setContent({ ...content, settings: { ...content.settings, logoText: e.target.value } })} />
                </Field>
                <Field label="Telefon">
                  <input className={inputClass} value={content.settings.primaryPhone}
                    onChange={(e) => setContent({ ...content, settings: { ...content.settings, primaryPhone: e.target.value } })} />
                </Field>
                <Field label="E-posta">
                  <input className={inputClass} value={content.settings.primaryEmail}
                    onChange={(e) => setContent({ ...content, settings: { ...content.settings, primaryEmail: e.target.value } })} />
                </Field>
              </div>
            </section>

            <section className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="mb-4 font-bold text-neutral-900">Global SEO</h2>
              <div className="grid gap-4">
                <Field label="Varsayılan Title">
                  <input className={inputClass} value={content.globalSeo.title}
                    onChange={(e) => setContent({ ...content, globalSeo: { ...content.globalSeo, title: e.target.value } })} />
                </Field>
                <Field label="Varsayılan Description">
                  <textarea className={textareaClass} rows={2} value={content.globalSeo.description}
                    onChange={(e) => setContent({ ...content, globalSeo: { ...content.globalSeo, description: e.target.value } })} />
                </Field>
                <Field label="OG Görsel URL">
                  <input className={inputClass} value={content.globalSeo.ogImage ?? ''}
                    onChange={(e) => setContent({ ...content, globalSeo: { ...content.globalSeo, ogImage: e.target.value } })} />
                </Field>
              </div>
            </section>

            <section className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="mb-4 font-bold text-neutral-900">Footer</h2>
              <div className="grid gap-4">
                <Field label="Tagline">
                  <textarea className={textareaClass} rows={2} value={content.footer.tagline}
                    onChange={(e) => setContent({ ...content, footer: { ...content.footer, tagline: e.target.value } })} />
                </Field>
                <Field label="Copyright">
                  <input className={inputClass} value={content.footer.copyright}
                    onChange={(e) => setContent({ ...content, footer: { ...content.footer, copyright: e.target.value } })} />
                </Field>
              </div>
            </section>

            <section className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="mb-4 font-bold text-neutral-900">Menü</h2>
              {content.navigation.map((item, i) => (
                <div key={i} className="mb-3 grid gap-3 md:grid-cols-2">
                  <Field label="Etiket">
                    <input className={inputClass} value={item.label}
                      onChange={(e) => {
                        const navigation = [...content.navigation]
                        navigation[i] = { ...item, label: e.target.value }
                        setContent({ ...content, navigation })
                      }} />
                  </Field>
                  <Field label="Link">
                    <input className={inputClass} value={item.href}
                      onChange={(e) => {
                        const navigation = [...content.navigation]
                        navigation[i] = { ...item, href: e.target.value }
                        setContent({ ...content, navigation })
                      }} />
                  </Field>
                </div>
              ))}
            </section>
          </div>
        </div>
      )}
    </AdminContentEditor>
  )
}
