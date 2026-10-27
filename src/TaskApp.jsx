import { useState } from 'react'
import { ProductForm } from './components/ProductForm'
import { ProductTable } from './components/ProductTable'
import { productosIniciales } from './data/productos'

function TaskApp() {
  const [productos, setProductos] = useState(productosIniciales)
  const [mensaje, setMensaje] = useState('')

  function registrarProducto(datos) {
    const siguienteNumero = Math.max(0, ...productos.map((producto) => Number(producto.codigo.split('-')[1]) || 0)) + 1
    const producto = { codigo: `PROD-${String(siguienteNumero).padStart(3, '0')}`, ...datos }
    setProductos((actuales) => [...actuales, producto])
    setMensaje(`${producto.descripcion} fue registrado con el código ${producto.codigo}.`)
    window.setTimeout(() => setMensaje(''), 4500)
  }

  return (
    <main className='min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 text-stone-900'>
      <header className='border-b border-orange-100 bg-white/90 backdrop-blur'><div className='mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8'><div className='flex items-center gap-3'><span className='grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-orange-600 to-orange-400 text-lg font-black text-white shadow-lg shadow-orange-200'>P</span><div><p className='text-lg font-extrabold tracking-tight'>Product<span className='text-orange-600'>Flow</span></p><p className='text-xs text-stone-500'>Laboratorio S10</p></div></div><span className='rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700'>Datos temporales en memoria</span></div></header>
      <div className='mx-auto max-w-7xl px-5 py-10 sm:px-8'>
        <section className='mb-8'><p className='mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600'>Panel administrativo</p><h1 className='text-3xl font-black tracking-tight text-stone-900 sm:text-4xl'>Gestión de productos</h1><p className='mt-3 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base'>Registra productos y consulta el catálogo simulado sin necesidad de conectarte a un servidor.</p></section>
        {mensaje && <div className='mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800' role='status'>{mensaje}</div>}
        <div className='grid items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)]'><ProductForm onRegister={registrarProducto} /><ProductTable productos={productos} /></div>
      </div>
    </main>
  )
}

export default TaskApp
