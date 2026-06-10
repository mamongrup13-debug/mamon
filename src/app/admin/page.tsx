import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/auth'
import { getSiteContent } from '@/lib/content'
import Link from 'next/link'

export default async function AdminDashboard() {
  if (!(await isAdminAuthenticated())) redirect('/admin/giris')

  const content = await getSiteContent()

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">Genel Bakış</h1>
      <p className="mt-2 text-neutral-600">
        {content.settings.companyName} kurumsal sitesi — tüm sayfa ve bölümler buradan yönetilir.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Sayfa', value: content.pages.length, href: '/admin/sayfalar' },
          { label: 'Hizmet', value: content.sections.services.items.length, href: '/admin/bolumler' },
          { label: 'Proje', value: content.sections.projects.items.length, href: '/admin/bolumler' },
          { label: 'Kuruluş', value: content.settings.foundedYear, href: '/admin/ayarlar' },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <p className="text-3xl font-bold text-brand-600">{item.value}</p>
            <p className="mt-1 text-sm font-medium text-neutral-600">{item.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="font-bold text-neutral-900">Hızlı Başlangıç</h2>
        <ul className="mt-4 space-y-2 text-neutral-600">
          <li>• <Link href="/admin/bolumler" className="text-brand-600 hover:underline">Bölümler</Link> — Hero, hakkımızda, hizmetler, projeler metinleri</li>
          <li>• <Link href="/admin/sayfalar" className="text-brand-600 hover:underline">Sayfalar</Link> — Hangi bölümlerin hangi sayfada görüneceği</li>
          <li>• <Link href="/admin/ayarlar" className="text-brand-600 hover:underline">Ayarlar</Link> — Site adı, iletişim, SEO, footer</li>
        </ul>
      </div>
    </div>
  )
}
