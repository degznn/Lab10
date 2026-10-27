import { CloudOffIcon, EmptyIcon, RefreshIcon } from './Icons'

export function SkeletonGrid() {
  return (
    <div className="products-grid" aria-label="Cargando productos">
      {Array.from({ length: 5 }, (_, index) => (
        <div className="skeleton-card" key={index}>
          <span className="skeleton skeleton--icon" />
          <span className="skeleton skeleton--line skeleton--long" />
          <span className="skeleton skeleton--line skeleton--short" />
          <span className="skeleton skeleton--line skeleton--medium" />
        </div>
      ))}
    </div>
  )
}

export function EmptyState({ search }) {
  const text = search
    ? `No se encontraron productos para “${search}”.`
    : 'No hay productos disponibles en este momento.'

  return (
    <div className="state-card">
      <span className="state-card__icon"><EmptyIcon /></span>
      <h3>{search ? 'Sin coincidencias' : 'Lista vacía'}</h3>
      <p>{text}</p>
    </div>
  )
}

export function ErrorState({ error, onRetry }) {
  return (
    <div className="state-card state-card--error" role="alert">
      <span className="state-card__icon"><CloudOffIcon /></span>
      <h3>No se pudo conectar con la API</h3>
      <p>{error}</p>
      <button className="retry-button" type="button" onClick={onRetry}>
        <RefreshIcon />
        Reintentar conexión
      </button>
    </div>
  )
}
