'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ButtonSubmit } from '@/components/ui/Button'

export default function AdminLoginForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Geçersiz şifre')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-neutral-700">Admin Şifresi</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          placeholder="Demo: mamon2026"
        />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <ButtonSubmit disabled={loading} className="w-full">
        {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
      </ButtonSubmit>
    </form>
  )
}
