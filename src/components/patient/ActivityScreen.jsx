import { useState } from 'react'
import { adherenceCalendar, monthlyStats } from '../../lib/mockPatientData'

export default function ActivityScreen({ conversations, currentSession }) {
  const [currentMonth, setCurrentMonth] = useState(0)

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time':
        return 'bg-gray-900 text-white shadow-md shadow-gray-900/20'
      case 'late':
        return 'bg-gray-600 text-white shadow-sm shadow-gray-600/20'
      case 'missed':
        return 'bg-red-100 text-red-700 border border-red-300'
      case 'upcoming':
        return 'bg-gray-100 text-gray-500 border border-gray-200'
      default:
        return 'bg-gray-50 text-gray-400'
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
    <div className="flex-1 overflow-auto bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header - Soft and Friendly with .dot branding */}
      <div className="px-6 pt-12 pb-6">
        <div className="max-w-lg mx-auto">
          {/* .dot branding */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-900"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
            <span className="text-sm font-semibold text-gray-900">.dot</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-8">Activity</h1>

          {/* Month Navigation - Soft white card */}
          <div className="flex items-center justify-between bg-white rounded-[24px] px-6 py-4 border border-gray-200 shadow-sm">
            <button
              onClick={() => setCurrentMonth(currentMonth - 1)}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-center">
              <span className="text-lg font-bold text-gray-900">{adherenceCalendar.month}: </span>
              <span className="text-lg font-bold text-gray-900">{adherenceCalendar.adherence}</span>
            </div>
            <button
              onClick={() => setCurrentMonth(currentMonth + 1)}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Calendar Grid - Soft rounded card with dot patterns */}
        <div className="bg-white rounded-[32px] p-6 border border-gray-200 shadow-md mb-6 relative overflow-hidden">
          {/* Decorative dot patterns */}
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-50"></div>
            <div className="w-2 h-2 rounded-full bg-gray-50"></div>
            <div className="w-2 h-2 rounded-full bg-gray-50"></div>
          </div>
          <div className="absolute bottom-4 left-4 flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-100"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-100"></div>
          </div>

          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-2 mb-4 relative z-10">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
              <div key={day} className="text-center text-[10px] font-bold text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days - Softer rounded corners */}
          <div className="grid grid-cols-7 gap-2 relative z-10">
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
                  className={`aspect-square rounded-[12px] ${colorClass} flex items-center justify-center font-bold text-sm hover:opacity-80 transition-all shadow-sm ${
                    isToday ? 'ring-2 ring-offset-2 ring-gray-900' : ''
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>

        {/* Legend - Soft rounded pills */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-[20px] p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gray-900 shadow-sm shadow-gray-900/20"></div>
              <span className="text-xs font-medium text-gray-700">On-time</span>
            </div>
          </div>
          <div className="bg-white rounded-[20px] p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gray-600 shadow-sm"></div>
              <span className="text-xs font-medium text-gray-700">Late</span>
            </div>
          </div>
          <div className="bg-white rounded-[20px] p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-red-100 border border-red-300"></div>
              <span className="text-xs font-medium text-gray-700">Missed</span>
            </div>
          </div>
          <div className="bg-white rounded-[20px] p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gray-100 border border-gray-200"></div>
              <span className="text-xs font-medium text-gray-700">Upcoming</span>
            </div>
          </div>
        </div>

        {/* Adherence Summary - Soft rounded card */}
        <div className="bg-white rounded-[32px] p-6 border border-gray-200 shadow-md mb-6">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Adherence summary</h2>
          <div className="space-y-4">
            {Object.entries(summary).map(([label, data]) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${data.color}`}></div>
                    <span className="text-sm font-bold text-gray-700">{label}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{data.percent}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`${data.color} h-3 rounded-full transition-all duration-500 shadow-sm`}
                    style={{ width: `${data.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Stats - Soft cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-[24px] p-6 text-center text-white shadow-md shadow-gray-900/20">
            <div className="text-3xl font-bold mb-1">{monthlyStats.daysTracked}</div>
            <div className="text-sm font-medium text-gray-300">Days tracked</div>
          </div>
          <div className="bg-gray-900 rounded-[24px] p-6 text-center text-white shadow-md shadow-gray-900/20">
            <div className="text-3xl font-bold mb-1">{monthlyStats.currentStreak}</div>
            <div className="text-sm font-medium text-gray-300">Current streak</div>
          </div>
        </div>
      </div>
    </div>
  )
}
