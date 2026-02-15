import { patientData, getNextCheckIn, getGreeting, todaySchedule } from '../../lib/mockPatientData'

export default function HomeScreen({ onNavigate, isConnected, messageCount, onEmergencyClick, currentSession }) {
  const nextCheckIn = getNextCheckIn()
  const greeting = getGreeting()

  // Get completed and upcoming check-ins for today
  const completedCheckIns = todaySchedule.filter(c => c.status === 'completed')
  const upcomingCheckIns = todaySchedule.filter(c => c.status === 'upcoming')

  return (
    <div className="flex-1 overflow-auto bg-white pb-20">
      {/* Header Section - Black Gradient */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 pt-8 pb-10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{greeting},</h1>
              <p className="text-xl text-gray-300">{patientData.firstName}</p>
            </div>
            <button
              onClick={() => onNavigate('chat')}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>

          {/* Next Check-in Card - White on Dark */}
          <div className="bg-white rounded-3xl p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">NEXT CHECK-IN</p>
                <div className="text-5xl font-bold text-gray-900 mb-3">{nextCheckIn.time}</div>
                <div className="flex flex-wrap gap-2">
                  {nextCheckIn.medications.slice(0, 2).map((med, idx) => (
                    <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                      {med}
                    </span>
                  ))}
                  {nextCheckIn.medications.length > 2 && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                      +{nextCheckIn.medications.length - 2} more
                    </span>
                  )}
                </div>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <button
              onClick={() => onNavigate('chat')}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-2xl py-3 px-4 flex items-center justify-center gap-2 font-semibold transition-all"
            >
              <span>Start Check-in</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Today's Activity */}
      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Completed Check-ins */}
        {completedCheckIns.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">COMPLETED TODAY</h2>
            <div className="space-y-3">
              {completedCheckIns.map((checkIn) => (
                <button
                  key={checkIn.id}
                  onClick={() => onNavigate('activity')}
                  className="w-full bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 border border-gray-200 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-gray-900 mb-1">{checkIn.time}</div>
                        <div className="text-sm text-gray-600">{checkIn.medications.join(', ')}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium text-green-600">
                        {checkIn.completedAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </div>
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
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">UPCOMING TODAY</h2>
            <div className="space-y-3">
              {upcomingCheckIns.map((checkIn) => (
                <button
                  key={checkIn.id}
                  onClick={() => onNavigate('chat')}
                  className="w-full bg-white hover:bg-gray-50 rounded-2xl p-4 border-2 border-gray-900 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-gray-900 mb-1">{checkIn.time}</div>
                        <div className="text-sm text-gray-600">{checkIn.medications.join(', ')}</div>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => onNavigate('insights')}
            className="w-full bg-white border-2 border-gray-200 hover:border-gray-900 rounded-2xl p-5 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-900 group-hover:bg-gray-800 flex items-center justify-center transition-all">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-lg">View Insights</div>
                <div className="text-sm text-gray-600">Check your progress</div>
              </div>
            </div>
            <svg className="w-6 h-6 text-gray-400 group-hover:text-gray-900 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => onNavigate('activity')}
            className="w-full bg-white border-2 border-gray-200 hover:border-gray-900 rounded-2xl p-5 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-900 group-hover:bg-gray-800 flex items-center justify-center transition-all">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-lg">Activity Calendar</div>
                <div className="text-sm text-gray-600">View your history</div>
              </div>
            </div>
            <svg className="w-6 h-6 text-gray-400 group-hover:text-gray-900 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Emergency Button */}
        <button
          onClick={onEmergencyClick}
          className="w-full bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-6 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all border-2 border-red-500"
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="font-bold text-xl">Alert Nurse</span>
        </button>

        {/* Connection Status */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-xs font-medium text-gray-700">
              {isConnected ? 'Connected to Dot' : 'Reconnecting...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
