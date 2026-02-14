import PatientBanner from './PatientBanner'
import MedicationsList from './MedicationsList'
import ConditionsList from './ConditionsList'
import AllergiesList from './AllergiesList'
import VitalsList from './VitalsList'
import LabsList from './LabsList'
import LoadingSpinner from '../ui/LoadingSpinner'
import ErrorAlert from '../ui/ErrorAlert'

export default function ClinicalSidebar({
  patient,
  medications,
  conditions,
  allergies,
  vitals,
  labs,
  loading,
  error,
  isOpen,
  onToggle,
}) {
  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-500 to-green-500 text-white p-4 rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all border-2 border-white hover:scale-110"
        aria-label="Toggle clinical sidebar"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
        </svg>
      </button>

      {/* Sidebar panel */}
      <aside
        className={`
          fixed inset-y-0 right-0 z-40 w-80 bg-white border-l border-gray-200 shadow-2xl transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-auto lg:shadow-none lg:z-auto lg:border-0
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Mobile close button */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
          <span className="text-sm font-bold text-white uppercase tracking-wide">Clinical Data</span>
          <button
            onClick={onToggle}
            className="text-white hover:text-indigo-100"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="h-full overflow-y-auto p-4 space-y-4 chat-scroll bg-gray-50">
          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner message="Loading clinical data..." />
            </div>
          ) : error ? (
            <ErrorAlert message={error} />
          ) : (
            <>
              <PatientBanner patient={patient} />
              <MedicationsList items={medications} />
              <ConditionsList items={conditions} />
              <AllergiesList items={allergies} />
              <VitalsList items={vitals} />
              <LabsList items={labs} />
            </>
          )}
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  )
}
