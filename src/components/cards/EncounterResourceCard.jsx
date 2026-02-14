import { useEffect, useState } from 'react'
import CardShell from '../layout/CardShell'
import JsonViewer from '../ui/JsonViewer'
import LoadingSpinner from '../ui/LoadingSpinner'
import StatusBadge from '../ui/StatusBadge'

export default function EncounterResourceCard({ client }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mode, setMode] = useState('json')

  useEffect(() => {
    if (!client.encounter?.id) {
      setError('Encounter is not available')
      setLoading(false)
      return
    }

    client.encounter
      .read()
      .then(setData)
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false))
  }, [client])

  if (loading) return <CardShell title="Encounter FHIR Resource"><LoadingSpinner /></CardShell>

  if (error) {
    return (
      <CardShell
        title="Encounter FHIR Resource"
        badge={<StatusBadge label="Error" variant="error" />}
      >
        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <p className="text-amber-800 font-medium text-sm">Error: {error}</p>
            <p className="text-amber-600 text-xs mt-1">
              Encounter context is often not available in standalone launches or when no encounter is selected.
            </p>
          </div>
        </div>
      </CardShell>
    )
  }

  return (
    <CardShell
      title="Encounter FHIR Resource"
      badge={<StatusBadge label="Encounter" variant="success" />}
      mode={mode}
      onModeChange={setMode}
    >
      <JsonViewer data={data} />
    </CardShell>
  )
}
