import { cn } from '../../lib/utils'

export function Card({ className, ...props }) {
  return <section className={cn('rounded-2xl border border-orange-100 bg-white shadow-card', className)} {...props} />
}
export function CardHeader({ className, ...props }) {
  return <div className={cn('border-b border-orange-100 px-6 py-5', className)} {...props} />
}
export function CardContent({ className, ...props }) {
  return <div className={cn('p-6', className)} {...props} />
}
