function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function ChatMessage({ role, content, timestamp }) {
  if (role === 'system') {
    return (
      <div className="flex justify-center my-3 chat-message-enter">
        <p className="text-xs text-gray-400 italic bg-gray-50 px-3 py-1 rounded-full">
          {content}
        </p>
      </div>
    )
  }

  const isDot = role === 'dot'

  return (
    <div
      className={`flex ${isDot ? 'justify-start' : 'justify-end'} mb-4 chat-message-enter`}
    >
      <div className={`flex items-end gap-2 max-w-[80%] ${isDot ? '' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        {isDot && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            D
          </div>
        )}

        {/* Bubble */}
        <div>
          <div
            className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
              isDot
                ? 'bg-gray-100 text-gray-800 rounded-bl-sm'
                : 'bg-indigo-600 text-white rounded-br-sm'
            }`}
          >
            {content}
          </div>
          <p
            className={`text-xs text-gray-400 mt-1 ${
              isDot ? 'text-left ml-1' : 'text-right mr-1'
            }`}
          >
            {isDot ? 'Dot' : 'You'} \u00B7 {formatTime(timestamp)}
          </p>
        </div>
      </div>
    </div>
  )
}
