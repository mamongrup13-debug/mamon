import { notFound } from 'next/navigation'
import { isLocale, locales } from '@/lib/i18n'
import { LocaleProvider } from '@/context/LocaleContext'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return <LocaleProvider locale={locale}>{children}</LocaleProvider>
}
