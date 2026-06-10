import { NextResponse } from 'next/server'
import { getSiteContent, saveSiteContent, invalidateContentCache } from '@/lib/content'
import { isAdminAuthenticated } from '@/lib/auth'
import { siteContentSchema } from '@/types/content'

export async function GET() {
  const content = await getSiteContent()
  return NextResponse.json(content)
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const parsed = siteContentSchema.parse(body)
    invalidateContentCache()
    await saveSiteContent(parsed)
    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'invalid_content'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
