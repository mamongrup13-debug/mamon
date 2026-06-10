import { cookies } from 'next/headers'

const COOKIE_NAME = 'mamon_admin'

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value === '1'
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? 'mamon2026'
}

export { COOKIE_NAME }
