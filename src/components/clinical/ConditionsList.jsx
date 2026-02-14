import CollapsibleSection from './CollapsibleSection'

const statusColors = {
  active: 'bg-red-100 text-red-800 border-red-200',
  recurrence: 'bg-orange-100 text-orange-800 border-orange-200',
  relapse: 'bg-orange-100 text-orange-800 border-orange-200',
  inactive: 'bg-gray-100 text-gray-700 border-gray-200',
  remission: 'bg-green-100 text-green-800 border-green-200',
  resolved: 'bg-green-100 text-green-800 border-green-200',
}

export default function ConditionsList({ items }) {
  return (
    <CollapsibleSection title="Medical Conditions" count={items.length} defaultOpen={true}>
      {items.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-sm text-gray-500 font-medium">No conditions on file</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((c) => (
            <div
              key={c.id}
              className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 truncate">{c.display}</p>
                </div>
                <span
                  className={`flex-shrink-0 px-2.5 py-1 text-xs font-bold rounded-md border ${
                    statusColors[c.clinicalStatus] || 'bg-gray-100 text-gray-600 border-gray-200'
                  }`}
                >
                  {c.clinicalStatus?.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </CollapsibleSection>
  )
}
