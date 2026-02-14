import CollapsibleSection from './CollapsibleSection'

const criticalityColors = {
  high: 'bg-red-100 text-red-700',
  low: 'bg-green-100 text-green-700',
  'unable-to-assess': 'bg-yellow-100 text-yellow-700',
}

export default function AllergiesList({ items }) {
  return (
    <CollapsibleSection title="Allergies" count={items.length}>
      {items.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No known allergies</p>
      ) : (
        <ul className="space-y-3">
          {items.map((a) => (
            <li key={a.id} className="border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-gray-800">{a.substance}</p>
                {a.criticality && (
                  <span
                    className={`flex-shrink-0 px-1.5 py-0.5 text-xs font-medium rounded ${
                      criticalityColors[a.criticality] || 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {a.criticality}
                  </span>
                )}
              </div>
              {a.reaction && (
                <p className="text-xs text-gray-500 mt-1">Reaction: {a.reaction}</p>
              )}
              {a.category && (
                <p className="text-xs text-gray-400 mt-0.5">Category: {a.category}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </CollapsibleSection>
  )
}
