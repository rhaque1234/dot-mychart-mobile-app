import { useEffect, useState } from 'react'
import CardShell from '../layout/CardShell'
import JsonViewer from '../ui/JsonViewer'
import LoadingSpinner from '../ui/LoadingSpinner'
import ErrorAlert from '../ui/ErrorAlert'
import StatusBadge from '../ui/StatusBadge'

export default function PatientResourceCard({ client }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mode, setMode] = useState('json')

  useEffect(() => {
    if (!client.patient?.id) {
      setError('No patient context selected.')
      setLoading(false)
      return
    }

    client.patient
      .read()
      .then(setData)
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false))
  }, [client])

  if (loading) return <CardShell title="Patient FHIR Resource"><LoadingSpinner /></CardShell>
  if (error) return <CardShell title="Patient FHIR Resource"><ErrorAlert message={error} /></CardShell>

  return (
    <CardShell
      title="Patient FHIR Resource"
      badge={<StatusBadge label="Patient" variant="success" />}
      mode={mode}
      onModeChange={setMode}
    >
      <JsonViewer data={data} />
    </CardShell>
  )
}
