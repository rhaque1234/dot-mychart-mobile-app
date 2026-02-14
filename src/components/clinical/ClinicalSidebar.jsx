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
        className="lg:hidden fixed bottom-20 right-4 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        aria-label="Toggle clinical sidebar"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </button>

      {/* Sidebar panel */}
      <aside
        className={`
          fixed inset-y-0 right-0 z-40 w-80 bg-white border-l border-gray-200 shadow-xl transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-auto lg:shadow-none lg:z-auto
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Mobile close button */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
          <span className="text-sm font-semibold text-gray-700">Clinical Context</span>
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="h-full overflow-y-auto p-4 space-y-4 chat-scroll">
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
