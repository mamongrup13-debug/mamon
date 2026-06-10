'use client'

import { useEffect, useState } from 'react'
import type { SiteContent } from '@/types/content'

type Props = {
  children: (props: {
    content: SiteContent
    setContent: React.Dispatch<React.SetStateAction<SiteContent | null>>
    save: () => Promise<void>
    saving: boolean
    saved: boolean
    error: string
  }) => React.ReactNode
}

export default function AdminContentEditor({ children }: Props) {
  const [content, setContent] = useState<SiteContent | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then(setContent)
      .catch(() => setError('İçerik yüklenemedi'))
  }, [])

  async function save() {
    if (!content) return
    setSaving(true)
    setError('')
    setSaved(false)

    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    })

    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error ?? 'Kaydetme başarısız')
    }
    setSaving(false)
  }

  if (!content) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-neutral-500">
        {error || 'Yükleniyor...'}
      </div>
    )
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div />
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm font-medium text-emerald-600">Kaydedildi ✓</span>}
          {error && <span className="text-sm text-red-600">{error}</span>}
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </div>
      {children({ content, setContent, save, saving, saved, error })}
    </>
  )
}

export function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-neutral-700">{label}</span>
      {children}
    </label>
  )
}

export const inputClass =
  'w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'

export const textareaClass =
  'w-full resize-y rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'
