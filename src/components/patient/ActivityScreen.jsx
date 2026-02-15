import { useState } from 'react'
import { getMonthlyAdherenceData } from '../../lib/mockPatientData'

export default function ActivityScreen({ conversations, currentSession }) {
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0)

  // Get month data based on offset
  const monthData = getMonthlyAdherenceData(currentMonthOffset)

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time':
        return 'bg-black text-white border-2 border-black'
      case 'late':
        return 'bg-gray-600 text-white border-2 border-gray-600'
      case 'missed':
        return 'bg-white text-red-600 border-2 border-red-600'
      case 'upcoming':
        return 'bg-white text-gray-600 border-2 border-gray-300'
      default:
        return 'bg-white text-gray-400 border-2 border-gray-200'
    }
  }

  // Generate calendar grid with proper padding for the first day of month
  const generateCalendarDays = () => {
    const days = []

    // Add empty cells for days before the month starts
    for (let i = 0; i < monthData.firstDayOfWeek; i++) {
      days.push(null)
    }

    // Add actual days of the month
    for (let day = 1; day <= monthData.daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  // Calculate summary stats
  const totalDays = monthData.daysTracked || monthData.daysInMonth
  const onTimeDays = Object.values(monthData.statuses).filter(s => s === 'on-time').length
  const lateDays = Object.values(monthData.statuses).filter(s => s === 'late').length
  const missedDays = Object.values(monthData.statuses).filter(s => s === 'missed').length

  const onTimePercent = totalDays > 0 ? Math.round((onTimeDays / totalDays) * 100) : 0
  const latePercent = totalDays > 0 ? Math.round((lateDays / totalDays) * 100) : 0
  const missedPercent = totalDays > 0 ? Math.round((missedDays / totalDays) * 100) : 0

  const summary = {
    'On-time': { percent: onTimePercent, color: 'bg-gray-900' },
    'Late': { percent: latePercent, color: 'bg-gray-600' },
    'Missed': { percent: missedPercent, color: 'bg-red-500' }
  }

  const handlePrevMonth = () => {
    setCurrentMonthOffset(prev => prev - 1)
  }

  const handleNextMonth = () => {
    setCurrentMonthOffset(prev => prev + 1)
  }

  // Today's date for highlighting
  const today = new Date(2026, 1, 14) // Feb 14, 2026
  const isCurrentMonth = monthData.monthIndex === today.getMonth() && monthData.year === today.getFullYear()
  const todayDate = isCurrentMonth ? today.getDate() : -1

  return (
    <div className="flex-1 overflow-auto bg-[#FFFEF7] pb-20">
      {/* Header - Hero minimal style */}
      <div className="px-8 pt-16 pb-12">
        <div className="max-w-md mx-auto">
          {/* .dot branding - bold and large */}
          <h1 className="text-6xl font-bold text-black mb-16 tracking-tight text-center">.dot</h1>

          {/* Month Navigation - minimal with border */}
          <div className="flex items-center justify-between border-2 border-black px-6 py-4">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-black hover:text-white transition-colors"
              disabled={currentMonthOffset <= -2}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-center">
              <span className="text-lg font-bold text-black">{monthData.month}: </span>
              <span className="text-lg font-bold text-black">{monthData.adherence}</span>
            </div>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-black hover:text-white transition-colors"
              disabled={currentMonthOffset >= 1}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-8 py-8">
        {/* Calendar Grid - Minimal bordered grid */}
        <div className="border-2 border-black p-6 mb-8">
          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
              <div key={day} className="text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days - Square cells */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              if (!day) {
                return <div key={index} className="aspect-square"></div>
              }

              const status = monthData.statuses[day]
              const colorClass = getStatusColor(status)
              const isToday = day === todayDate

              return (
                <button
                  key={index}
                  className={`aspect-square ${colorClass} flex items-center justify-center font-bold text-sm hover:opacity-80 transition-all ${
                    isToday ? 'ring-2 ring-offset-2 ring-black' : ''
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>

        {/* Legend - Simple squares */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="border-2 border-gray-300 p-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-black border-2 border-black"></div>
              <span className="text-xs font-medium text-black uppercase tracking-wider">On-time</span>
            </div>
          </div>
          <div className="border-2 border-gray-300 p-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-600 border-2 border-gray-600"></div>
              <span className="text-xs font-medium text-black uppercase tracking-wider">Late</span>
            </div>
          </div>
          <div className="border-2 border-gray-300 p-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-white border-2 border-red-600"></div>
              <span className="text-xs font-medium text-black uppercase tracking-wider">Missed</span>
            </div>
          </div>
          <div className="border-2 border-gray-300 p-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-white border-2 border-gray-300"></div>
              <span className="text-xs font-medium text-black uppercase tracking-wider">Upcoming</span>
            </div>
          </div>
        </div>

        {/* Adherence Summary - Clean bordered card */}
        <div className="border-2 border-black p-6 mb-8">
          <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-6">Adherence summary</h2>
          <div className="space-y-5">
            {Object.entries(summary).map(([label, data]) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 ${data.color}`}></div>
                    <span className="text-sm font-bold text-black">{label}</span>
                  </div>
                  <span className="text-xl font-bold text-black">{data.percent}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div
                    className={`${data.color} h-2 transition-all duration-500`}
                    style={{ width: `${data.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Stats - Minimal black cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black p-6 text-center text-white">
            <div className="text-4xl font-bold mb-2">{monthData.daysTracked || totalDays}</div>
            <div className="text-sm font-medium text-gray-300 uppercase tracking-wider">Days tracked</div>
          </div>
          <div className="bg-black p-6 text-center text-white">
            <div className="text-4xl font-bold mb-2">{monthData.currentStreak || 0}</div>
            <div className="text-sm font-medium text-gray-300 uppercase tracking-wider">Current streak</div>
          </div>
        </div>
      </div>
    </div>
  )
}
