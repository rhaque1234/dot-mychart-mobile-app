import { useState } from 'react'
import CardShell from '../layout/CardShell'
import DataRow from '../ui/DataRow'
import JsonViewer from '../ui/JsonViewer'
import ClipText from '../ui/ClipText'
import CountdownBadge from '../ui/CountdownBadge'
import { TOKEN_DESCRIPTIONS } from '../../lib/smartConfig'
import { decodeJwtPayload } from '../../lib/jwtDecode'

export default function AccessTokenCard({ client }) {
  const [mode, setMode] = useState('html')
  const tokenResponse = client.state.tokenResponse || {}

  const payload = decodeJwtPayload(tokenResponse.access_token)
  const expiresAt = payload?.exp || (Date.now() / 1000 + (tokenResponse.expires_in || 0))

  const scopeList = tokenResponse.scope?.split(' ').filter(Boolean) || []

  return (
    <CardShell
      title="Access Token Response"
      badge={<CountdownBadge expiresAt={expiresAt} />}
      mode={mode}
      onModeChange={setMode}
    >
      {mode === 'json' ? (
        <JsonViewer data={tokenResponse} />
      ) : (
        <dl>
          <DataRow label="access_token" description={TOKEN_DESCRIPTIONS.access_token}>
            <ClipText text={tokenResponse.access_token} maxLength={60} />
          </DataRow>
          <DataRow label="token_type" description={TOKEN_DESCRIPTIONS.token_type}>
            <code className="px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded text-xs">
              {tokenResponse.token_type || 'Bearer'}
            </code>
          </DataRow>
          <DataRow label="expires_in" description={TOKEN_DESCRIPTIONS.expires_in}>
            <span className="text-sm font-semibold text-blue-700">{tokenResponse.expires_in}</span>
          </DataRow>
          <DataRow label="scope" description={TOKEN_DESCRIPTIONS.scope}>
            <div className="flex flex-wrap gap-1">
              {scopeList.map((s) => (
                <code key={s} className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs">{s}</code>
              ))}
            </div>
          </DataRow>
          {tokenResponse.id_token && (
            <DataRow label="id_token" description={TOKEN_DESCRIPTIONS.id_token}>
              <ClipText text={tokenResponse.id_token} maxLength={60} />
            </DataRow>
          )}
          <DataRow label="need_patient_banner" description={TOKEN_DESCRIPTIONS.need_patient_banner}>
            <span className={`font-semibold text-sm ${tokenResponse.need_patient_banner ? 'text-green-600' : 'text-gray-500'}`}>
              {String(tokenResponse.need_patient_banner)}
            </span>
          </DataRow>
          {tokenResponse.smart_style_url && (
            <DataRow label="smart_style_url" description={TOKEN_DESCRIPTIONS.smart_style_url}>
              <a href={tokenResponse.smart_style_url} className="text-blue-600 hover:underline text-sm font-mono break-all" target="_blank" rel="noreferrer">
                {tokenResponse.smart_style_url}
              </a>
            </DataRow>
          )}
          <DataRow label="patient" description={TOKEN_DESCRIPTIONS.patient}>
            <code className="px-1.5 py-0.5 bg-sky-50 text-sky-700 rounded text-xs font-mono">
              {tokenResponse.patient || 'N/A'}
            </code>
          </DataRow>
          {tokenResponse.encounter && (
            <DataRow label="encounter" description={TOKEN_DESCRIPTIONS.encounter}>
              <code className="px-1.5 py-0.5 bg-sky-50 text-sky-700 rounded text-xs font-mono">
                {tokenResponse.encounter}
              </code>
            </DataRow>
          )}
        </dl>
      )}
    </CardShell>
  )
}
