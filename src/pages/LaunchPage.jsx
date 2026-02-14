import { useEffect, useState } from 'react'
import FHIR from 'fhirclient'
import { SMART_SCOPES } from '../lib/smartConfig'

export default function LaunchPage() {
  const [error, setError] = useState(null)

  useEffect(() => {
    FHIR.oauth2
      .authorize({
        clientId: 'whatever',
        scope: SMART_SCOPES,
        redirectUri: window.location.origin + '/',
        completeInTarget: true,
      })
      .catch((err) => setError(err.message || String(err)))
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
          <h2 className="text-red-600 text-xl font-bold mb-2">Launch Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex items-center gap-3 text-gray-500">
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Redirecting to authorization server...
      </div>
    </div>
  )
}
