import { getUi } from '@/lib/ui'
import type { Locale } from '@/lib/i18n'

const slugToKey: Record<string, keyof ReturnType<typeof getUi>> = {
  hakkimizda: 'page.corporate',
  hizmetler: 'page.expertise',
  projeler: 'page.portfolio',
  iletisim: 'page.contactUs',
}

export function getPageEyebrow(locale: Locale, slug: string): string {
  const ui = getUi(locale)
  const key = slugToKey[slug]
  return key ? ui[key] : ''
}
