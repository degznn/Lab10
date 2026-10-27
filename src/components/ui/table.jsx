import { cn } from '../../lib/utils'

export function Table({ className, ...props }) {
  return <table className={cn('w-full min-w-[680px] text-left text-sm', className)} {...props} />
}
export function TableHeader(props) { return <thead className='bg-orange-50 text-xs uppercase tracking-wide text-orange-800' {...props} /> }
export function TableBody(props) { return <tbody className='divide-y divide-orange-100' {...props} /> }
export function TableRow({ className, ...props }) { return <tr className={cn('transition hover:bg-orange-50/60', className)} {...props} /> }
export function TableHead({ className, ...props }) { return <th className={cn('px-5 py-3 font-bold', className)} {...props} /> }
export function TableCell({ className, ...props }) { return <td className={cn('px-5 py-4 text-stone-700', className)} {...props} /> }
