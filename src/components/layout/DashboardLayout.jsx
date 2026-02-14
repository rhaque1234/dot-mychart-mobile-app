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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-12 rounded-xl shadow-2xl border-2 border-blue-200">
          <LoadingSpinner message="Loading patient data from FHIR server..." />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Professional Medical Header */}
      <header className="bg-white border-b-2 border-blue-600 shadow-sm flex-shrink-0">
        <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-md">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                Clinical Care Dashboard
              </h1>
              <p className="text-xs text-gray-600 font-medium">
                FHIR-Enabled Patient Management System
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">FHIR Server</p>
              <p className="text-xs font-mono text-gray-700 mt-0.5">
                {client.state.serverUrl.replace('https://', '').split('/')[0]}
              </p>
            </div>
            <div className="h-10 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-sm" />
                <span className="text-xs font-semibold text-green-700">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main two-panel layout */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-[1800px] mx-auto w-full p-6 gap-6">
        {/* Chat panel - takes 2/3 on desktop */}
        <div className="flex-1 lg:w-2/3 min-h-0 flex flex-col shadow-lg rounded-lg overflow-hidden" style={{ height: 'calc(100vh - 96px)' }}>
          <ChatPanel
            messages={messages}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            patientName={clinicalData.patient?.name}
            disabled={!systemPrompt}
          />
        </div>

        {/* Clinical sidebar - takes 1/3 on desktop */}
        <div className="hidden lg:block lg:w-1/3 lg:max-w-lg" style={{ height: 'calc(100vh - 96px)', overflowY: 'auto' }}>
          <div className="space-y-4 chat-scroll h-full overflow-y-auto pr-2">
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
