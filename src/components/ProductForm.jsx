import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'

const estadoInicial = { descripcion: '', precio: '', categoria: '' }

export function ProductForm({ onRegister }) {
  const [formulario, setFormulario] = useState(estadoInicial)
  const [errores, setErrores] = useState({})

  function actualizarCampo(event) {
    const { name, value } = event.target
    setFormulario((actual) => ({ ...actual, [name]: value }))
    setErrores((actual) => ({ ...actual, [name]: '' }))
  }

  function validar() {
    const nuevosErrores = {}
    if (formulario.descripcion.trim().length < 3) nuevosErrores.descripcion = 'La descripción debe contener al menos 3 caracteres.'
    const precio = Number(formulario.precio)
    if (formulario.precio === '' || !Number.isFinite(precio) || precio <= 0) nuevosErrores.precio = 'El precio debe ser un número mayor que cero.'
    if (!formulario.categoria) nuevosErrores.categoria = 'Selecciona una categoría.'
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  function enviar(event) {
    event.preventDefault()
    if (!validar()) return
    onRegister({ descripcion: formulario.descripcion.trim(), precio: Number(formulario.precio), categoria: formulario.categoria })
    setFormulario(estadoInicial)
    setErrores({})
  }

  function limpiar() {
    setFormulario(estadoInicial)
    setErrores({})
  }

  return (
    <Card className='h-fit'>
      <CardHeader>
        <p className='mb-1 text-xs font-extrabold uppercase tracking-[0.16em] text-orange-600'>Nuevo registro</p>
        <h2 className='text-xl font-bold text-stone-900'>Registrar producto</h2>
        <p className='mt-1 text-sm text-stone-500'>Completa los datos solicitados para agregarlo al catálogo.</p>
      </CardHeader>
      <CardContent>
        <form className='space-y-4' onSubmit={enviar} noValidate>
          <div className='space-y-1.5'>
            <Label htmlFor='descripcion'>Descripción</Label>
            <Input id='descripcion' name='descripcion' value={formulario.descripcion} onChange={actualizarCampo} placeholder='Ej. Mouse inalámbrico' aria-invalid={Boolean(errores.descripcion)} />
            {errores.descripcion && <p className='text-xs font-medium text-red-600'>{errores.descripcion}</p>}
          </div>
          <div className='space-y-1.5'>
            <Label htmlFor='precio'>Precio de venta</Label>
            <Input id='precio' name='precio' type='number' min='0' step='0.01' value={formulario.precio} onChange={actualizarCampo} placeholder='0.00' aria-invalid={Boolean(errores.precio)} />
            {errores.precio && <p className='text-xs font-medium text-red-600'>{errores.precio}</p>}
          </div>
          <div className='space-y-1.5'>
            <Label htmlFor='categoria'>Categoría</Label>
            <select id='categoria' name='categoria' value={formulario.categoria} onChange={actualizarCampo} className='h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100' aria-invalid={Boolean(errores.categoria)}>
              <option value=''>Seleccionar categoría</option><option>Tecnología</option><option>Oficina</option><option>Papelería</option><option>Electrodomésticos</option><option>Accesorios</option>
            </select>
            {errores.categoria && <p className='text-xs font-medium text-red-600'>{errores.categoria}</p>}
          </div>
          <div className='grid grid-cols-2 gap-3 pt-2'>
            <Button type='submit'>Registrar producto</Button>
            <Button type='button' variant='outline' onClick={limpiar}>Limpiar</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
