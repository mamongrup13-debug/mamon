import type { Locale } from '@/lib/i18n'
import tr from '@/data/ui/tr.json'
import en from '@/data/ui/en.json'
import de from '@/data/ui/de.json'
import ru from '@/data/ui/ru.json'
import ar from '@/data/ui/ar.json'
import zh from '@/data/ui/zh.json'

export type UiDict = typeof tr

const dictionaries: Record<Locale, UiDict> = { tr, en, de, ru, ar, zh }

export function getUi(locale: Locale): UiDict {
  return dictionaries[locale] ?? dictionaries.tr
}

export type UiKey = keyof UiDict
