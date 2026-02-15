export default function ActivityScreen({ conversations, currentSession }) {
  const events = currentSession?.events || []
  const conversationEvents = events.filter(e => e.event_type === 'user_message' || e.event_type === 'agent_response')

  const todayMessages = conversationEvents.length
  const totalSessions = conversations.length

  // Group events by date
  const groupedByDate = conversationEvents.reduce((acc, event) => {
    const date = new Date(event.timestamp).toLocaleDateString()
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(event)
    return acc
  }, {})

  const stats = [
    { label: 'Total Conversations', value: totalSessions, icon: '💬' },
    { label: 'Today\'s Messages', value: todayMessages, icon: '📝' },
    { label: 'Avg Response Time', value: '< 1s', icon: '⚡' },
    { label: 'Connection Uptime', value: '99%', icon: '✅' }
  ]

  return (
    <div className="flex-1 overflow-auto bg-white pb-20">
      {/* Header */}
      <div className="bg-black text-white p-6 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-1">Activity</h1>
          <p className="text-gray-300 text-sm">Track your conversations with Dot</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Stats Grid */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Overview</h2>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-black mb-1">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Recent Activity</h2>

          {Object.entries(groupedByDate).length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-gray-600 text-sm">No activity yet</p>
              <p className="text-gray-500 text-xs mt-1">Start chatting with Dot to see your activity</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(groupedByDate).reverse().map(([date, events]) => (
                <div key={date} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">{date}</span>
                      <span className="text-xs text-gray-500">{events.length} messages</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {events.slice(0, 3).map((event, index) => {
                      const isUser = event.event_type === 'user_message'
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isUser ? 'bg-gray-900' : 'bg-white border-2 border-black'
                          }`}>
                            {isUser ? (
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="8" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-gray-700">
                                {isUser ? 'You' : 'Dot'}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">{event.content}</p>
                          </div>
                        </div>
                      )
                    })}
                    {events.length > 3 && (
                      <div className="text-center pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-500">+{events.length - 3} more messages</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Health Insights */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Health Insights</h2>
          <div className="space-y-3">
            <div className="bg-black text-white rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💪</div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Great progress!</h3>
                  <p className="text-sm text-gray-300">
                    You've been actively engaging with Dot. Keep up the healthy habits!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎯</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Daily Goal</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-black rounded-full h-2" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">75%</span>
                  </div>
                  <p className="text-xs text-gray-600">3 of 4 check-ins completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
