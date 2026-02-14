import { useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import TypingIndicator from './TypingIndicator'

export default function ChatPanel({ messages, onSendMessage, isTyping, patientName, disabled }) {
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
            D
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Dot &harr; {patientName || 'Patient'}
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs text-gray-500">Connected</span>
            </div>
          </div>
        </div>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md font-mono">
          Developer View
        </span>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 chat-scroll">
        {messages.length === 0 && !isTyping && (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Waiting for conversation to start...
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            role={msg.role}
            content={msg.content}
            timestamp={msg.timestamp}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        onSend={onSendMessage}
        disabled={disabled || isTyping}
      />
    </div>
  )
}
