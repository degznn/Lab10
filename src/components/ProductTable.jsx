import { Card, CardContent, CardHeader } from './ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

export function ProductTable({ productos }) {
  return (
    <Card className='min-w-0'>
      <CardHeader className='flex flex-row items-center justify-between gap-4'>
        <div><p className='mb-1 text-xs font-extrabold uppercase tracking-[0.16em] text-orange-600'>Catálogo en memoria</p><h2 className='text-xl font-bold text-stone-900'>Productos registrados</h2></div>
        <span className='rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-700'>{productos.length} productos</span>
      </CardHeader>
      <CardContent className='p-0'><div className='overflow-x-auto'><Table><TableHeader><TableRow><TableHead>Código</TableHead><TableHead>Descripción</TableHead><TableHead>Precio</TableHead><TableHead>Categoría</TableHead></TableRow></TableHeader><TableBody>
        {productos.map((producto) => <TableRow key={producto.codigo}><TableCell className='font-bold text-orange-700'>{producto.codigo}</TableCell><TableCell className='font-semibold text-stone-900'>{producto.descripcion}</TableCell><TableCell>S/ {producto.precio.toFixed(2)}</TableCell><TableCell><span className='rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-600'>{producto.categoria}</span></TableCell></TableRow>)}
      </TableBody></Table></div></CardContent>
    </Card>
  )
}
