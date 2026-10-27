import { cn } from '../../lib/utils'

export function Button({ className, variant = 'default', ...props }) {
  const variants = {
    default: 'bg-orange-600 text-white hover:bg-orange-700 focus-visible:ring-orange-500',
    outline: 'border border-orange-200 bg-white text-orange-700 hover:bg-orange-50 focus-visible:ring-orange-500',
  }
  return <button className={cn('inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', variants[variant], className)} {...props} />
}
