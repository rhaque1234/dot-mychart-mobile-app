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
    <div className="flex-1 overflow-auto bg-[#FFFEF7] flex flex-col">
      {/* Header - Hero minimal style */}
      <div className="bg-[#FFFEF7] border-b-2 border-black px-8 pt-16 pb-8 sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-6xl font-bold text-black tracking-tight">.dot</h1>
            <button
              onClick={() => setActiveTab('messages')}
              className="px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              New
            </button>
          </div>

          {/* Tabs - minimal with underline */}
          <div className="flex gap-12">
            <button
              onClick={() => setActiveTab('messages')}
              className={`pb-3 font-medium transition-all relative ${
                activeTab === 'messages' ? 'text-black' : 'text-gray-600'
              }`}
            >
              Messages
              {activeTab === 'messages' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('topics')}
              className={`pb-3 font-medium transition-all relative ${
                activeTab === 'topics' ? 'text-black' : 'text-gray-600'
              }`}
            >
              Topics
              {activeTab === 'topics' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto pb-24">
        {activeTab === 'topics' ? (
          <div className="max-w-md mx-auto px-8 pt-8">
            <div className="mb-8">
              <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                Recent Topics ({conversationTopics.length})
              </h2>
            </div>

            <div className="space-y-3">
              {conversationTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveTab('messages')}
                  className="w-full border-2 border-gray-300 hover:border-black p-5 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 border-2 flex items-center justify-center ${
                      topic.hasAlert ? 'border-red-600' : 'border-black'
                    }`}>
                      {topic.hasAlert ? (
                        <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="square" strokeLinejoin="miter" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="square" strokeLinejoin="miter" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-bold text-black mb-1 text-lg">{topic.title}</div>
                      <div className="text-sm text-gray-600">{topic.lastMessage}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-medium text-gray-600">{topic.displayTime}</span>
                        <span className="text-gray-400">•</span>
                        <span className="px-2 py-1 border border-gray-300 text-xs font-medium text-black">
                          {topic.category}
                        </span>
                        {topic.unread > 0 && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="px-2 py-1 bg-black text-xs font-bold text-white">
                              {topic.unread}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-black flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 px-8 pt-8">
            {!isConnected ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="mb-8 animate-pulse">
                  <svg viewBox="0 0 120 60" className="w-32 h-16">
                    {/* Horizontal cylinder body */}
                    <ellipse cx="15" cy="30" rx="6" ry="14" fill="none" stroke="#000" strokeWidth="2" />
                    <line x1="15" y1="16" x2="105" y2="16" stroke="#000" strokeWidth="2" />
                    <line x1="15" y1="44" x2="105" y2="44" stroke="#000" strokeWidth="2" />
                    <ellipse cx="105" cy="30" rx="6" ry="14" fill="none" stroke="#000" strokeWidth="2" />

                    {/* Speaker grille opening */}
                    <ellipse cx="15" cy="30" rx="4" ry="10" fill="none" stroke="#000" strokeWidth="1.5" />

                    {/* Perforated holes - 3 rows */}
                    {/* Top row */}
                    <ellipse cx="35" cy="22" rx="3" ry="1.5" fill="#000" />
                    <ellipse cx="50" cy="22" rx="3" ry="1.5" fill="#000" />
                    <ellipse cx="65" cy="22" rx="3" ry="1.5" fill="#000" />
                    <ellipse cx="80" cy="22" rx="3" ry="1.5" fill="#000" />
                    <ellipse cx="95" cy="22" rx="3" ry="1.5" fill="#000" />

                    {/* Middle row */}
                    <ellipse cx="35" cy="30" rx="3" ry="1.5" fill="#000" />
                    <ellipse cx="50" cy="30" rx="3" ry="1.5" fill="#000" />
                    <ellipse cx="65" cy="30" rx="3" ry="1.5" fill="#000" />
                    <ellipse cx="80" cy="30" rx="3" ry="1.5" fill="#000" />
                    <ellipse cx="95" cy="30" rx="3" ry="1.5" fill="#000" />

                    {/* Bottom row */}
                    <ellipse cx="35" cy="38" rx="3" ry="1.5" fill="#000" />
                    <ellipse cx="50" cy="38" rx="3" ry="1.5" fill="#000" />
                    <ellipse cx="65" cy="38" rx="3" ry="1.5" fill="#000" />
                    <ellipse cx="80" cy="38" rx="3" ry="1.5" fill="#000" />
                    <ellipse cx="95" cy="38" rx="3" ry="1.5" fill="#000" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Connecting to .dot...</h3>
                <p className="text-sm text-gray-600">Please wait while we establish connection</p>
              </div>
            ) : conversationEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-24 h-24 border-2 border-black flex items-center justify-center mb-12">
                  <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">Say "Hey .dot" to start</h3>
                <p className="text-sm text-gray-600 mb-12">Your conversations will appear here</p>

                {/* Recent Messages Preview */}
                <div className="w-full max-w-md">
                  <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-4 text-left">Recent Messages</h4>
                  <div className="space-y-3">
                    {recentMessages.map((msg) => (
                      <div key={msg.id} className="border-2 border-gray-300 p-4 text-left">
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-bold text-black">{msg.from}</span>
                          <span className="text-xs text-gray-600">{msg.displayTime}</span>
                        </div>
                        <p className="text-sm text-gray-700">{msg.message}</p>
                        {!msg.isRead && (
                          <div className="mt-2">
                            <span className="inline-block px-2 py-1 bg-black text-xs font-bold text-white">
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
              <div className="max-w-md mx-auto space-y-6">
                {conversationEvents.map((event, index) => {
                  const isUser = event.event_type === 'user_message'
                  return (
                    <div
                      key={index}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div className={`flex gap-4 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Avatar - minimal square */}
                        <div className={`w-10 h-10 border-2 flex items-center justify-center flex-shrink-0 ${
                          isUser
                            ? 'border-black bg-white'
                            : 'bg-black border-black'
                        }`}>
                          {isUser ? (
                            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="square" strokeLinejoin="miter" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          ) : (
                            <div className="flex gap-0.5">
                              <div className="w-1.5 h-1.5 bg-white"></div>
                              <div className="w-1.5 h-1.5 bg-white/60"></div>
                              <div className="w-1.5 h-1.5 bg-white/30"></div>
                            </div>
                          )}
                        </div>

                        {/* Message Bubble - minimal with border */}
                        <div>
                          <div className={`px-5 py-3 ${
                            isUser
                              ? 'bg-black text-white border-2 border-black'
                              : 'bg-white border-2 border-gray-300 text-black'
                          }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{event.content}</p>
                          </div>
                          <div className={`flex items-center gap-1 mt-1 px-2 ${
                            isUser ? 'justify-end' : 'justify-start'
                          }`}>
                            <span className="text-xs text-gray-600">
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

      {/* Voice Input - minimal with black border */}
      {activeTab === 'messages' && (
        <div className="border-t-2 border-black bg-[#FFFEF7] p-6 pb-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-4 border-2 border-black px-6 py-4">
              <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span className="flex-1 text-sm font-medium text-gray-600">Speak to .dot...</span>
              <button className="w-10 h-10 bg-black flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="w-4 h-4 bg-white"></div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
