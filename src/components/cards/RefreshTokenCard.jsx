import { useState } from 'react'
import CardShell from '../layout/CardShell'
import JsonViewer from '../ui/JsonViewer'
import StatusBadge from '../ui/StatusBadge'
import { decodeJwtPayload } from '../../lib/jwtDecode'

export default function RefreshTokenCard({ client }) {
  const [mode, setMode] = useState('html')
  const refreshToken = client.state.tokenResponse?.refresh_token

  if (!refreshToken) {
    return (
      <CardShell title="Refresh Token">
        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
          <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-red-800 font-medium text-sm">No refresh_token obtained</p>
            <p className="text-red-600 text-xs mt-1">
              The refresh_token is only provided to apps using the offline_access or online_access scope.
            </p>
          </div>
        </div>
      </CardShell>
    )
  }

  const decoded = decodeJwtPayload(refreshToken)

  return (
    <CardShell
      title="Refresh Token"
      badge={<StatusBadge label="Obtained" variant="success" />}
      mode={mode}
      onModeChange={setMode}
    >
      {mode === 'json' ? (
        <JsonViewer data={decoded || { raw: refreshToken }} />
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            A refresh token was obtained. It can be used to request new access tokens.
          </p>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs font-mono break-all text-gray-700">{refreshToken}</p>
          </div>
        </div>
      )}
    </CardShell>
  )
}
