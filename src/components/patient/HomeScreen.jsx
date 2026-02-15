export default function HomeScreen({ onNavigate, isConnected, messageCount, onEmergencyClick }) {
  const quickActions = [
    {
      id: 'chat',
      title: 'Chat with Dot',
      description: 'Start a conversation',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      action: () => onNavigate('chat')
    },
    {
      id: 'activity',
      title: 'View Activity',
      description: 'See your history',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      action: () => onNavigate('activity')
    }
  ]

  return (
    <div className="flex-1 overflow-auto bg-white">
      {/* Hero Section */}
      <div className="bg-black text-white p-6 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Hello!</h1>
              <p className="text-gray-300 text-sm">How can Dot help you today?</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
            <span>{isConnected ? 'Connected to Dot' : 'Connecting...'}</span>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 -mt-4">
        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Today's Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-black mb-1">{messageCount}</div>
              <div className="text-xs text-gray-600">Messages</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-black mb-1">
                {isConnected ? '100%' : '0%'}
              </div>
              <div className="text-xs text-gray-600">Connection</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={action.action}
                className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:border-black hover:shadow-md transition-all active:scale-98"
              >
                <div className="text-black">
                  {action.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-black">{action.title}</div>
                  <div className="text-sm text-gray-600">{action.description}</div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Emergency Button */}
        <button
          onClick={onEmergencyClick}
          className="w-full bg-black text-white rounded-xl p-6 flex items-center justify-center gap-3 hover:bg-gray-900 transition-all shadow-lg mb-6"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="font-semibold text-lg">Alert Nurse</span>
        </button>

        {/* Health Tip */}
        <div className="bg-gray-50 rounded-xl p-4 mb-20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-1">Daily Tip</h3>
              <p className="text-sm text-gray-600">
                Remember to stay hydrated throughout the day. Dot can remind you to drink water regularly!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
