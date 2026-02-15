import { patientData, getNextCheckIn, getGreeting, todaySchedule } from '../../lib/mockPatientData'

export default function HomeScreen({ onNavigate, isConnected, messageCount, onEmergencyClick, currentSession }) {
  const nextCheckIn = getNextCheckIn()
  const greeting = getGreeting()

  // Get completed and upcoming check-ins for today
  const completedCheckIns = todaySchedule.filter(c => c.status === 'completed')
  const upcomingCheckIns = todaySchedule.filter(c => c.status === 'upcoming')

  return (
    <div className="flex-1 overflow-auto bg-[#FFFEF7] pb-20">
      {/* Hero-inspired minimal header with .dot branding */}
      <div className="px-8 pt-16 pb-12">
        <div className="max-w-md mx-auto text-center mb-12">
          <h1 className="text-6xl font-bold text-black mb-2 tracking-tight">.dot</h1>
        </div>

        {/* Minimal greeting */}
        <div className="max-w-md mx-auto text-center mb-16">
          <h2 className="text-3xl font-medium text-black mb-2">{greeting},</h2>
          <p className="text-xl text-gray-600">{patientData.firstName}</p>
        </div>

        {/* Simple line art illustration of .dot device and daily items */}
        <div className="max-w-md mx-auto mb-16">
          <svg viewBox="0 0 400 200" className="w-full h-auto">
            {/* Table line */}
            <line x1="0" y1="180" x2="400" y2="180" stroke="#000" strokeWidth="2" />

            {/* Plant pot */}
            <path d="M30 150 L30 170 L60 170 L60 150 Z" fill="none" stroke="#000" strokeWidth="2" />
            <path d="M40 140 Q35 130 40 120 M50 140 Q55 130 50 120" stroke="#000" strokeWidth="2" fill="none" />

            {/* Pill bottle */}
            <rect x="80" y="150" width="30" height="30" rx="2" fill="none" stroke="#000" strokeWidth="2" />
            <rect x="85" y="145" width="20" height="8" fill="none" stroke="#000" strokeWidth="2" />
            <circle cx="95" cy="165" r="3" fill="#000" />
            <circle cx="100" cy="170" r="2" fill="#000" />

            {/* .dot device (vertical cone/tapered cylinder standing on shelf) */}
            {/* Top ellipse (narrower) */}
            <ellipse cx="200" cy="105" rx="18" ry="6" fill="none" stroke="#000" strokeWidth="2" />

            {/* Tapered sides - slightly wider at bottom */}
            <line x1="182" y1="105" x2="175" y2="180" stroke="#000" strokeWidth="2" />
            <line x1="218" y1="105" x2="225" y2="180" stroke="#000" strokeWidth="2" />

            {/* Bottom base on shelf (wider) */}
            <line x1="175" y1="180" x2="225" y2="180" stroke="#000" strokeWidth="2" />

            {/* Speaker grille opening (top) */}
            <ellipse cx="200" cy="105" rx="14" ry="4" fill="none" stroke="#000" strokeWidth="1.5" />
            <line x1="190" y1="105" x2="210" y2="105" stroke="#000" strokeWidth="1" />
            <line x1="200" y1="102" x2="200" y2="108" stroke="#000" strokeWidth="1" />

            {/* Perforated holes - 4 columns × 4 rows arranged vertically */}
            {/* Row 1 (highest) */}
            <ellipse cx="185" cy="125" rx="1.5" ry="3" fill="#000" />
            <ellipse cx="193" cy="125" rx="1.5" ry="3" fill="#000" />
            <ellipse cx="207" cy="125" rx="1.5" ry="3" fill="#000" />
            <ellipse cx="215" cy="125" rx="1.5" ry="3" fill="#000" />

            {/* Row 2 */}
            <ellipse cx="186" cy="140" rx="1.5" ry="3" fill="#000" />
            <ellipse cx="194" cy="140" rx="1.5" ry="3" fill="#000" />
            <ellipse cx="206" cy="140" rx="1.5" ry="3" fill="#000" />
            <ellipse cx="214" cy="140" rx="1.5" ry="3" fill="#000" />

            {/* Row 3 */}
            <ellipse cx="188" cy="155" rx="1.5" ry="3" fill="#000" />
            <ellipse cx="196" cy="155" rx="1.5" ry="3" fill="#000" />
            <ellipse cx="204" cy="155" rx="1.5" ry="3" fill="#000" />
            <ellipse cx="212" cy="155" rx="1.5" ry="3" fill="#000" />

            {/* Row 4 (lowest) */}
            <ellipse cx="189" cy="170" rx="1.5" ry="3" fill="#000" />
            <ellipse cx="197" cy="170" rx="1.5" ry="3" fill="#000" />
            <ellipse cx="203" cy="170" rx="1.5" ry="3" fill="#000" />
            <ellipse cx="211" cy="170" rx="1.5" ry="3" fill="#000" />

            {/* Phone */}
            <rect x="260" y="140" width="35" height="40" rx="3" fill="none" stroke="#000" strokeWidth="2" />
            <line x1="268" y1="145" x2="287" y2="145" stroke="#000" strokeWidth="1" />
            <circle cx="277.5" cy="175" r="2" fill="#000" />

            {/* Coffee cup */}
            <path d="M320 155 L320 175 L350 175 L350 155 Z" fill="none" stroke="#000" strokeWidth="2" />
            <path d="M350 162 Q360 162 360 170 Q360 175 350 175" fill="none" stroke="#000" strokeWidth="2" />
          </svg>
        </div>

        {/* Next check-in - minimal card */}
        <div className="max-w-md mx-auto mb-8">
          <div className="border-2 border-black p-8">
            <p className="text-sm font-medium text-gray-600 mb-4 uppercase tracking-wider">Next Check-in</p>
            <div className="text-7xl font-bold text-black mb-6 tracking-tighter">{nextCheckIn.time}</div>
            <div className="space-y-2 mb-8">
              {nextCheckIn.medications.map((med, idx) => (
                <div key={idx} className="text-lg text-gray-700">{med}</div>
              ))}
            </div>
            <button
              onClick={() => onNavigate('chat')}
              className="w-full bg-black text-white py-4 text-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Start Check-in
            </button>
          </div>
        </div>

        {/* Completed check-ins - minimal list */}
        {completedCheckIns.length > 0 && (
          <div className="max-w-md mx-auto mb-8">
            <p className="text-sm font-medium text-gray-600 mb-4 uppercase tracking-wider">Completed Today</p>
            <div className="space-y-3">
              {completedCheckIns.map((checkIn) => (
                <button
                  key={checkIn.id}
                  onClick={() => onNavigate('activity')}
                  className="w-full border border-gray-300 p-5 hover:border-black transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 border-2 border-black flex items-center justify-center">
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8L6 11L13 4" stroke="black" strokeWidth="2" strokeLinecap="square"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-black mb-1">{checkIn.time}</div>
                        <div className="text-sm text-gray-600">{checkIn.medications.join(', ')}</div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming - minimal */}
        {upcomingCheckIns.length > 0 && (
          <div className="max-w-md mx-auto mb-8">
            <p className="text-sm font-medium text-gray-600 mb-4 uppercase tracking-wider">Upcoming</p>
            <div className="space-y-3">
              {upcomingCheckIns.map((checkIn) => (
                <button
                  key={checkIn.id}
                  onClick={() => onNavigate('chat')}
                  className="w-full border border-gray-300 p-5 hover:border-black transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-black mb-1">{checkIn.time}</div>
                      <div className="text-sm text-gray-600">{checkIn.medications.join(', ')}</div>
                    </div>
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation buttons - minimal */}
        <div className="max-w-md mx-auto space-y-3 mb-8">
          <button
            onClick={() => onNavigate('insights')}
            className="w-full border-2 border-black p-5 hover:bg-black hover:text-white transition-colors text-left group"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-lg">View Progress</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
          <button
            onClick={() => onNavigate('activity')}
            className="w-full border-2 border-black p-5 hover:bg-black hover:text-white transition-colors text-left group"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-lg">View Calendar</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Emergency - minimal red border */}
        <div className="max-w-md mx-auto mb-12">
          <button
            onClick={onEmergencyClick}
            className="w-full border-2 border-red-600 text-red-600 p-5 hover:bg-red-600 hover:text-white transition-colors"
          >
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="font-medium text-lg">Alert Nurse</span>
            </div>
          </button>
        </div>

        {/* Connection status - minimal */}
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <div className={`w-2 h-2 ${isConnected ? 'bg-black' : 'bg-gray-400'}`}></div>
            <span>{isConnected ? 'Connected' : 'Reconnecting...'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
