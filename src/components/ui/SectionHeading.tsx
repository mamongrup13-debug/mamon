import { cn } from '@/lib/utils'

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        centered && 'text-center',
        'mb-14 md:mb-18',
        className,
      )}
    >
      {eyebrow && (
        <p className="eyebrow mb-4">
          <span className="inline-flex items-center gap-2">
            <span className="h-px w-6 bg-brand-400" />
            {eyebrow}
          </span>
        </p>
      )}
      <h2 className="heading-section">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            'mt-5 max-w-2xl text-lg leading-relaxed text-neutral-500 md:text-xl',
            centered && 'mx-auto',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
