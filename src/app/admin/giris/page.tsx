import AdminLoginForm from '@/components/admin/AdminLoginForm'

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-lg font-bold text-white">
            M
          </span>
          <h1 className="mt-4 text-2xl font-bold text-neutral-900">Mamon Admin</h1>
          <p className="mt-2 text-sm text-neutral-500">İçerik yönetim paneline giriş yapın</p>
        </div>
        <AdminLoginForm />
        <p className="mt-6 text-center text-xs text-neutral-400">
          Demo şifre: mamon2026
        </p>
      </div>
    </div>
  )
}
