import { useState } from 'react'
import { weeklyAdherence, monthlyStats } from '../../lib/mockPatientData'

export default function InsightsScreen() {
  const [viewPeriod, setViewPeriod] = useState('week')
  const [currentWeek, setCurrentWeek] = useState(0)

  const adherencePercent = weeklyAdherence.adherencePercent
  const doseTaken = weeklyAdherence.dosesTaken
  const doseSkipped = weeklyAdherence.dosesSkipped

  const getDateRange = () => {
    if (viewPeriod === 'week') {
      return weeklyAdherence.week
    }
    return 'February 2026'
  }

  return (
    <div className="flex-1 overflow-auto bg-white pb-20">
      {/* Header - Black Gradient */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 pt-8 pb-8 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Insights</h1>

          {/* View Toggle */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-bold text-gray-300">View:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setViewPeriod('week')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  viewPeriod === 'week'
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'bg-white/20 text-white border border-white/30'
                }`}
              >
                1 week
              </button>
              <button
                onClick={() => setViewPeriod('month')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  viewPeriod === 'month'
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'bg-white/20 text-white border border-white/30'
                }`}
              >
                1 month
              </button>
            </div>
          </div>

          {/* Date Navigation */}
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
            <button
              onClick={() => setCurrentWeek(currentWeek - 1)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-lg font-bold text-white">{getDateRange()}</span>
            <button
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="max-w-lg mx-auto px-6 py-8">
        <div className="relative flex items-center justify-center mb-8">
          {/* SVG Progress Ring */}
          <svg className="w-64 h-64 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="128"
              cy="128"
              r="100"
              stroke="#E5E7EB"
              strokeWidth="20"
              fill="none"
            />
            {/* Progress circle - Black */}
            <circle
              cx="128"
              cy="128"
              r="100"
              stroke="#111827"
              strokeWidth="20"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 100}`}
              strokeDashoffset={`${2 * Math.PI * 100 * (1 - adherencePercent / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl font-bold text-gray-900 mb-2">{adherencePercent}%</div>
            <div className="text-lg font-bold text-gray-600">Adherence</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 rounded-2xl p-6 text-center border-2 border-gray-900">
            <div className="text-4xl font-bold text-gray-900 mb-2">{doseTaken}</div>
            <div className="text-sm font-medium text-gray-600">Doses taken</div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 text-center border-2 border-gray-200">
            <div className="text-4xl font-bold text-gray-900 mb-2">{doseSkipped}</div>
            <div className="text-sm font-medium text-gray-600">Skipped / Missed</div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="mb-8">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">INSIGHTS FROM LAST WEEK</h2>
          <div className="space-y-3">
            {weeklyAdherence.insights.map((insight, index) => (
              <div key={index} className="bg-gray-900 rounded-2xl p-5 text-white">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium flex-1 leading-relaxed">{insight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Breakdown */}
        <div className="mb-8">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">WEEKLY BREAKDOWN</h2>
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <div className="space-y-4">
              {weeklyAdherence.dailyBreakdown.map((day) => {
                return (
                  <div key={day.day}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-900 w-10">{day.day}</span>
                        <span className="text-xs text-gray-500">{day.date}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{day.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          day.percentage === 100 ? 'bg-gray-900' : 'bg-gray-400'
                        }`}
                        style={{ width: `${day.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Monthly Stats */}
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
