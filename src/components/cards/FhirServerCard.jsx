import { useEffect, useState } from 'react'
import CardShell from '../layout/CardShell'
import DataRow from '../ui/DataRow'
import JsonViewer from '../ui/JsonViewer'
import LoadingSpinner from '../ui/LoadingSpinner'
import ErrorAlert from '../ui/ErrorAlert'
import StatusBadge from '../ui/StatusBadge'

function extractOAuthUris(capabilityStatement) {
  const security = capabilityStatement?.rest?.[0]?.security
  const oauthExt = security?.extension?.find((e) =>
    e.url?.includes('oauth-uris')
  )
  if (!oauthExt?.extension) return {}
  const uris = {}
  for (const ext of oauthExt.extension) {
    uris[ext.url] = ext.valueUri
  }
  return uris
}

export default function FhirServerCard({ client }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mode, setMode] = useState('html')

  useEffect(() => {
    client
      .request('metadata')
      .then(setData)
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false))
  }, [client])

  if (loading)
    return (
      <CardShell title="FHIR Server">
        <LoadingSpinner />
      </CardShell>
    )
  if (error)
    return (
      <CardShell title="FHIR Server">
        <ErrorAlert message={error} />
      </CardShell>
    )

  const oauthUris = extractOAuthUris(data)
  const resources = data?.rest?.[0]?.resource?.map((r) => r.type) || []

  return (
    <CardShell
      title="FHIR Server"
      badge={<StatusBadge label={`FHIR ${data.fhirVersion}`} variant="info" />}
      mode={mode}
      onModeChange={setMode}
    >
      {mode === 'json' ? (
        <JsonViewer data={data} />
      ) : (
        <dl>
          <DataRow label="Software" value={`${data.software?.name || ''} ${data.software?.version || ''}`} />
          <DataRow label="Implementation" value={data.implementation?.description} />
          <DataRow label="URL">
            <a href={data.implementation?.url} className="text-blue-600 hover:underline text-sm font-mono break-all" target="_blank" rel="noreferrer">
              {data.implementation?.url}
            </a>
          </DataRow>
          <DataRow label="FHIR Version" value={data.fhirVersion} />
          <DataRow label="Supported Formats">
            <div className="flex flex-wrap gap-1">
              {data.format?.map((f) => (
                <code key={f} className="px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-xs">{f}</code>
              ))}
            </div>
          </DataRow>
          <DataRow label="Capability Statement">
            <span className="text-sm font-mono break-all text-gray-700">{client.state.serverUrl}/metadata</span>
          </DataRow>
          {oauthUris.authorize && (
            <DataRow label="authorize endpoint">
              <span className="text-sm font-mono break-all text-gray-700">{oauthUris.authorize}</span>
            </DataRow>
          )}
          {oauthUris.token && (
            <DataRow label="token endpoint">
              <span className="text-sm font-mono break-all text-gray-700">{oauthUris.token}</span>
            </DataRow>
          )}
          {oauthUris.introspect && (
            <DataRow label="introspect endpoint">
              <span className="text-sm font-mono break-all text-gray-700">{oauthUris.introspect}</span>
            </DataRow>
          )}
          <DataRow label="Supported Resources">
            <div className="flex flex-wrap gap-1 max-h-40 overflow-auto">
              {resources.map((r) => (
                <span key={r} className="text-xs text-gray-600">{r},</span>
              ))}
            </div>
          </DataRow>
        </dl>
      )}
    </CardShell>
  )
}
