'use client'

import { useState } from 'react'
import { MessageSquare, X, Send } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'

function phoneToWhatsApp(phone: string) {
  return `https://wa.me/${phone.replace(/\D/g, '')}`
}

export default function ChatWidget({ phone }: { phone: string }) {
  const { ui, lp } = useLocale()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([])

  function toggle() {
    setOpen((v) => {
      if (!v && messages.length === 0) {
        setMessages([{ role: 'bot', text: ui['chat.welcome'] }])
      }
      return !v
    })
  }

  function send() {
    const text = message.trim()
    if (!text) return
    setMessages((m) => [
      ...m,
      { role: 'user', text },
      {
        role: 'bot',
        text: ui['chat.welcome'],
      },
    ])
    setMessage('')
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[min(100vw-3rem,360px)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl md:bottom-28 md:right-8">
          <div className="flex items-center justify-between bg-neutral-900 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span className="font-semibold">{ui['chat.title']}</span>
            </div>
            <button
              type="button"
              onClick={toggle}
              className="rounded-lg p-1 hover:bg-white/10"
              aria-label={ui['chat.close']}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex max-h-64 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  msg.role === 'user'
                    ? 'ml-auto bg-brand-600 text-white'
                    : 'bg-neutral-100 text-neutral-800'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-neutral-100 px-4 py-2">
            <a
              href={lp('/hizmetler')}
              className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-200"
            >
              {ui['chat.services']}
            </a>
            <a
              href={lp('/iletisim')}
              className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-200"
            >
              {ui['chat.contact']}
            </a>
            <a
              href={phoneToWhatsApp(phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366]/10 px-3 py-1 text-xs font-medium text-[#128C7E] hover:bg-[#25D366]/20"
            >
              {ui['chat.whatsapp']}
            </a>
          </div>

          <div className="flex gap-2 border-t border-neutral-100 p-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder={ui['chat.placeholder']}
              className="flex-1 rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            />
            <button
              type="button"
              onClick={send}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white hover:bg-brand-700"
              aria-label={ui['chat.send']}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition hover:scale-105 hover:bg-brand-700 md:bottom-8 md:right-8"
        aria-label={ui['chat.title']}
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
    </>
  )
}
