import { useEffect, useState } from 'react'
import FHIR from 'fhirclient'
import DashboardLayout from '../components/layout/DashboardLayout'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorAlert from '../components/ui/ErrorAlert'

export default function RedirectPage() {
  const [client, setClient] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    FHIR.oauth2
      .ready()
      .then((c) => setClient(c))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner message="Completing authorization..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-8">
        <ErrorAlert
          title="Authorization Failed"
          message={error.message || String(error)}
        />
      </div>
    )
  }

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-8">
        <ErrorAlert
          title="Client Error"
          message="Failed to initialize SMART client."
        />
      </div>
    )
  }

  return <DashboardLayout client={client} />
}
