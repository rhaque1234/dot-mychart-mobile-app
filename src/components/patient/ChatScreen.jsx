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
    <div className="flex-1 overflow-auto bg-white flex flex-col">
      {/* Header - Black Gradient */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 pt-8 pb-6 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">Conversations</h1>
            <button
              onClick={() => setActiveTab('messages')}
              className="px-5 py-2 bg-white text-gray-900 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all"
            >
              New
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('messages')}
              className={`pb-3 px-1 font-bold transition-all relative ${
                activeTab === 'messages' ? 'text-white' : 'text-gray-400'
              }`}
            >
              Messages
              {activeTab === 'messages' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('topics')}
              className={`pb-3 px-1 font-bold transition-all relative ${
                activeTab === 'topics' ? 'text-white' : 'text-gray-400'
              }`}
            >
              Topics
              {activeTab === 'topics' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full"></div>
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
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                RECENT TOPICS ({conversationTopics.length})
              </h2>
            </div>

            <div className="space-y-3">
              {conversationTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveTab('messages')}
                  className="w-full bg-white hover:bg-gray-50 rounded-2xl p-5 border-2 border-gray-200 hover:border-gray-900 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      topic.hasAlert ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      {topic.hasAlert ? (
                        <svg className="w-7 h-7 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                      ) : (
                        <svg className="w-7 h-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
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
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">Connecting to Dot...</h3>
                <p className="text-sm text-gray-600">Please wait while we establish connection</p>
              </div>
            ) : conversationEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-24 h-24 rounded-full bg-gray-900 flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Say "Hey Dot" to start</h3>
                <p className="text-sm text-gray-600 mb-8">Your conversations will appear here</p>

                {/* Recent Messages Preview */}
                <div className="w-full max-w-md">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-left">RECENT MESSAGES</h4>
                  <div className="space-y-3">
                    {recentMessages.map((msg) => (
                      <div key={msg.id} className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-left">
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
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isUser
                            ? 'bg-gray-200 border-2 border-gray-900'
                            : 'bg-gray-900'
                        }`}>
                          {isUser ? (
                            <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div>
                          <div className={`rounded-2xl px-5 py-3 ${
                            isUser
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-900'
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
        <div className="border-t-2 border-gray-200 bg-white p-4 pb-20">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-6 py-4 border-2 border-gray-900">
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span className="flex-1 text-sm font-medium text-gray-600">Speak to Dot...</span>
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-all cursor-pointer">
                <div className="w-4 h-4 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
