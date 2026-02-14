import FhirServerCard from '../cards/FhirServerCard'
import SmartConfigCard from '../cards/SmartConfigCard'
import AccessTokenCard from '../cards/AccessTokenCard'
import IdTokenCard from '../cards/IdTokenCard'
import RefreshTokenCard from '../cards/RefreshTokenCard'
import UserResourceCard from '../cards/UserResourceCard'
import PatientResourceCard from '../cards/PatientResourceCard'
import EncounterResourceCard from '../cards/EncounterResourceCard'

export default function DashboardLayout({ client }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            SMART on FHIR Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Connected to{' '}
            <span className="font-mono text-gray-700">
              {client.state.serverUrl}
            </span>
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <FhirServerCard client={client} />
          <SmartConfigCard client={client} />
          <AccessTokenCard client={client} />
          <IdTokenCard client={client} />
          <RefreshTokenCard client={client} />
          <UserResourceCard client={client} />
          <PatientResourceCard client={client} />
          <EncounterResourceCard client={client} />
        </div>
      </main>
    </div>
  )
}
