import { useState, useEffect } from 'react'

function formatDuration(seconds) {
  if (seconds <= 0) return 'expired'
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return `${h}h ${m}m`
}

export default function CountdownBadge({ expiresAt }) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, Math.floor(expiresAt - Date.now() / 1000))
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.max(0, Math.floor(expiresAt - Date.now() / 1000)))
    }, 10000)
    return () => clearInterval(interval)
  }, [expiresAt])

  let colorClasses
  if (remaining <= 0) {
    colorClasses = 'bg-red-100 text-red-800'
  } else if (remaining < 300) {
    colorClasses = 'bg-yellow-100 text-yellow-800'
  } else {
    colorClasses = 'bg-green-100 text-green-800'
  }

  const label =
    remaining <= 0
      ? 'Expired'
      : `Expires: in ${formatDuration(remaining)}`

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
      {label}
    </span>
  )
}
