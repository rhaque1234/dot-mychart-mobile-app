import { useState } from 'react'

export default function ActivityScreen({ conversations, currentSession }) {
  const [currentMonth, setCurrentMonth] = useState(0)

  // Calendar data - colored dots for each day
  const calendarData = {
    month: 'August 2021',
    adherence: '95%',
    days: [
      null, null, null, null, null, null, 1, // Week 1
      2, 3, 4, 5, 6, 7, 8, // Week 2
      9, 10, 11, 12, 13, 14, 15, // Week 3
      16, 17, 18, 19, 20, 21, 22, // Week 4
      23, 24, 25, 26, 27, 28, 29, // Week 5
      30, 31 // Week 6
    ],
    statuses: {
      1: 'on-time', 2: 'on-time', 3: 'on-time', 4: 'on-time', 5: 'on-time', 6: 'on-time', 7: 'on-time',
      8: 'on-time', 9: 'on-time', 10: 'on-time', 11: 'on-time', 12: 'on-time', 13: 'on-time', 14: 'on-time',
      15: 'on-time', 16: 'on-time', 17: 'on-time', 18: 'missed', 19: 'on-time', 20: 'on-time', 21: 'on-time',
      22: 'missed', 23: 'missed', 24: 'upcoming', 25: 'on-time', 26: 'upcoming', 27: 'upcoming', 28: 'upcoming',
      29: 'upcoming', 30: 'upcoming', 31: 'upcoming'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time':
      case 'late':
        return 'bg-[#B4D455]'
      case 'missed':
        return 'bg-[#FF6B6B]'
      case 'on-demand':
        return 'bg-[#FFB84D]'
      case 'upcoming':
        return 'bg-gray-200'
      default:
        return 'bg-gray-100'
    }
  }

  const summary = {
    'On-time': { percent: 85, color: 'bg-[#B4D455]' },
    'Late': { percent: 10, color: 'bg-[#B4D455]' },
    'Missed': { percent: 3, color: 'bg-[#FF6B6B]' }
  }

  return (
    <div className="flex-1 overflow-auto bg-[#FFF9F5] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FFE5A8] via-[#FFF0C8] to-[#FFF9E5] px-6 pt-6 pb-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center mb-6">
            <button className="p-2 hover:bg-white/40 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900 flex-1 text-center">Check-in Activity</h1>
            <div className="w-10"></div>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center justify-between bg-white/40 backdrop-blur-sm rounded-2xl px-4 py-3">
            <button
              onClick={() => setCurrentMonth(currentMonth - 1)}
              className="p-1 hover:bg-white/60 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-center">
              <span className="text-lg font-semibold text-gray-900">{calendarData.month}: </span>
              <span className="text-lg font-bold text-gray-900">{calendarData.adherence}</span>
            </div>
            <button
              onClick={() => setCurrentMonth(currentMonth + 1)}
              className="p-1 hover:bg-white/60 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Calendar Grid */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 mb-6">
          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
              <div key={day} className="text-center text-[10px] font-semibold text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarData.days.map((day, index) => {
              if (!day) {
                return <div key={index} className="aspect-square"></div>
              }

              const status = calendarData.statuses[day]
              const colorClass = getStatusColor(status)

              return (
                <button
                  key={index}
                  className={`aspect-square rounded-full ${colorClass} flex items-center justify-center font-semibold text-sm text-gray-900 hover:opacity-80 transition-opacity`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-3 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#B4D455]"></div>
              <span className="text-xs text-gray-700">Med taken (On-time, Late)</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-3 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#FF6B6B]"></div>
              <span className="text-xs text-gray-700">Missed/Skipped</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-3 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#FFB84D]"></div>
              <span className="text-xs text-gray-700">On-demand</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-3 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-200"></div>
              <span className="text-xs text-gray-700">Unknown/Upcoming</span>
            </div>
          </div>
        </div>

        {/* Adherence Summary */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">ADHERENCE SUMMARY</h2>
          <div className="space-y-4">
            {Object.entries(summary).map(([label, data]) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${data.color}`}></div>
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{data.percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${data.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${data.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gradient-to-br from-[#FFD4B8] to-[#FFE5D4] rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">26</div>
            <div className="text-sm text-gray-700">Days tracked</div>
          </div>
          <div className="bg-gradient-to-br from-[#B4D455] to-[#C8E46E] rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">14</div>
            <div className="text-sm text-gray-900">Current streak</div>
          </div>
        </div>
      </div>
    </div>
  )
}
