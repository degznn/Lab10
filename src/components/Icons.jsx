export function ProductIcon({ tone = 'blue' }) {
  return (
    <span className={`icon-box icon-box--${tone}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 7.5 12 4l6 3.5v9L12 20l-6-3.5v-9Z" />
        <path d="m6.5 7.8 5.5 3.2 5.5-3.2M12 11v8.5" />
      </svg>
    </span>
  )
}

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  )
}

export function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 11a8 8 0 1 0 2.1 5.4" />
      <path d="M20 4v7h-7" />
    </svg>
  )
}

export function CloudOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M17.5 17.5H7.8a4.8 4.8 0 1 1 .8-9.5 5.8 5.8 0 0 1 10.5 3.4 3.1 3.1 0 0 1-1.6 6.1Z" />
      <path d="m4 4 16 16" />
    </svg>
  )
}

export function EmptyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4.5 7.5h15v11h-15zM8 7.5V5h8v2.5" />
      <path d="M9 12h6M9 15h3" />
    </svg>
  )
}
