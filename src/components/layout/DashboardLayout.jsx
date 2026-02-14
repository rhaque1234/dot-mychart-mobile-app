import { useState, useCallback, useEffect, useMemo } from 'react'
import useFhirPatientData from '../../hooks/useFhirPatientData'
import { buildSystemPrompt } from '../../lib/systemPromptBuilder'
import { sendChatMessage } from '../../lib/llmClient'
import ChatPanel from '../chat/ChatPanel'
import ClinicalSidebar from '../clinical/ClinicalSidebar'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function DashboardLayout({ client }) {
  const clinicalData = useFhirPatientData(client)
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Build system prompt once clinical data loads
  const systemPrompt = useMemo(
    () => (clinicalData.patient ? buildSystemPrompt(clinicalData) : null),
    [clinicalData]
  )

  // Send Dot's greeting when data is ready
  useEffect(() => {
    if (systemPrompt && messages.length === 0 && !clinicalData.loading) {
      const firstName = clinicalData.patient?.firstName || 'there'
      const medCount = clinicalData.medications?.length || 0

      const greeting =
        medCount > 0
          ? `Hi ${firstName}! I'm Dot, your medication companion. I can see you have ${medCount} active medication${medCount > 1 ? 's' : ''} on file. I'm here to help you stay on track and answer any questions about your health. How are you feeling today?`
          : `Hi ${firstName}! I'm Dot, your medication companion. I'm here to help you manage your health and answer any questions. How are you feeling today?`

      setMessages([
        {
          id: crypto.randomUUID(),
          role: 'dot',
          content: greeting,
          timestamp: Date.now(),
        },
      ])
    }
  }, [systemPrompt, clinicalData.loading])

  const handleSendMessage = useCallback(
    async (text) => {
      const userMsg = {
        id: crypto.randomUUID(),
        role: 'patient',
        content: text,
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, userMsg])
      setIsTyping(true)

      try {
        const allMessages = [...messages, userMsg]
        const response = await sendChatMessage(systemPrompt, allMessages)
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'dot',
            content: response,
            timestamp: Date.now(),
          },
        ])
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'system',
            content: `Error: ${err.message}`,
            timestamp: Date.now(),
          },
        ])
      } finally {
        setIsTyping(false)
      }
    },
    [messages, systemPrompt]
  )

  // Show loading state while FHIR data is being fetched
  if (clinicalData.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <LoadingSpinner message="Loading patient data from FHIR server..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              D
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Dot Caregiver Developer Console
              </h1>
              <p className="text-xs text-gray-500">
                Connected to{' '}
                <span className="font-mono text-gray-600">
                  {client.state.serverUrl}
                </span>
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            FHIR R4 &middot; Patient {client.patient?.id?.slice(0, 8)}...
          </div>
        </div>
      </header>

      {/* Main two-panel layout */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-[1600px] mx-auto w-full p-4 gap-4">
        {/* Chat panel - takes 2/3 on desktop */}
        <div className="flex-1 lg:w-2/3 min-h-0 flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>
          <ChatPanel
            messages={messages}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            patientName={clinicalData.patient?.name}
            disabled={!systemPrompt}
          />
        </div>

        {/* Clinical sidebar - takes 1/3 on desktop */}
        <div className="hidden lg:block lg:w-1/3 lg:max-w-md" style={{ height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
          <div className="space-y-4 chat-scroll h-full overflow-y-auto">
            <ClinicalSidebar
              patient={clinicalData.patient}
              medications={clinicalData.medications}
              conditions={clinicalData.conditions}
              allergies={clinicalData.allergies}
              vitals={clinicalData.vitals}
              labs={clinicalData.labs}
              loading={clinicalData.loading}
              error={clinicalData.error}
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
            />
          </div>
        </div>

        {/* Mobile sidebar (hidden on lg+) */}
        <div className="lg:hidden">
          <ClinicalSidebar
            patient={clinicalData.patient}
            medications={clinicalData.medications}
            conditions={clinicalData.conditions}
            allergies={clinicalData.allergies}
            vitals={clinicalData.vitals}
            labs={clinicalData.labs}
            loading={clinicalData.loading}
            error={clinicalData.error}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
      </main>
    </div>
  )
}
