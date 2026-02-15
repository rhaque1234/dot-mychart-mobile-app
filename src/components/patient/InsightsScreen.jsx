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

          <h1 className="text-4xl font-bold text-gray-900 mb-8">Insights</h1>

          {/* View Toggle - Soft rounded pills */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-bold text-gray-600">View:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setViewPeriod('week')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  viewPeriod === 'week'
                    ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-900'
                }`}
              >
                1 week
              </button>
              <button
                onClick={() => setViewPeriod('month')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  viewPeriod === 'month'
                    ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-900'
                }`}
              >
                1 month
              </button>
            </div>
          </div>

          {/* Date Navigation - Soft white card */}
          <div className="flex items-center justify-between bg-white rounded-[24px] px-6 py-4 border border-gray-200 shadow-sm">
            <button
              onClick={() => setCurrentWeek(currentWeek - 1)}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-lg font-bold text-gray-900">{getDateRange()}</span>
            <button
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Ring - Soft circular design with dot pattern */}
      <div className="max-w-lg mx-auto px-6 py-8">
        <div className="relative bg-white rounded-[32px] p-8 shadow-md border border-gray-100">
          {/* Subtle dot pattern decorations */}
          <div className="absolute top-6 right-6 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-100"></div>
            <div className="w-2 h-2 rounded-full bg-gray-100"></div>
            <div className="w-2 h-2 rounded-full bg-gray-100"></div>
          </div>
          <div className="absolute bottom-6 left-6 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-50"></div>
            <div className="w-3 h-3 rounded-full bg-gray-50"></div>
          </div>

          <div className="relative flex items-center justify-center mb-8">
            {/* SVG Progress Ring - Softer colors */}
            <svg className="w-64 h-64 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="128"
                cy="128"
                r="100"
                stroke="#F3F4F6"
                strokeWidth="16"
                fill="none"
              />
              {/* Progress circle - Soft gray-900 */}
              <circle
                cx="128"
                cy="128"
                r="100"
                stroke="#111827"
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
              <div className="text-lg font-bold text-gray-600">Adherence</div>
            </div>
          </div>
        </div>

        {/* Stats - Soft rounded cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-green-50 rounded-[24px] p-6 text-center border border-green-200 shadow-sm">
            <div className="text-4xl font-bold text-gray-900 mb-2">{doseTaken}</div>
            <div className="text-sm font-medium text-gray-600">Doses taken</div>
          </div>
          <div className="bg-red-50 rounded-[24px] p-6 text-center border border-red-200 shadow-sm">
            <div className="text-4xl font-bold text-gray-900 mb-2">{doseSkipped}</div>
            <div className="text-sm font-medium text-gray-600">Skipped / Missed</div>
          </div>
        </div>

        {/* Insights Section - Soft cards with dot patterns */}
        <div className="mb-8">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Insights from last week</h2>
          <div className="space-y-3">
            {weeklyAdherence.insights.map((insight, index) => (
              <div key={index} className="bg-white rounded-[24px] p-5 border border-gray-200 shadow-sm relative overflow-hidden">
                {/* Decorative dots */}
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-100"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-100"></div>
                </div>
                <div className="flex items-start gap-3 relative z-10">
                  <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shadow-md shadow-gray-900/20">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium flex-1 leading-relaxed text-gray-900">{insight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Breakdown - Soft rounded card */}
        <div className="mb-8">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Weekly breakdown</h2>
          <div className="bg-white rounded-[32px] p-6 border border-gray-200 shadow-sm">
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
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          day.percentage === 100 ? 'bg-gray-900 shadow-sm shadow-gray-900/30' : 'bg-gray-400'
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

        {/* Monthly Stats - Soft cards */}
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
