import { useState } from 'react'
import CardShell from '../layout/CardShell'
import DataRow from '../ui/DataRow'
import JsonViewer from '../ui/JsonViewer'
import CountdownBadge from '../ui/CountdownBadge'
import { decodeJwtPayload, decodeJwtHeader } from '../../lib/jwtDecode'

export default function IdTokenCard({ client }) {
  const [mode, setMode] = useState('html')

  const raw = client.state.tokenResponse?.id_token
  const payload = decodeJwtPayload(raw)
  const headers = decodeJwtHeader(raw)

  if (!raw || !payload) {
    return (
      <CardShell title="ID Token">
        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-amber-800 font-medium text-sm">No ID Token</p>
            <p className="text-amber-600 text-xs mt-1">
              The id_token is a JWT that comes with the token response and contains
              information about the current user. Requires openid and fhirUser scopes.
            </p>
          </div>
        </div>
      </CardShell>
    )
  }

  const formatTimestamp = (ts) => {
    if (!ts) return 'N/A'
    const d = new Date(ts * 1000)
    return `${ts} (${d.toLocaleDateString()} ${d.toLocaleTimeString()})`
  }

  return (
    <CardShell
      title="ID Token"
      badge={payload.exp ? <CountdownBadge expiresAt={payload.exp} /> : null}
      mode={mode}
      onModeChange={setMode}
    >
      {mode === 'json' ? (
        <JsonViewer data={{ headers, payload }} />
      ) : (
        <>
          <h4 className="text-sm font-semibold text-gray-600 mb-3">ID Token Claims</h4>
          <dl>
            <DataRow label="profile" description="User identifier (same as fhirUser for backwards compatibility)">
              <a href="#" className="text-blue-600 hover:underline text-sm font-mono">{payload.profile || payload.fhirUser || 'N/A'}</a>
            </DataRow>
            <DataRow label="fhirUser" description="User identifier (same as profile for backwards compatibility)">
              <a href="#" className="text-blue-600 hover:underline text-sm font-mono">{payload.fhirUser || payload.profile || 'N/A'}</a>
            </DataRow>
            <DataRow label="iss" description="Issuer Identifier for the Issuer of the response.">
              <span className="text-sm font-mono break-all text-gray-700">{payload.iss}</span>
            </DataRow>
            <DataRow label="iat" description="Time at which the JWT was issued.">
              <span className="text-sm font-mono text-blue-700">{formatTimestamp(payload.iat)}</span>
            </DataRow>
            <DataRow label="exp" description="Expiration time on or after which the ID Token MUST NOT be accepted.">
              <span className="text-sm font-mono text-blue-700">{formatTimestamp(payload.exp)}</span>
            </DataRow>
            <DataRow label="aud" description="Audience(s) that this ID Token is intended for. It MUST contain the OAuth 2.0 client_id.">
              <code className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">{payload.aud}</code>
            </DataRow>
            <DataRow label="sub" description="Subject Identifier. A locally unique and never reassigned identifier.">
              <span className="text-sm font-mono break-all text-green-700">{payload.sub}</span>
            </DataRow>
            <DataRow label="nonce" description="String value used to associate a Client session with an ID Token.">
              <span className="text-sm font-mono text-gray-700">{payload.nonce || 'undefined'}</span>
            </DataRow>
          </dl>

          {headers && (
            <>
              <h4 className="text-sm font-semibold text-gray-600 mt-6 mb-3">ID Token Headers</h4>
              <dl>
                {Object.entries(headers).map(([key, val]) => (
                  <DataRow key={key} label={key}>
                    <code className="px-1.5 py-0.5 bg-red-50 text-red-700 rounded text-xs">{String(val)}</code>
                  </DataRow>
                ))}
              </dl>
            </>
          )}
        </>
      )}
    </CardShell>
  )
}
