export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4 chat-message-enter">
      <div className="flex items-end gap-2">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
          D
        </div>
        <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
            <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
            <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
          </div>
        </div>
      </div>
    </div>
  )
}
