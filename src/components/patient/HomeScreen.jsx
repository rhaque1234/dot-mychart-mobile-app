export default function HomeScreen({ onNavigate, isConnected, messageCount, onEmergencyClick, currentSession }) {
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  // Get recent conversations
  const events = currentSession?.events || []
  const conversationEvents = events.filter(e => e.event_type === 'user_message' || e.event_type === 'agent_response')

  const todayConversations = [
    {
      time: '10:00 AM',
      messages: 5,
      status: 'completed',
      completedAt: '10:15 AM',
      dot: '🟢'
    },
    {
      time: '2:00 PM',
      messages: 3,
      status: 'missed',
      completedAt: '2:45 PM',
      dot: '🔴'
    }
  ]

  return (
    <div className="flex-1 overflow-auto bg-[#FFF9F5]">
      {/* Hero Section with Gradient */}
      <div className="bg-gradient-to-br from-[#FFD4B8] via-[#FFE5D4] to-[#FFF0E5] px-6 pt-6 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">{getGreeting()}, John</h1>
            </div>
            <button className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>

          {/* Next Check-in Card */}
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white/60">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">NEXT CHECK-IN:</p>
            <div className="text-6xl font-bold text-gray-900 mb-2">4:00 PM</div>
            <button
              onClick={() => onNavigate('chat')}
              className="flex items-center gap-2 text-gray-700"
            >
              <span className="text-base font-medium">Ready to chat with Dot</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Earlier Today Section */}
      <div className="max-w-lg mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">EARLIER TODAY</h2>
          <button className="p-1">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        <div className="space-y-3 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900 mb-1">10:00 AM</div>
              <div className="text-sm text-gray-600">5 messages</div>
            </div>
            <div className="text-right flex items-center gap-3">
              <div>
                <div className="text-sm text-gray-600 mb-1">Completed (10:15am)</div>
              </div>
              <div className="w-3 h-3 rounded-full bg-[#B4D455]"></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900 mb-1">2:00 PM</div>
              <div className="text-sm text-gray-600">Scheduled check-in</div>
            </div>
            <div className="text-right flex items-center gap-3">
              <div>
                <div className="text-sm text-gray-600 mb-1">Missed (2:45pm)</div>
              </div>
              <div className="w-3 h-3 rounded-full bg-[#FF6B6B]"></div>
            </div>
          </div>
        </div>

        {/* Yesterday Section */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">YESTERDAY</h2>
          <div className="space-y-3 mb-6">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900 mb-1">8:00 PM</div>
                <div className="text-sm text-gray-600">3 messages</div>
              </div>
              <div className="text-right flex items-center gap-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Completed (8:10pm)</div>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#B4D455]"></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900 mb-1">12:00 PM</div>
                <div className="text-sm text-gray-600">4 messages</div>
              </div>
              <div className="text-right flex items-center gap-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Completed (12:15pm)</div>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#B4D455]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3 mb-20">
          <button
            onClick={() => onNavigate('activity')}
            className="w-full bg-white border-2 border-gray-200 rounded-2xl p-4 flex items-center justify-between hover:border-[#FFD4B8] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD4B8] to-[#FFE5D4] flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">View Insights</div>
                <div className="text-sm text-gray-600">Check your progress</div>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={onEmergencyClick}
            className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8787] text-white rounded-2xl p-4 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-semibold text-lg">Alert Nurse</span>
          </button>
        </div>
      </div>
    </div>
  )
}
