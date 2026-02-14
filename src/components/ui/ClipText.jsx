import { useState } from 'react'

export default function ClipText({ text, maxLength = 80 }) {
  const [expanded, setExpanded] = useState(false)

  if (!text) return <span className="text-gray-400 italic">N/A</span>

  const str = String(text)
  const needsClip = str.length > maxLength

  return (
    <span className="font-mono text-sm break-all">
      {needsClip && !expanded ? str.slice(0, maxLength) + '...' : str}
      {needsClip && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-2 text-blue-600 hover:text-blue-800 font-sans text-xs font-medium"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </span>
  )
}
