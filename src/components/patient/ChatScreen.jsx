import { useEffect, useRef, useState } from 'react'
import { conversationTopics, recentMessages } from '../../lib/mockPatientData'

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

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header - Soft White with .dot branding */}
      <div className="bg-white border-b border-gray-200 px-6 pt-8 pb-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-900"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">.dot</h1>
            </div>
            <button
              onClick={() => setActiveTab('messages')}
              className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              New
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('messages')}
              className={`pb-3 px-1 font-bold transition-all relative ${
                activeTab === 'messages' ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              Messages
              {activeTab === 'messages' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 rounded-full"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('topics')}
              className={`pb-3 px-1 font-bold transition-all relative ${
                activeTab === 'topics' ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              Topics
              {activeTab === 'topics' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 rounded-full"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto pb-24">
        {activeTab === 'topics' ? (
          <div className="max-w-lg mx-auto px-6 pt-6">
            <div className="mb-6">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">
                Recent Topics ({conversationTopics.length})
              </h2>
            </div>

            <div className="space-y-3">
              {conversationTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveTab('messages')}
                  className="w-full bg-white hover:bg-gray-50 rounded-[24px] p-5 border border-gray-200 hover:border-gray-900 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      topic.hasAlert ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      {topic.hasAlert ? (
                        <svg className="w-7 h-7 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                      ) : (
                        <svg className="w-7 h-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-bold text-gray-900 mb-1 text-lg">{topic.title}</div>
                      <div className="text-sm text-gray-600">{topic.lastMessage}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-medium text-gray-500">{topic.displayTime}</span>
                        <span className="text-gray-400">•</span>
                        <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                          {topic.category}
                        </span>
                        {topic.unread > 0 && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="px-2 py-0.5 bg-gray-900 rounded-full text-xs font-bold text-white">
                              {topic.unread}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 px-4 pt-6">
            {!isConnected ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-900 animate-pulse"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Connecting to .dot...</h3>
                <p className="text-sm text-gray-600">Please wait while we establish connection</p>
              </div>
            ) : conversationEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-24 h-24 rounded-full bg-gray-900 flex items-center justify-center mb-6 shadow-lg shadow-gray-900/20">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Say "Hey .dot" to start</h3>
                <p className="text-sm text-gray-600 mb-8">Your conversations will appear here</p>

                {/* Recent Messages Preview */}
                <div className="w-full max-w-md">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-left px-2">Recent Messages</h4>
                  <div className="space-y-3">
                    {recentMessages.map((msg) => (
                      <div key={msg.id} className="bg-white rounded-[20px] p-4 border border-gray-200 text-left shadow-sm">
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-bold text-gray-900">{msg.from}</span>
                          <span className="text-xs text-gray-500">{msg.displayTime}</span>
                        </div>
                        <p className="text-sm text-gray-700">{msg.message}</p>
                        {!msg.isRead && (
                          <div className="mt-2">
                            <span className="inline-block px-2 py-0.5 bg-gray-900 rounded-full text-xs font-bold text-white">
                              New
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
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
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                          isUser
                            ? 'bg-gray-100 border-2 border-gray-900'
                            : 'bg-gray-900'
                        }`}>
                          {isUser ? (
                            <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          ) : (
                            <div className="flex gap-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                            </div>
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div>
                          <div className={`rounded-[20px] px-5 py-3 shadow-sm ${
                            isUser
                              ? 'bg-gray-900 text-white'
                              : 'bg-white border border-gray-200 text-gray-900'
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

      {/* Voice Input */}
      {activeTab === 'messages' && (
        <div className="border-t border-gray-200 bg-white p-4 pb-20 shadow-sm">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-3 bg-gray-50 rounded-full px-6 py-4 border border-gray-200">
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span className="flex-1 text-sm font-medium text-gray-600">Speak to .dot...</span>
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-all cursor-pointer shadow-md">
                <div className="w-4 h-4 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
