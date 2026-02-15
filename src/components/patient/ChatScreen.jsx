import { useEffect, useRef } from 'react'

export default function ChatScreen({ currentSession, isConnected }) {
  const messagesEndRef = useRef(null)

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
      {/* Chat Header */}
      <div className="bg-black text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="8" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold">Dot</h2>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span>{isConnected ? 'Online' : 'Offline'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 pb-24">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4 animate-pulse">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Connecting to Dot...</h3>
            <p className="text-sm text-gray-600">Please wait while we establish connection</p>
          </div>
        ) : conversationEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center mb-4">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
              </svg>
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
                        ? 'bg-gray-900'
                        : 'bg-white border-2 border-black'
                    }`}>
                      {isUser ? (
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="8" />
                        </svg>
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div>
                      <div className={`rounded-2xl px-4 py-3 ${
                        isUser
                          ? 'bg-black text-white'
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

      {/* Input placeholder */}
      <div className="border-t border-gray-200 bg-white p-4 pb-20">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="flex-1 text-sm text-gray-500">Speak to Dot...</span>
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
