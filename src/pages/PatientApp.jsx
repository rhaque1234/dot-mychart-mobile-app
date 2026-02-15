import { useState, useEffect } from 'react'
import useConversationWebSocket from '../hooks/useConversationWebSocket'
import BottomNavigation from '../components/patient/BottomNavigation'
import HomeScreen from '../components/patient/HomeScreen'
import ChatScreen from '../components/patient/ChatScreen'
import InsightsScreen from '../components/patient/InsightsScreen'
import ActivityScreen from '../components/patient/ActivityScreen'

export default function PatientApp() {
  const {
    isConnected,
    conversations,
    currentSession,
    error,
    listSessions,
    subscribe,
    getSession
  } = useConversationWebSocket()

  const [activeScreen, setActiveScreen] = useState('home')
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false)
  const [emergencySent, setEmergencySent] = useState(false)

  // Load sessions on connect
  useEffect(() => {
    if (isConnected) {
      listSessions(1) // Get the most recent session
      subscribe() // Subscribe to live events
    }
  }, [isConnected, listSessions, subscribe])

  // Auto-select the latest session
  useEffect(() => {
    if (conversations.length > 0 && !currentSession) {
      getSession(conversations[0].session_id)
    }
  }, [conversations, currentSession, getSession])

  const handleEmergencyClick = () => {
    setShowEmergencyDialog(true)
  }

  const confirmEmergency = () => {
    setEmergencySent(true)
    setShowEmergencyDialog(false)
    setTimeout(() => setEmergencySent(false), 5000)
  }

  const handleNavigate = (screen) => {
    setActiveScreen(screen)
  }

  const events = currentSession?.events || []
  const conversationEvents = events.filter(e => e.event_type === 'user_message' || e.event_type === 'agent_response')

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Emergency Success Banner */}
      {emergencySent && (
        <div className="bg-[#B4D455] text-white px-4 py-3 text-center font-semibold animate-pulse fixed top-0 left-0 right-0 z-[100]">
          ✓ Your nurse has been notified and will call you shortly
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="bg-[#FFF0E5] border-b border-[#FFD4B8] px-4 py-3 fixed top-0 left-0 right-0 z-[100]">
          <div className="flex items-center gap-2 text-gray-800 max-w-lg mx-auto">
            <svg className="w-5 h-5 text-[#FFB84D]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {activeScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            isConnected={isConnected}
            messageCount={conversationEvents.length}
            onEmergencyClick={handleEmergencyClick}
            currentSession={currentSession}
          />
        )}
        {activeScreen === 'chat' && (
          <ChatScreen
            currentSession={currentSession}
            isConnected={isConnected}
          />
        )}
        {activeScreen === 'insights' && (
          <InsightsScreen />
        )}
        {activeScreen === 'activity' && (
          <ActivityScreen
            conversations={conversations}
            currentSession={currentSession}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
      />

      {/* Emergency Dialog */}
      {showEmergencyDialog && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[90]"
            onClick={() => setShowEmergencyDialog(false)}
          />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[90] max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FFE5E5] flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Alert Your Nurse?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    This will immediately notify your care team. They will call you shortly to help.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowEmergencyDialog(false)}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmEmergency}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FF8787] hover:from-[#FF5555] hover:to-[#FF7777] text-white rounded-2xl font-semibold shadow-lg"
                    >
                      Send Alert
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
