'use client'

import { MessageCircle } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'

function phoneToWhatsApp(phone: string) {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits}`
}

export default function WhatsAppButton({ phone }: { phone: string }) {
  const { ui } = useLocale()

  return (
    <a
      href={phoneToWhatsApp(phone)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition hover:scale-105 hover:shadow-xl md:bottom-8 md:left-8"
      aria-label={ui['whatsapp.label']}
      title={ui['whatsapp.label']}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
