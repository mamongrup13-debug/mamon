import { isAdminAuthenticated } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdminAuthenticated()

  return (
    <div className="min-h-screen bg-neutral-100">
      {authed ? (
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <div className="border-b border-neutral-200 bg-white px-8 py-4">
              <p className="text-sm text-neutral-500">
                mamon.com.tr — İçerik Yönetim Paneli
              </p>
            </div>
            <div className="p-8">{children}</div>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
