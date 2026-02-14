import { useEffect, useState } from 'react'
import CardShell from '../layout/CardShell'
import DataRow from '../ui/DataRow'
import JsonViewer from '../ui/JsonViewer'
import LoadingSpinner from '../ui/LoadingSpinner'
import ErrorAlert from '../ui/ErrorAlert'

function CodeList({ items }) {
  if (!items?.length) return <span className="text-gray-400 italic">N/A</span>
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item) => (
        <code key={item} className="px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded text-xs">
          {item}
        </code>
      ))}
    </div>
  )
}

export default function SmartConfigCard({ client }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mode, setMode] = useState('html')

  useEffect(() => {
    client
      .request('.well-known/smart-configuration')
      .then(setData)
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false))
  }, [client])

  if (loading) return <CardShell title="SMART Configuration"><LoadingSpinner /></CardShell>
  if (error) return <CardShell title="SMART Configuration"><ErrorAlert message={error} /></CardShell>

  return (
    <CardShell title="SMART Configuration" mode={mode} onModeChange={setMode}>
      {mode === 'json' ? (
        <JsonViewer data={data} />
      ) : (
        <dl>
          <DataRow label="Authorization Endpoint">
            <span className="text-sm font-mono break-all text-gray-700">{data.authorization_endpoint}</span>
          </DataRow>
          <DataRow label="Token Endpoint">
            <span className="text-sm font-mono break-all text-gray-700">{data.token_endpoint}</span>
          </DataRow>
          {data.introspection_endpoint && (
            <DataRow label="Introspection Endpoint">
              <span className="text-sm font-mono break-all text-gray-700">{data.introspection_endpoint}</span>
            </DataRow>
          )}
          <DataRow label="Supported Code Challenge Methods">
            <CodeList items={data.code_challenge_methods_supported} />
          </DataRow>
          <DataRow label="Supported Token Auth Methods">
            <CodeList items={data.token_endpoint_auth_methods_supported} />
          </DataRow>
          <DataRow label="Supported Scopes">
            <CodeList items={data.scopes_supported} />
          </DataRow>
          <DataRow label="Supported Response Types">
            <CodeList items={data.response_types_supported} />
          </DataRow>
          <DataRow label="Capabilities">
            <CodeList items={data.capabilities} />
          </DataRow>
        </dl>
      )}
    </CardShell>
  )
}
