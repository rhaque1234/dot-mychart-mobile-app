export default function PatientBanner({ patient }) {
  if (!patient) return null

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl p-4 text-white">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
          {patient.firstName?.[0]?.toUpperCase() || '?'}
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-bold truncate">{patient.name}</h2>
          <p className="text-blue-100 text-sm">
            {patient.age && `${patient.age} yrs`}
            {patient.gender && ` \u00B7 ${patient.gender}`}
            {patient.birthDate && ` \u00B7 DOB: ${patient.birthDate}`}
          </p>
          {patient.mrn && (
            <p className="text-blue-200 text-xs mt-0.5 font-mono">
              MRN: {patient.mrn}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
