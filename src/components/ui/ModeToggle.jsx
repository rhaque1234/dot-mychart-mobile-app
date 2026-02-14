export default function ModeToggle({ mode, onChange }) {
  return (
    <div className="inline-flex rounded-lg overflow-hidden border border-gray-300">
      <button
        onClick={() => onChange('html')}
        className={`px-3 py-1 text-xs font-medium transition-colors ${
          mode === 'html'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        Table
      </button>
      <button
        onClick={() => onChange('json')}
        className={`px-3 py-1 text-xs font-medium transition-colors border-l border-gray-300 ${
          mode === 'json'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        JSON
      </button>
    </div>
  )
}
