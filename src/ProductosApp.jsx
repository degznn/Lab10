import { useEffect, useState } from 'react'
import './productos.css'

const API_URL = 'http://127.0.0.1:8080/api/producto/'

function ProductosApp() {
  const [productos, setProductos] = useState([])
  const [recuperado, setRecuperado] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function recuperarProductos() {
      try {
        const respuesta = await fetch(API_URL)

        if (!respuesta.ok) {
          throw new Error('No se pudo obtener el listado de productos.')
        }

        setProductos(await respuesta.json())
      } catch (errorDeConexion) {
        setError(errorDeConexion.message)
      } finally {
        setRecuperado(true)
      }
    }

    recuperarProductos()
  }, [])

  function mostrarTabla() {
    return (
      <section className="productos-panel">
        <div className="productos-panel__encabezado">
          <div>
            <p className="productos-etiqueta">Servicio web Django</p>
            <h2>Productos recuperados</h2>
          </div>
          <span className="productos-insignia">{productos.length} productos</span>
        </div>

        {error ? (
          <p className="productos-error">{error}</p>
        ) : (
          <div className="productos-tabla-contenedor">
            <table className="productos-tabla">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.codigo}>
                    <td>{producto.codigo}</td>
                    <td>{producto.descripcion}</td>
                    <td>S/ {Number(producto.precio).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    )
  }

  if (!recuperado) {
    return (
      <main className="productos-carga">
        <div className="productos-carga__indicador" aria-hidden="true" />
        <p>recuperando datos...</p>
      </main>
    )
  }

  return (
    <main className="productos-pagina">
      <header className="productos-hero">
        <p className="productos-etiqueta">Laboratorio S10</p>
        <h1>Listado de productos</h1>
        <p>
          Productos consumidos desde un servicio web creado con Django.
        </p>
      </header>
      {mostrarTabla()}
    </main>
  )
}

export default ProductosApp
