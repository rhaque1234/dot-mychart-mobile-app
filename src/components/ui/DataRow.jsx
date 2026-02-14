export default function DataRow({ label, value, description, children }) {
  return (
    <div className="py-3 px-4 grid grid-cols-[140px_1fr] gap-4 border-b border-gray-100 last:border-b-0">
      <dt className="text-sm font-medium text-gray-500 text-right">{label}</dt>
      <dd className="text-sm text-gray-900 min-w-0">
        {children || value}
        {description && (
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        )}
      </dd>
    </div>
  )
}
