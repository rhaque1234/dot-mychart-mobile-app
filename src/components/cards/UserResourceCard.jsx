import { useEffect, useState } from 'react'
import CardShell from '../layout/CardShell'
import JsonViewer from '../ui/JsonViewer'
import LoadingSpinner from '../ui/LoadingSpinner'
import ErrorAlert from '../ui/ErrorAlert'
import StatusBadge from '../ui/StatusBadge'
import { decodeJwtPayload } from '../../lib/jwtDecode'

export default function UserResourceCard({ client }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mode, setMode] = useState('json')

  useEffect(() => {
    const idToken = client.state.tokenResponse?.id_token
    const payload = decodeJwtPayload(idToken)
    const fhirUser = payload?.fhirUser || payload?.profile

    if (!fhirUser) {
      setError('No fhirUser claim in ID token. Requires openid + fhirUser scopes.')
      setLoading(false)
      return
    }

    client
      .request(fhirUser)
      .then(setData)
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false))
  }, [client])

  if (loading) return <CardShell title="User FHIR Resource"><LoadingSpinner /></CardShell>
  if (error) return <CardShell title="User FHIR Resource"><ErrorAlert message={error} /></CardShell>

  return (
    <CardShell
      title="User FHIR Resource"
      badge={data?.resourceType && <StatusBadge label={data.resourceType} variant="info" />}
      mode={mode}
      onModeChange={setMode}
    >
      <JsonViewer data={data} />
    </CardShell>
  )
}
