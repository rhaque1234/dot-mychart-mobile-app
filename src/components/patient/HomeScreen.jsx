import { patientData, getNextCheckIn, getGreeting, todaySchedule } from '../../lib/mockPatientData'

export default function HomeScreen({ onNavigate, isConnected, messageCount, onEmergencyClick, currentSession }) {
  const nextCheckIn = getNextCheckIn()
  const greeting = getGreeting()

  // Get completed and upcoming check-ins for today
  const completedCheckIns = todaySchedule.filter(c => c.status === 'completed')
  const upcomingCheckIns = todaySchedule.filter(c => c.status === 'upcoming')

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header Section - Soft and Friendly */}
      <div className="px-6 pt-12 pb-8">
        <div className="max-w-lg mx-auto">
          {/* Greeting with .dot branding */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-900"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
              <span className="text-sm font-semibold text-gray-900">.dot</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{greeting},</h1>
            <p className="text-2xl text-gray-600">{patientData.firstName}</p>
          </div>

          {/* Next Check-in Card - Soft White with Rounded Corners */}
          <div className="bg-white rounded-[32px] p-8 shadow-lg shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
            {/* Subtle dot pattern background */}
            <div className="absolute top-4 right-4 flex gap-3">
              <div className="w-3 h-3 rounded-full bg-gray-100"></div>
              <div className="w-3 h-3 rounded-full bg-gray-100"></div>
              <div className="w-3 h-3 rounded-full bg-gray-100"></div>
            </div>
            <div className="absolute bottom-4 left-4 flex gap-3">
              <div className="w-2 h-2 rounded-full bg-gray-50"></div>
              <div className="w-2 h-2 rounded-full bg-gray-50"></div>
            </div>

            <div className="relative z-10">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Next Check-in</p>
              <div className="text-6xl font-bold text-gray-900 mb-4 tracking-tight">{nextCheckIn.time}</div>

              <div className="flex flex-wrap gap-2 mb-6">
                {nextCheckIn.medications.slice(0, 2).map((med, idx) => (
                  <span key={idx} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-50 text-gray-700 border border-gray-200">
                    {med}
                  </span>
                ))}
                {nextCheckIn.medications.length > 2 && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-50 text-gray-700 border border-gray-200">
                    +{nextCheckIn.medications.length - 2} more
                  </span>
                )}
              </div>

              <button
                onClick={() => onNavigate('chat')}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full py-4 px-6 flex items-center justify-center gap-3 font-semibold text-lg transition-all shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30"
              >
                <span>Start Check-in</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Activity */}
      <div className="max-w-lg mx-auto px-6 py-4">
        {/* Completed Check-ins */}
        {completedCheckIns.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Completed Today</h2>
            <div className="space-y-3">
              {completedCheckIns.map((checkIn) => (
                <button
                  key={checkIn.id}
                  onClick={() => onNavigate('activity')}
                  className="w-full bg-green-50 hover:bg-green-100 rounded-[24px] p-5 border border-green-200 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-bold text-gray-900 text-lg mb-1">{checkIn.time}</div>
                      <div className="text-sm text-gray-600">{checkIn.medications.join(', ')}</div>
                    </div>
                    <div className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      {checkIn.completedAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Check-ins */}
        {upcomingCheckIns.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Upcoming Today</h2>
            <div className="space-y-3">
              {upcomingCheckIns.map((checkIn) => (
                <button
                  key={checkIn.id}
                  onClick={() => onNavigate('chat')}
                  className="w-full bg-white hover:bg-gray-50 rounded-[24px] p-5 border-2 border-gray-200 hover:border-gray-900 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-gray-900 flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-bold text-gray-900 text-lg mb-1">{checkIn.time}</div>
                      <div className="text-sm text-gray-600">{checkIn.medications.join(', ')}</div>
                    </div>
                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => onNavigate('insights')}
            className="bg-white hover:bg-gray-50 rounded-[24px] p-6 flex flex-col items-center justify-center gap-3 border border-gray-200 hover:border-gray-900 transition-all shadow-sm hover:shadow-md group"
          >
            <div className="w-16 h-16 rounded-full bg-gray-900 group-hover:bg-gray-800 flex items-center justify-center transition-all shadow-lg shadow-gray-900/20">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 mb-1">Insights</div>
              <div className="text-xs text-gray-600">View progress</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('activity')}
            className="bg-white hover:bg-gray-50 rounded-[24px] p-6 flex flex-col items-center justify-center gap-3 border border-gray-200 hover:border-gray-900 transition-all shadow-sm hover:shadow-md group"
          >
            <div className="w-16 h-16 rounded-full bg-gray-900 group-hover:bg-gray-800 flex items-center justify-center transition-all shadow-lg shadow-gray-900/20">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 mb-1">Activity</div>
              <div className="text-xs text-gray-600">View calendar</div>
            </div>
          </button>
        </div>

        {/* Emergency Button - Softer Red */}
        <button
          onClick={onEmergencyClick}
          className="w-full bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-700 rounded-[24px] p-6 flex items-center justify-center gap-3 transition-all border-2 border-red-300 hover:border-red-400 shadow-sm hover:shadow-md"
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="font-bold text-xl">Alert Nurse</span>
        </button>

        {/* Connection Status - Rounded Pill */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-gray-200 shadow-sm">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-gray-900"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
            <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-semibold text-gray-700">
              {isConnected ? 'Connected to .dot' : 'Reconnecting...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
