import Link from 'next/link'
import { cn } from '@/lib/utils'
import { localizedPath, type Locale } from '@/lib/i18n'

type Props = {
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'white' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const variants = {
  primary:
    'bg-neutral-900 text-white hover:bg-neutral-800 shadow-xl shadow-neutral-900/10',
  secondary:
    'bg-gradient-to-r from-brand-600 to-brand-700 text-white hover:from-brand-700 hover:to-brand-800 shadow-xl shadow-brand-600/25',
  ghost:
    'bg-transparent text-neutral-900 border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50',
  white:
    'bg-white text-neutral-900 hover:bg-neutral-50 shadow-xl shadow-black/5',
  outline:
    'bg-transparent border border-white/25 text-white hover:border-white hover:bg-white/10',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm font-medium',
  lg: 'px-8 py-4 text-base font-semibold',
}

export default function Button({
  href,
  locale,
  children,
  className,
  variant = 'primary',
  size = 'md',
}: Props & { href: string; locale?: Locale; children: React.ReactNode }) {
  const finalHref = locale ? localizedPath(locale, href) : href
  return (
    <Link
      href={finalHref}
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-all duration-300 active:scale-[0.97]',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </Link>
  )
}

export function ButtonSubmit({
  children,
  className,
  variant = 'secondary',
  size = 'md',
  disabled,
}: {
  children: React.ReactNode
  className?: string
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  disabled?: boolean
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </button>
  )
}
