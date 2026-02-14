export default function PatientBanner({ patient }) {
  if (!patient) return null

  return (
    <div className="bg-white border-2 border-blue-600 rounded-lg shadow-sm overflow-hidden">
      {/* Header strip */}
      <div className="bg-blue-600 px-4 py-2 flex items-center justify-between">
        <span className="text-white text-xs font-semibold uppercase tracking-wide">Patient Information</span>
        <div className="flex items-center gap-1.5 bg-blue-700 px-2 py-0.5 rounded">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span className="text-white text-xs font-medium">Active</span>
        </div>
      </div>

      {/* Patient details */}
      <div className="p-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-xl font-bold shadow-md ring-4 ring-blue-100">
            {patient.firstName?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900 truncate">{patient.name}</h2>
            <div className="mt-1 space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="font-medium">Age:</span>
                <span>{patient.age ? `${patient.age} years` : 'N/A'}</span>
                {patient.gender && (
                  <>
                    <span className="text-gray-400">|</span>
                    <span className="font-medium">Sex:</span>
                    <span className="capitalize">{patient.gender}</span>
                  </>
                )}
              </div>
              {patient.birthDate && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">DOB:</span>
                  <span>{patient.birthDate}</span>
                </div>
              )}
              {patient.mrn && (
                <div className="flex items-center gap-2 text-xs text-gray-600 bg-white px-2 py-1 rounded border border-gray-200 font-mono inline-block">
                  <span className="font-semibold text-gray-700">MRN:</span>
                  <span className="text-blue-700 font-bold">{patient.mrn}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
