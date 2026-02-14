import { useState } from 'react'

export default function CollapsibleSection({ title, count, badge, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-90' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-sm font-semibold text-gray-700">{title}</span>
          {typeof count === 'number' && (
            <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
              {count}
            </span>
          )}
        </div>
        {badge}
      </button>
      <div
        className={`transition-all duration-200 ease-in-out ${
          open ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="p-4 bg-white">{children}</div>
      </div>
    </div>
  )
}
