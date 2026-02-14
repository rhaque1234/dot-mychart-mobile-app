import CollapsibleSection from './CollapsibleSection'

const criticalityColors = {
  high: 'bg-red-100 text-red-800 border-red-300',
  low: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'unable-to-assess': 'bg-gray-100 text-gray-700 border-gray-300',
}

export default function AllergiesList({ items }) {
  return (
    <CollapsibleSection title="Allergies & Reactions" count={items.length}>
      {items.length === 0 ? (
        <div className="text-center py-6 bg-green-50 rounded-lg border-2 border-green-200">
          <svg className="w-10 h-10 text-green-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-green-700 font-bold">No Known Allergies</p>
          <p className="text-xs text-green-600 mt-1">Patient has no documented allergies</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((a) => (
            <div
              key={a.id}
              className="bg-white border-2 border-red-200 rounded-lg p-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm font-bold text-gray-900">{a.substance}</p>
                    {a.criticality && (
                      <span
                        className={`flex-shrink-0 px-2.5 py-1 text-xs font-bold rounded-md border ${
                          criticalityColors[a.criticality] || 'bg-gray-100 text-gray-600 border-gray-300'
                        }`}
                      >
                        {a.criticality.toUpperCase()}
                      </span>
                    )}
                  </div>
                  {a.reaction && (
                    <p className="text-xs text-gray-700 bg-red-50 px-2 py-1 rounded">
                      <span className="font-semibold">Reaction:</span> {a.reaction}
                    </p>
                  )}
                  {a.category && (
                    <p className="text-xs text-gray-600 mt-1">
                      <span className="font-semibold">Category:</span> {a.category}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </CollapsibleSection>
  )
}
