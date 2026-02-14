import CollapsibleSection from './CollapsibleSection'

const statusColors = {
  active: 'bg-red-100 text-red-700',
  recurrence: 'bg-orange-100 text-orange-700',
  relapse: 'bg-orange-100 text-orange-700',
  inactive: 'bg-gray-100 text-gray-600',
  remission: 'bg-green-100 text-green-700',
  resolved: 'bg-green-100 text-green-700',
}

export default function ConditionsList({ items }) {
  return (
    <CollapsibleSection title="Conditions" count={items.length} defaultOpen={true}>
      {items.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No conditions on file</p>
      ) : (
        <ul className="space-y-2">
          {items.map((c) => (
            <li key={c.id} className="flex items-start justify-between gap-2">
              <p className="text-sm text-gray-800">{c.display}</p>
              <span
                className={`flex-shrink-0 px-1.5 py-0.5 text-xs font-medium rounded ${
                  statusColors[c.clinicalStatus] || 'bg-gray-100 text-gray-600'
                }`}
              >
                {c.clinicalStatus}
              </span>
            </li>
          ))}
        </ul>
      )}
    </CollapsibleSection>
  )
}
