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
    <div className="flex-1 overflow-auto bg-[#FFFEF7] pb-20">
      {/* Header - Hero minimal style */}
      <div className="px-8 pt-16 pb-12">
        <div className="max-w-md mx-auto">
          {/* .dot branding - bold and large */}
          <h1 className="text-6xl font-bold text-black mb-16 tracking-tight text-center">.dot</h1>

          {/* View Toggle - minimal buttons */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">View:</span>
            <div className="flex gap-3">
              <button
                onClick={() => setViewPeriod('week')}
                className={`px-5 py-2 text-sm font-medium transition-all border-2 ${
                  viewPeriod === 'week'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-gray-300 hover:border-black'
                }`}
              >
                1 week
              </button>
              <button
                onClick={() => setViewPeriod('month')}
                className={`px-5 py-2 text-sm font-medium transition-all border-2 ${
                  viewPeriod === 'month'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-gray-300 hover:border-black'
                }`}
              >
                1 month
              </button>
            </div>
          </div>

          {/* Date Navigation - minimal with border */}
          <div className="flex items-center justify-between border-2 border-black px-6 py-4">
            <button
              onClick={() => setCurrentWeek(currentWeek - 1)}
              className="p-2 hover:bg-black hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-lg font-bold text-black">{getDateRange()}</span>
            <button
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="p-2 hover:bg-black hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Ring - Minimal with large percentage */}
      <div className="max-w-md mx-auto px-8 py-12">
        <div className="border-2 border-black p-12 mb-8">
          <div className="relative flex items-center justify-center mb-12">
            {/* SVG Progress Ring - Simple black stroke */}
            <svg className="w-64 h-64 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="128"
                cy="128"
                r="100"
                stroke="#D1D5DB"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle - Black */}
              <circle
                cx="128"
                cy="128"
                r="100"
                stroke="#000000"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 100}`}
                strokeDashoffset={`${2 * Math.PI * 100 * (1 - adherencePercent / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>

            {/* Center Content - Large, bold percentage */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-8xl font-bold text-black mb-2 tracking-tighter">{adherencePercent}%</div>
              <div className="text-lg font-medium text-gray-600 uppercase tracking-wider">Adherence</div>
            </div>
          </div>
        </div>

        {/* Stats - Minimal bordered cards */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="border-2 border-black p-6 text-center">
            <div className="text-5xl font-bold text-black mb-2">{doseTaken}</div>
            <div className="text-sm font-medium text-gray-600 uppercase tracking-wider">Doses taken</div>
          </div>
          <div className="border-2 border-red-600 p-6 text-center">
            <div className="text-5xl font-bold text-black mb-2">{doseSkipped}</div>
            <div className="text-sm font-medium text-gray-600 uppercase tracking-wider">Skipped / Missed</div>
          </div>
        </div>

        {/* Insights Section - Minimal list */}
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-4">Insights from last week</h2>
          <div className="space-y-3">
            {weeklyAdherence.insights.map((insight, index) => (
              <div key={index} className="border-2 border-gray-300 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1 w-8 h-8 border-2 border-black bg-black flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium flex-1 leading-relaxed text-black">{insight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Breakdown - Clean bordered card */}
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-4">Weekly breakdown</h2>
          <div className="border-2 border-black p-6">
            <div className="space-y-5">
              {weeklyAdherence.dailyBreakdown.map((day) => {
                return (
                  <div key={day.day}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-black w-12">{day.day}</span>
                        <span className="text-xs text-gray-600">{day.date}</span>
                      </div>
                      <span className="text-lg font-bold text-black">{day.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2">
                      <div
                        className={`h-2 transition-all duration-500 ${
                          day.percentage === 100 ? 'bg-black' : 'bg-gray-400'
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

        {/* Monthly Stats - Minimal black cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black p-6 text-center text-white">
            <div className="text-4xl font-bold mb-2">{monthlyStats.daysTracked}</div>
            <div className="text-sm font-medium text-gray-300 uppercase tracking-wider">Days tracked</div>
          </div>
          <div className="bg-black p-6 text-center text-white">
            <div className="text-4xl font-bold mb-2">{monthlyStats.currentStreak}</div>
            <div className="text-sm font-medium text-gray-300 uppercase tracking-wider">Current streak</div>
          </div>
        </div>
      </div>
    </div>
  )
}
