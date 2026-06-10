'use client'

import ChatWidget from '@/components/widgets/ChatWidget'
import WhatsAppButton from '@/components/widgets/WhatsAppButton'

export default function SiteWidgets({ phone }: { phone: string }) {
  return (
    <>
      <WhatsAppButton phone={phone} />
      <ChatWidget phone={phone} />
    </>
  )
}
