'use client'

import { createContext, useContext, useEffect } from 'react'
import type { Locale } from '@/lib/i18n'
import { localizedPath } from '@/lib/i18n'
import { getUi, type UiDict } from '@/lib/ui'

type LocaleContextValue = {
  locale: Locale
  ui: UiDict
  lp: (path: string) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  const ui = getUi(locale)
  const lp = (path: string) => localizedPath(locale, path)

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
  }, [locale])

  return (
    <LocaleContext.Provider value={{ locale, ui, lp }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
