import { useState } from 'react'

export default function InsightsScreen() {
  const [viewPeriod, setViewPeriod] = useState('week')
  const [currentWeek, setCurrentWeek] = useState(0)

  const adherencePercent = 98
  const doseTaken = 28
  const doseSkipped = 1

  const insights = [
    'Looking at weekdays, mid-day hours were the best time for conversations',
    'You had a 5-day streak of perfect check-ins this week!',
    'Most productive conversations happen in the morning'
  ]

  const getDateRange = () => {
    if (viewPeriod === 'week') {
      return 'Mar 22 - 28'
    }
    return 'March 2021'
  }

  return (
    <div className="flex-1 overflow-auto bg-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FFD4B8] via-[#FFE5D4] to-[#FFF0E5] px-6 pt-6 pb-8 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Insights</h1>

          {/* View Toggle */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium text-gray-700">View:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setViewPeriod('week')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  viewPeriod === 'week'
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'bg-white/40 text-gray-600'
                }`}
              >
                1 week
              </button>
              <button
                onClick={() => setViewPeriod('month')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  viewPeriod === 'month'
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'bg-white/40 text-gray-600'
                }`}
              >
                1 month
              </button>
            </div>
          </div>

          {/* Date Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentWeek(currentWeek - 1)}
              className="p-2 hover:bg-white/40 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-lg font-semibold text-gray-900">{getDateRange()}</span>
            <button
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="p-2 hover:bg-white/40 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="max-w-lg mx-auto px-6 py-8">
        <div className="relative flex items-center justify-center mb-8">
          {/* Confetti decorations */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute top-8 left-12 w-2 h-6 bg-[#FFD4B8] rounded-full transform -rotate-45"></div>
            <div className="absolute top-12 right-16 w-2 h-6 bg-[#FFB84D] rounded-full transform rotate-45"></div>
            <div className="absolute bottom-12 left-20 w-2 h-6 bg-[#B4D455] rounded-full transform rotate-12"></div>
            <div className="absolute bottom-16 right-12 w-2 h-6 bg-[#FFD4B8] rounded-full transform -rotate-12"></div>
            <div className="absolute top-16 left-1/3 w-2 h-4 bg-[#FFB84D] rounded-full transform rotate-90"></div>
            <div className="absolute bottom-20 right-1/3 w-2 h-4 bg-[#B4D455] rounded-full transform -rotate-90"></div>
          </div>

          {/* SVG Progress Ring */}
          <svg className="w-64 h-64 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="128"
              cy="128"
              r="100"
              stroke="#E5E7EB"
              strokeWidth="16"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="128"
              cy="128"
              r="100"
              stroke="#B4D455"
              strokeWidth="16"
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
            <div className="text-lg font-semibold text-[#B4D455]">Outstanding!</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-200 shadow-sm">
            <div className="text-4xl font-bold text-gray-900 mb-2">{doseTaken}</div>
            <div className="text-sm text-gray-600">Dose taken</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-200 shadow-sm">
            <div className="text-4xl font-bold text-gray-900 mb-2">{doseSkipped}</div>
            <div className="text-sm text-gray-600">Skipped / Missed</div>
          </div>
        </div>

        {/* Insights Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Insights from last week:</h2>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="bg-[#FFF9F5] rounded-2xl p-4 border border-[#FFE5D4]">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-[#B4D455]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700 flex-1">{insight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Breakdown */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Breakdown</h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="space-y-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const percentage = [100, 100, 100, 100, 75, 100, 100][index]
                return (
                  <div key={day}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{day}</span>
                      <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#B4D455] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
