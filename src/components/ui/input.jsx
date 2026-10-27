import { cn } from '../../lib/utils'

export function Input({ className, ...props }) {
  return <input className={cn('h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100', className)} {...props} />
}
