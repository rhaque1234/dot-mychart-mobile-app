import { useState } from 'react'

export default function CollapsibleSection({ title, count, badge, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all text-left border-b-2 border-blue-200"
      >
        <div className="flex items-center gap-3">
          <svg
            className={`w-5 h-5 text-blue-600 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-sm font-bold text-gray-800 uppercase tracking-wide">{title}</span>
          {typeof count === 'number' && (
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-600 text-white shadow-sm">
              {count}
            </span>
          )}
        </div>
        {badge}
      </button>
      <div
        className={`transition-all duration-200 ease-in-out ${
          open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="p-4 bg-gray-50">{children}</div>
      </div>
    </div>
  )
}
