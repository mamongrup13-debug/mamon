import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/auth'

export default async function AdminPagesLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) redirect('/admin/giris')
  return children
}
