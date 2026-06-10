export const locales = ['tr', 'en', 'de', 'ru', 'ar', 'zh'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'tr'

export const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch',
  ru: 'Русский',
  ar: 'العربية',
  zh: '中文',
}

export const localeFlags: Record<Locale, string> = {
  tr: '🇹🇷',
  en: '🇬🇧',
  de: '🇩🇪',
  ru: '🇷🇺',
  ar: '🇸🇦',
  zh: '🇨🇳',
}

export const ogLocales: Record<Locale, string> = {
  tr: 'tr_TR',
  en: 'en_US',
  de: 'de_DE',
  ru: 'ru_RU',
  ar: 'ar_SA',
  zh: 'zh_CN',
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (clean === '/') return `/${locale}`
  return `/${locale}${clean}`
}

export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length > 0 && isLocale(segments[0])) {
    const locale = segments[0]
    const rest = segments.slice(1).join('/')
    return { locale, path: rest ? `/${rest}` : '/' }
  }
  return { locale: defaultLocale, path: pathname || '/' }
}

export function numberLocale(locale: Locale): string {
  const map: Record<Locale, string> = {
    tr: 'tr-TR',
    en: 'en-US',
    de: 'de-DE',
    ru: 'ru-RU',
    ar: 'ar-SA',
    zh: 'zh-CN',
  }
  return map[locale]
}
