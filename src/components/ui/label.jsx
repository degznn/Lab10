import { cn } from '../../lib/utils'

export function Label({ className, ...props }) {
  return <label className={cn('text-sm font-semibold text-stone-700', className)} {...props} />
}
