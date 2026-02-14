import { useState } from 'react'

const mockChatHistory = [
  {
    id: 1,
    timestamp: '2024-02-14 08:15 AM',
    sender: 'patient',
    message: 'Good morning Dot! I just took my morning medications.'
  },
  {
    id: 2,
    timestamp: '2024-02-14 08:15 AM',
    sender: 'dot',
    message: 'Good morning, Sarah! That\'s wonderful. I see you took your Metformin and Lisinopril. How are you feeling today?'
  },
  {
    id: 3,
    timestamp: '2024-02-14 08:17 AM',
    sender: 'patient',
    message: 'I\'m feeling pretty good, but I noticed my blood sugar was a bit higher this morning - 145.'
  },
  {
    id: 4,
    timestamp: '2024-02-14 08:18 AM',
    sender: 'dot',
    message: 'I\'ve noted that reading. Your fasting glucose of 145 mg/dL is slightly elevated. Have you eaten anything yet this morning, or had your breakfast?'
  },
  {
    id: 5,
    timestamp: '2024-02-14 08:19 AM',
    sender: 'patient',
    message: 'No, I haven\'t eaten yet. I was going to have oatmeal and berries.'
  },
  {
    id: 6,
    timestamp: '2024-02-14 08:20 AM',
    sender: 'dot',
    message: 'That sounds like a healthy choice! Oatmeal with berries is a great option. I\'ve logged your glucose reading. Your care team will review it. Remember to check your glucose 2 hours after eating to see how your body responds.'
  },
  {
    id: 7,
    timestamp: '2024-02-14 10:45 AM',
    sender: 'patient',
    message: 'Dot, I just checked my blood pressure and it was 142/88. Is that okay?'
  },
  {
    id: 8,
    timestamp: '2024-02-14 10:46 AM',
    sender: 'dot',
    message: 'I\'ve recorded your blood pressure reading of 142/88 mmHg. This is slightly elevated from your usual readings. Have you been feeling stressed or anxious today? Also, make sure you\'re sitting down and relaxed when taking your blood pressure.'
  },
  {
    id: 9,
    timestamp: '2024-02-14 10:48 AM',
    sender: 'patient',
    message: 'I was a bit rushed this morning. I\'ll try again in a few minutes after I sit down and relax.'
  },
  {
    id: 10,
    timestamp: '2024-02-14 10:49 AM',
    sender: 'dot',
    message: 'That\'s a good idea, Sarah. Take a few deep breaths and rest for 5 minutes, then measure again. I\'ll be here when you\'re ready to log the new reading.'
  },
  {
    id: 11,
    timestamp: '2024-02-14 11:00 AM',
    sender: 'patient',
    message: 'Okay, I checked again and it\'s 135/82 now.'
  },
  {
    id: 12,
    timestamp: '2024-02-14 11:01 AM',
    sender: 'dot',
    message: 'Much better! 135/82 mmHg is within your target range. I\'ve logged both readings for your care team. Remember, it\'s normal for blood pressure to fluctuate throughout the day. Keep up the great work with your medication adherence!'
  },
  {
    id: 13,
    timestamp: '2024-02-14 02:30 PM',
    sender: 'patient',
    message: 'I\'m getting ready to take my afternoon Metformin. Do I need to take it with food?'
  },
  {
    id: 14,
    timestamp: '2024-02-14 02:31 PM',
    sender: 'dot',
    message: 'Yes, good question! Your Metformin should be taken with food to reduce stomach upset. It\'s best to take it with a meal or snack. Have you had lunch yet?'
  },
  {
    id: 15,
    timestamp: '2024-02-14 02:32 PM',
    sender: 'patient',
    message: 'Yes, I had lunch about an hour ago. I\'ll take it now with a small snack. Thanks!'
  },
  {
    id: 16,
    timestamp: '2024-02-14 02:33 PM',
    sender: 'dot',
    message: 'Perfect! I\'ll log that you\'ve taken your afternoon dose. Don\'t forget your Atorvastatin tonight before bed. I\'ll send you a reminder around 9 PM. Have a wonderful afternoon, Sarah! 😊'
  }
]

export default function ChatLogs() {
  const [selectedDate, setSelectedDate] = useState('today')

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Dot Conversation Logs</h3>
              <p className="text-indigo-200 text-sm">AI Caregiver ↔ Patient Sarah Johnson</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 text-sm bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-[600px] overflow-y-auto p-6 bg-gray-50 chat-scroll">
        <div className="space-y-4">
          {mockChatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex gap-3 max-w-[75%] ${
                  msg.sender === 'patient' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === 'patient'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                      : 'bg-gradient-to-br from-emerald-500 to-green-600'
                  } shadow-md`}
                >
                  {msg.sender === 'patient' ? (
                    <span className="text-white font-bold text-sm">SJ</span>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
                    </svg>
                  )}
                </div>

                {/* Message Bubble */}
                <div>
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-sm ${
                      msg.sender === 'patient'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.message}</p>
                  </div>
                  <div
                    className={`flex items-center gap-2 mt-1 px-2 ${
                      msg.sender === 'patient' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    {msg.sender === 'patient' && (
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="border-t border-gray-200 bg-white px-6 py-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">16</p>
            <p className="text-xs text-gray-500 mt-1">Messages Today</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">4</p>
            <p className="text-xs text-gray-500 mt-1">Medications Logged</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">3</p>
            <p className="text-xs text-gray-500 mt-1">Vitals Recorded</p>
          </div>
        </div>
      </div>
    </div>
  )
}
