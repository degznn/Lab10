import { useEffect, useMemo, useState } from 'react'
import ProductCard from './components/ProductCard'
import { RefreshIcon, SearchIcon } from './components/Icons'
import { EmptyState, ErrorState, SkeletonGrid } from './components/StateViews'
import './dashboard.css'

const API_URL = import.meta.env.VITE_PRODUCTOS_API_URL
  ?? 'http://127.0.0.1:8080/api/producto/'

function DashboardApp() {
  const [productos, setProductos] = useState([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let tiempoAgotado = false
    const timeout = window.setTimeout(() => {
      tiempoAgotado = true
      controller.abort()
    }, 7000)

    async function cargarProductos() {
      setStatus('loading')
      setError('')

      try {
        const response = await fetch(API_URL, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`El servidor respondió con HTTP ${response.status}.`)
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('La API devolvió un formato de productos no válido.')
        }

        setProductos(data)
        setStatus(data.length === 0 ? 'empty' : 'success')
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          if (tiempoAgotado) {
            setError('La conexión tardó demasiado. Verifica que Django esté ejecutándose en el puerto 8080.')
            setStatus('error')
          }
          return
        } else if (fetchError instanceof TypeError) {
          setError('No fue posible conectar con la API. Verifica el servidor Django, el puerto 8080 y la configuración CORS.')
        } else {
          setError(fetchError.message)
        }
        setStatus('error')
      } finally {
        window.clearTimeout(timeout)
      }
    }

    cargarProductos()

    return () => {
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [attempt])

  const productosFiltrados = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('es-PE')
    if (!query) return productos

    return productos.filter((producto) =>
      String(producto.descripcion ?? '').toLocaleLowerCase('es-PE').includes(query),
    )
  }, [productos, search])

  const connectionCopy = {
    loading: ['Conectando', 'status-dot--loading'],
    success: ['API conectada', 'status-dot--online'],
    empty: ['API conectada', 'status-dot--online'],
    error: ['Sin conexión', 'status-dot--offline'],
  }[status]

  return (
    <main className="dashboard">
      <div className="dashboard__glow dashboard__glow--one" />
      <div className="dashboard__glow dashboard__glow--two" />

      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Gestión de productos">
          <span className="brand__mark">P</span>
          <span>Product<span>Flow</span></span>
        </a>
        <div className="connection-status" aria-live="polite">
          <span className={`status-dot ${connectionCopy[1]}`} />
          {connectionCopy[0]}
        </div>
      </header>

      <section className="dashboard__content" id="inicio">
        <div className="dashboard__intro">
          <div>
            <p className="section-kicker">Catálogo conectado</p>
            <h1>Gestión de productos</h1>
            <p className="dashboard__description">
              Consulta el catálogo actualizado desde la API de Django en una vista clara y rápida.
            </p>
          </div>

          <button
            className="refresh-button"
            type="button"
            onClick={() => setAttempt((current) => current + 1)}
            disabled={status === 'loading'}
          >
            <RefreshIcon />
            Actualizar
          </button>
        </div>

        <section className="catalog-shell" aria-labelledby="catalog-title">
          <div className="catalog-toolbar">
            <div>
              <h2 id="catalog-title">Productos disponibles</h2>
              <p>{status === 'loading' ? 'Consultando catálogo...' : `${productos.length} productos obtenidos desde Django`}</p>
            </div>

            <label className="search-box">
              <SearchIcon />
              <span className="sr-only">Buscar producto por nombre</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por nombre..."
                disabled={status === 'loading' || status === 'error'}
              />
            </label>
          </div>

          {status === 'loading' && <SkeletonGrid />}
          {status === 'error' && <ErrorState error={error} onRetry={() => setAttempt((current) => current + 1)} />}
          {status === 'empty' && <EmptyState />}
          {status === 'success' && (
            productosFiltrados.length > 0 ? (
              <div className="products-grid">
                {productosFiltrados.map((producto, index) => (
                  <ProductCard key={producto.codigo} producto={producto} index={index} />
                ))}
              </div>
            ) : (
              <EmptyState search={search} />
            )
          )}
        </section>
      </section>
    </main>
  )
}

export default DashboardApp
