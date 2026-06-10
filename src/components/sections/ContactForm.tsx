'use client'

import { useState } from 'react'
import { ButtonSubmit } from '@/components/ui/Button'
import { useLocale } from '@/context/LocaleContext'

export default function ContactForm() {
  const { ui } = useLocale()
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl">✓</div>
        <h3 className="mt-4 text-xl font-bold text-neutral-900">{ui['form.sentTitle']}</h3>
        <p className="mt-2 text-neutral-600">{ui['form.sentBody']}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-neutral-700">{ui['form.name']}</span>
          <input
            required
            name="name"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            placeholder={ui['form.namePlaceholder']}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-neutral-700">{ui['form.phone']}</span>
          <input
            required
            name="phone"
            type="tel"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            placeholder={ui['form.phonePlaceholder']}
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-neutral-700">{ui['form.email']}</span>
        <input
          required
          name="email"
          type="email"
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          placeholder={ui['form.emailPlaceholder']}
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-neutral-700">{ui['form.subject']}</span>
        <select
          name="subject"
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        >
          <option value="emlak">{ui['form.subject.emlak']}</option>
          <option value="insaat">{ui['form.subject.insaat']}</option>
          <option value="turizm">{ui['form.subject.turizm']}</option>
          <option value="diger">{ui['form.subject.diger']}</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-neutral-700">{ui['form.message']}</span>
        <textarea
          required
          name="message"
          rows={4}
          className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          placeholder={ui['form.messagePlaceholder']}
        />
      </label>
      <ButtonSubmit size="lg" className="w-full sm:w-auto">
        {ui['form.submit']}
      </ButtonSubmit>
    </form>
  )
}
