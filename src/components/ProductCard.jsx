import { ProductIcon } from './Icons'

const tones = ['blue', 'cyan', 'indigo', 'sky', 'navy']

function ProductCard({ producto, index }) {
  const tone = tones[index % tones.length]
  const precio = Number(producto.precio)

  return (
    <article className="product-card">
      <div className="product-card__top">
        <ProductIcon tone={tone} />
        <span className="product-code">#{String(producto.codigo).padStart(3, '0')}</span>
      </div>

      <h3>{producto.descripcion}</h3>

      <div className="product-card__footer">
        <div>
          <span className="product-label">Precio</span>
          <strong>S/ {Number.isFinite(precio) ? precio.toFixed(2) : '—'}</strong>
        </div>
        <span className="product-status">Disponible</span>
      </div>
    </article>
  )
}

export default ProductCard
