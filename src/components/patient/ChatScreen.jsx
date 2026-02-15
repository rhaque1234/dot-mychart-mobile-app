import { useEffect, useRef, useState } from 'react'

export default function ChatScreen({ currentSession, isConnected }) {
  const messagesEndRef = useRef(null)
  const [activeTab, setActiveTab] = useState('messages')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentSession?.events])

  const events = currentSession?.events || []
  const conversationEvents = events.filter(e => e.event_type === 'user_message' || e.event_type === 'agent_response')

  // Mock conversation topics
  const topics = [
    { title: 'Medication Reminders', count: 12, icon: '💊', hasAlert: false },
    { title: 'Health Check-ins', count: 8, icon: '❤️', hasAlert: false },
    { title: 'Vitals Monitoring', count: 15, icon: '📊', hasAlert: true, alertText: 'Check blood pressure' },
    { title: 'Wellness Tips', count: 6, icon: '✨', hasAlert: false },
    { title: 'Appointments', count: 3, icon: '📅', hasAlert: true, alertText: 'Next visit: Tomorrow' }
  ]

  return (
    <div className="flex-1 overflow-auto bg-[#F5F1E8] flex flex-col">
      {/* Header */}
      <div className="bg-[#F5F1E8] px-6 pt-6 pb-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Conversations</h1>
            <button className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-gray-700 shadow-sm border border-gray-200">
              Add
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b-2 border-gray-300">
            <button
              onClick={() => setActiveTab('messages')}
              className={`pb-3 px-1 font-semibold transition-colors relative ${
                activeTab === 'messages' ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              Messages
              {activeTab === 'messages' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('topics')}
              className={`pb-3 px-1 font-semibold transition-colors relative ${
                activeTab === 'topics' ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              Topics
              {activeTab === 'topics' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto pb-24">
        {activeTab === 'topics' ? (
          <div className="max-w-lg mx-auto px-6 pt-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium">WITH DOT ({topics.length})</span>
              </div>
            </div>

            <div className="space-y-3">
              {topics.map((topic, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{topic.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">{topic.title}</div>
                      {topic.hasAlert ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{topic.alertText}</span>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-600">{topic.count} conversations</div>
                      )}
                    </div>
                    {topic.hasAlert && (
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-[#FFB84D]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 px-4 pt-6">
            {!isConnected ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-20 h-20 rounded-full bg-[#FFD4B8]/30 flex items-center justify-center mb-4 animate-pulse">
                  <div className="w-12 h-12 rounded-full bg-[#FFD4B8]"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Connecting to Dot...</h3>
                <p className="text-sm text-gray-600">Please wait while we establish connection</p>
              </div>
            ) : conversationEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFD4B8] to-[#FFE5D4] flex items-center justify-center mb-4">
                  <span className="text-4xl">💬</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Say "Hey Dot" to start</h3>
                <p className="text-sm text-gray-600">Your conversations will appear here</p>
              </div>
            ) : (
              <div className="max-w-lg mx-auto space-y-4">
                {conversationEvents.map((event, index) => {
                  const isUser = event.event_type === 'user_message'
                  return (
                    <div
                      key={index}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Avatar */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isUser
                            ? 'bg-gradient-to-br from-[#FFD4B8] to-[#FFE5D4]'
                            : 'bg-white border-2 border-[#FFD4B8]'
                        }`}>
                          {isUser ? (
                            <span className="text-lg">👤</span>
                          ) : (
                            <span className="text-lg">🤖</span>
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div>
                          <div className={`rounded-2xl px-4 py-3 ${
                            isUser
                              ? 'bg-gradient-to-r from-[#FFD4B8] to-[#FFE5D4] text-gray-900'
                              : 'bg-white text-gray-900 border border-gray-200'
                          }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{event.content}</p>
                          </div>
                          <div className={`flex items-center gap-1 mt-1 px-2 ${
                            isUser ? 'justify-end' : 'justify-start'
                          }`}>
                            <span className="text-xs text-gray-500">
                              {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      {activeTab === 'messages' && (
        <div className="border-t border-gray-200 bg-white p-4 pb-20">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-3 bg-[#F5F1E8] rounded-full px-4 py-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span className="flex-1 text-sm text-gray-500">Speak to Dot...</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD4B8] to-[#FFE5D4] flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
