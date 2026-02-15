import { useState } from 'react'
import { adherenceCalendar, monthlyStats } from '../../lib/mockPatientData'

export default function ActivityScreen({ conversations, currentSession }) {
  const [currentMonth, setCurrentMonth] = useState(0)

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time':
        return 'bg-gray-900 text-white'
      case 'late':
        return 'bg-gray-600 text-white'
      case 'missed':
        return 'bg-red-500 text-white'
      case 'upcoming':
        return 'bg-gray-200 text-gray-500'
      default:
        return 'bg-gray-100 text-gray-400'
    }
  }

  // Generate calendar grid with proper padding for the first day of month
  const generateCalendarDays = () => {
    const days = []

    // Add empty cells for days before the month starts
    for (let i = 0; i < adherenceCalendar.firstDayOfWeek; i++) {
      days.push(null)
    }

    // Add actual days of the month
    for (let day = 1; day <= adherenceCalendar.daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  // Calculate summary stats
  const totalDays = adherenceCalendar.daysInMonth
  const onTimeDays = Object.values(adherenceCalendar.statuses).filter(s => s === 'on-time').length
  const lateDays = Object.values(adherenceCalendar.statuses).filter(s => s === 'late').length
  const missedDays = Object.values(adherenceCalendar.statuses).filter(s => s === 'missed').length

  const onTimePercent = Math.round((onTimeDays / totalDays) * 100)
  const latePercent = Math.round((lateDays / totalDays) * 100)
  const missedPercent = Math.round((missedDays / totalDays) * 100)

  const summary = {
    'On-time': { percent: onTimePercent, color: 'bg-gray-900' },
    'Late': { percent: latePercent, color: 'bg-gray-600' },
    'Missed': { percent: missedPercent, color: 'bg-red-500' }
  }

  return (
    <div className="flex-1 overflow-auto bg-white pb-20">
      {/* Header - Black Gradient */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 pt-8 pb-6 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center mb-6">
            <h1 className="text-3xl font-bold text-white flex-1">Activity</h1>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
            <button
              onClick={() => setCurrentMonth(currentMonth - 1)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-center">
              <span className="text-lg font-bold text-white">{adherenceCalendar.month}: </span>
              <span className="text-lg font-bold text-white">{adherenceCalendar.adherence}</span>
            </div>
            <button
              onClick={() => setCurrentMonth(currentMonth + 1)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Calendar Grid */}
        <div className="bg-white rounded-3xl p-6 border-2 border-gray-200 mb-6">
          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
              <div key={day} className="text-center text-[10px] font-bold text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              if (!day) {
                return <div key={index} className="aspect-square"></div>
              }

              const status = adherenceCalendar.statuses[day]
              const colorClass = getStatusColor(status)
              const isToday = day === 14 // Today is Feb 14, 2026

              return (
                <button
                  key={index}
                  className={`aspect-square rounded-xl ${colorClass} flex items-center justify-center font-bold text-sm hover:opacity-80 transition-all ${
                    isToday ? 'ring-2 ring-offset-2 ring-gray-900' : ''
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-900"></div>
              <span className="text-xs font-medium text-gray-700">On-time</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-600"></div>
              <span className="text-xs font-medium text-gray-700">Late</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500"></div>
              <span className="text-xs font-medium text-gray-700">Missed</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-200"></div>
              <span className="text-xs font-medium text-gray-700">Upcoming</span>
            </div>
          </div>
        </div>

        {/* Adherence Summary */}
        <div className="bg-white rounded-3xl p-6 border-2 border-gray-200 mb-6">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">ADHERENCE SUMMARY</h2>
          <div className="space-y-4">
            {Object.entries(summary).map(([label, data]) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${data.color}`}></div>
                    <span className="text-sm font-bold text-gray-700">{label}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{data.percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${data.color} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${data.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-center text-white">
            <div className="text-3xl font-bold mb-1">{monthlyStats.daysTracked}</div>
            <div className="text-sm font-medium text-gray-300">Days tracked</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-center text-white">
            <div className="text-3xl font-bold mb-1">{monthlyStats.currentStreak}</div>
            <div className="text-sm font-medium text-gray-300">Current streak</div>
          </div>
        </div>
      </div>
    </div>
  )
}
