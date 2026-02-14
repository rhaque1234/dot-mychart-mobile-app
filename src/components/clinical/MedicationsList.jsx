import CollapsibleSection from './CollapsibleSection'

export default function MedicationsList({ items }) {
  return (
    <CollapsibleSection title="Medications" count={items.length} defaultOpen={true}>
      {items.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No active medications on file</p>
      ) : (
        <ul className="space-y-3">
          {items.map((med) => (
            <li key={med.id} className="border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-gray-800">{med.name}</p>
                <span className="flex-shrink-0 px-1.5 py-0.5 text-xs font-medium rounded bg-green-100 text-green-700">
                  {med.status}
                </span>
              </div>
              {(med.dosage || med.frequency || med.route) && (
                <p className="text-xs text-gray-500 mt-1">
                  {[med.dosage, med.frequency, med.route].filter(Boolean).join(' \u00B7 ')}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </CollapsibleSection>
  )
}
