import CollapsibleSection from './CollapsibleSection'

export default function MedicationsList({ items }) {
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || ''
    if (statusLower === 'active') return 'bg-green-100 text-green-800 border-green-200'
    if (statusLower === 'completed') return 'bg-gray-100 text-gray-700 border-gray-200'
    if (statusLower === 'stopped') return 'bg-red-100 text-red-800 border-red-200'
    return 'bg-blue-100 text-blue-800 border-blue-200'
  }

  return (
    <CollapsibleSection title="Medications" count={items.length} defaultOpen={true}>
      {items.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <p className="text-sm text-gray-500 font-medium">No active medications on file</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((med, index) => (
            <div
              key={med.id}
              className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold text-gray-900 truncate">{med.name}</p>
                  </div>
                  {(med.dosage || med.frequency || med.route) && (
                    <div className="ml-8 space-y-0.5">
                      {med.dosage && (
                        <p className="text-xs text-gray-700">
                          <span className="font-semibold">Dose:</span> {med.dosage}
                        </p>
                      )}
                      {med.frequency && (
                        <p className="text-xs text-gray-700">
                          <span className="font-semibold">Frequency:</span> {med.frequency}
                        </p>
                      )}
                      {med.route && (
                        <p className="text-xs text-gray-600">
                          <span className="font-semibold">Route:</span> {med.route}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <span className={`flex-shrink-0 px-2.5 py-1 text-xs font-bold rounded-md border ${getStatusColor(med.status)}`}>
                  {med.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </CollapsibleSection>
  )
}
