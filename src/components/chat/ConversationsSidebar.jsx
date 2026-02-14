import { useState } from 'react'

const patientsWithConversations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    initials: 'SJ',
    age: 42,
    mrn: 'MRN-2024-789456',
    lastMessage: 'I\'ll take it now with a small snack. Thanks!',
    lastMessageTime: '2:32 PM',
    unreadCount: 0,
    status: 'active',
    avatar: 'from-blue-500 to-blue-600',
    totalMessages: 16,
    conversations: [
      { id: 1, timestamp: '2024-02-14 08:15 AM', sender: 'patient', message: 'Good morning Dot! I just took my morning medications.' },
      { id: 2, timestamp: '2024-02-14 08:15 AM', sender: 'dot', message: 'Good morning, Sarah! That\'s wonderful. I see you took your Metformin and Lisinopril. How are you feeling today?' },
      { id: 3, timestamp: '2024-02-14 08:17 AM', sender: 'patient', message: 'I\'m feeling pretty good, but I noticed my blood sugar was a bit higher this morning - 145.' },
      { id: 4, timestamp: '2024-02-14 08:18 AM', sender: 'dot', message: 'I\'ve noted that reading. Your fasting glucose of 145 mg/dL is slightly elevated. Have you eaten anything yet this morning, or had your breakfast?' },
      { id: 5, timestamp: '2024-02-14 08:19 AM', sender: 'patient', message: 'No, I haven\'t eaten yet. I was going to have oatmeal and berries.' },
      { id: 6, timestamp: '2024-02-14 08:20 AM', sender: 'dot', message: 'That sounds like a healthy choice! Oatmeal with berries is a great option. I\'ve logged your glucose reading. Your care team will review it. Remember to check your glucose 2 hours after eating to see how your body responds.' },
      { id: 7, timestamp: '2024-02-14 10:45 AM', sender: 'patient', message: 'Dot, I just checked my blood pressure and it was 142/88. Is that okay?' },
      { id: 8, timestamp: '2024-02-14 10:46 AM', sender: 'dot', message: 'I\'ve recorded your blood pressure reading of 142/88 mmHg. This is slightly elevated from your usual readings. Have you been feeling stressed or anxious today?' },
      { id: 9, timestamp: '2024-02-14 10:48 AM', sender: 'patient', message: 'I was a bit rushed this morning. I\'ll try again in a few minutes after I sit down and relax.' },
      { id: 10, timestamp: '2024-02-14 10:49 AM', sender: 'dot', message: 'That\'s a good idea, Sarah. Take a few deep breaths and rest for 5 minutes, then measure again. I\'ll be here when you\'re ready to log the new reading.' },
      { id: 11, timestamp: '2024-02-14 11:00 AM', sender: 'patient', message: 'Okay, I checked again and it\'s 135/82 now.' },
      { id: 12, timestamp: '2024-02-14 11:01 AM', sender: 'dot', message: 'Much better! 135/82 mmHg is within your target range. I\'ve logged both readings for your care team.' },
      { id: 13, timestamp: '2024-02-14 02:30 PM', sender: 'patient', message: 'I\'m getting ready to take my afternoon Metformin. Do I need to take it with food?' },
      { id: 14, timestamp: '2024-02-14 02:31 PM', sender: 'dot', message: 'Yes, good question! Your Metformin should be taken with food to reduce stomach upset. It\'s best to take it with a meal or snack.' },
      { id: 15, timestamp: '2024-02-14 02:32 PM', sender: 'patient', message: 'I\'ll take it now with a small snack. Thanks!' },
      { id: 16, timestamp: '2024-02-14 02:33 PM', sender: 'dot', message: 'Perfect! I\'ll log that you\'ve taken your afternoon dose. Don\'t forget your Atorvastatin tonight before bed. 😊' }
    ]
  },
  {
    id: 2,
    name: 'Michael Chen',
    initials: 'MC',
    age: 67,
    mrn: 'MRN-2024-456123',
    lastMessage: 'My knee is feeling much better after the new medication!',
    lastMessageTime: '1:15 PM',
    unreadCount: 2,
    status: 'active',
    avatar: 'from-purple-500 to-purple-600',
    totalMessages: 8,
    conversations: [
      { id: 1, timestamp: '2024-02-14 09:30 AM', sender: 'dot', message: 'Good morning, Michael! Time for your morning blood pressure check. Have you taken your reading yet?' },
      { id: 2, timestamp: '2024-02-14 09:35 AM', sender: 'patient', message: 'Just did it - 138/85' },
      { id: 3, timestamp: '2024-02-14 09:36 AM', sender: 'dot', message: 'Thank you! I\'ve recorded 138/85 mmHg. That\'s a good reading. How\'s your knee pain today?' },
      { id: 4, timestamp: '2024-02-14 09:38 AM', sender: 'patient', message: 'Much better! The new medication is really helping.' },
      { id: 5, timestamp: '2024-02-14 09:39 AM', sender: 'dot', message: 'That\'s wonderful to hear! I\'ll note the improvement. Remember to take your afternoon dose of Celebrex at 2 PM.' },
      { id: 6, timestamp: '2024-02-14 01:15 PM', sender: 'patient', message: 'My knee is feeling much better after the new medication!' },
      { id: 7, timestamp: '2024-02-14 01:16 PM', sender: 'dot', message: 'I\'m so glad the medication is working well! Your care team will be pleased to hear this. Keep up the good work with your physical therapy exercises.' },
      { id: 8, timestamp: '2024-02-14 01:17 PM', sender: 'dot', message: 'Reminder: Don\'t forget to take your afternoon Celebrex at 2 PM today.' }
    ]
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    initials: 'ER',
    age: 55,
    mrn: 'MRN-2024-789012',
    lastMessage: 'Okay, I\'ll make sure to do that. Thank you!',
    lastMessageTime: '11:20 AM',
    unreadCount: 0,
    status: 'active',
    avatar: 'from-pink-500 to-pink-600',
    totalMessages: 12,
    conversations: [
      { id: 1, timestamp: '2024-02-14 07:45 AM', sender: 'patient', message: 'Good morning Dot! I took all my morning meds.' },
      { id: 2, timestamp: '2024-02-14 07:46 AM', sender: 'dot', message: 'Good morning, Emily! Excellent job with your morning medications. How did you sleep last night?' },
      { id: 3, timestamp: '2024-02-14 07:48 AM', sender: 'patient', message: 'I slept pretty well, about 7 hours.' },
      { id: 4, timestamp: '2024-02-14 07:49 AM', sender: 'dot', message: 'That\'s great! 7 hours is right in your target range. Don\'t forget to log your blood sugar before breakfast.' },
      { id: 5, timestamp: '2024-02-14 08:30 AM', sender: 'patient', message: 'Blood sugar is 128 this morning.' },
      { id: 6, timestamp: '2024-02-14 08:31 AM', sender: 'dot', message: 'Perfect! 128 mg/dL is an excellent fasting glucose reading. I\'ve logged it for your care team. Great work managing your diabetes!' },
      { id: 7, timestamp: '2024-02-14 11:15 AM', sender: 'dot', message: 'Emily, just a reminder to check your blood sugar before lunch today, as your doctor requested daily pre-meal readings this week.' },
      { id: 8, timestamp: '2024-02-14 11:18 AM', sender: 'patient', message: 'Oh right, I almost forgot. Let me check now.' },
      { id: 9, timestamp: '2024-02-14 11:19 AM', sender: 'patient', message: 'It\'s 142 before lunch.' },
      { id: 10, timestamp: '2024-02-14 11:19 AM', sender: 'dot', message: 'Thank you! 142 mg/dL before lunch is logged. That\'s slightly elevated but still within acceptable range. Try to include some fiber and protein with your lunch.' },
      { id: 11, timestamp: '2024-02-14 11:20 AM', sender: 'patient', message: 'Okay, I\'ll make sure to do that. Thank you!' },
      { id: 12, timestamp: '2024-02-14 11:21 AM', sender: 'dot', message: 'You\'re welcome! You\'re doing a fantastic job managing your health. Keep it up! 💪' }
    ]
  },
  {
    id: 4,
    name: 'Robert Williams',
    initials: 'RW',
    age: 71,
    mrn: 'MRN-2024-345678',
    lastMessage: 'I need help understanding my new prescription',
    lastMessageTime: '10:05 AM',
    unreadCount: 3,
    status: 'needs-attention',
    avatar: 'from-orange-500 to-orange-600',
    totalMessages: 5,
    conversations: [
      { id: 1, timestamp: '2024-02-14 10:00 AM', sender: 'patient', message: 'Dot, are you there?' },
      { id: 2, timestamp: '2024-02-14 10:01 AM', sender: 'dot', message: 'Yes, Robert! I\'m here. How can I help you today?' },
      { id: 3, timestamp: '2024-02-14 10:03 AM', sender: 'patient', message: 'I got a new prescription from my doctor yesterday but I\'m confused about when to take it.' },
      { id: 4, timestamp: '2024-02-14 10:04 AM', sender: 'dot', message: 'I understand it can be confusing. Let me check your medication list. Which medication are you asking about?' },
      { id: 5, timestamp: '2024-02-14 10:05 AM', sender: 'patient', message: 'I need help understanding my new prescription' }
    ]
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    initials: 'LT',
    age: 48,
    mrn: 'MRN-2024-567890',
    lastMessage: 'Thank you so much! That really helps.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    status: 'active',
    avatar: 'from-teal-500 to-teal-600',
    totalMessages: 10,
    conversations: [
      { id: 1, timestamp: '2024-02-13 03:30 PM', sender: 'patient', message: 'Dot, I\'m experiencing some dizziness. Should I be worried?' },
      { id: 2, timestamp: '2024-02-13 03:31 PM', sender: 'dot', message: 'I\'m sorry to hear you\'re feeling dizzy, Lisa. Have you eaten lunch today? Sometimes dizziness can be related to blood sugar or dehydration.' },
      { id: 3, timestamp: '2024-02-13 03:33 PM', sender: 'patient', message: 'I had a light breakfast but skipped lunch. I\'ve been really busy.' },
      { id: 4, timestamp: '2024-02-13 03:34 PM', sender: 'dot', message: 'That could definitely be contributing to your dizziness. I recommend having a snack and drinking some water. If the dizziness persists after 30 minutes, please contact your care team immediately.' },
      { id: 5, timestamp: '2024-02-13 03:35 PM', sender: 'patient', message: 'Okay, I\'ll eat something now.' },
      { id: 6, timestamp: '2024-02-13 04:10 PM', sender: 'patient', message: 'The dizziness is much better after eating and drinking water!' },
      { id: 7, timestamp: '2024-02-13 04:11 PM', sender: 'dot', message: 'That\'s great news! I\'m glad you\'re feeling better. Remember to eat regular meals, especially since you\'re on blood pressure medication. Skipping meals can affect how it works.' },
      { id: 8, timestamp: '2024-02-13 04:12 PM', sender: 'patient', message: 'I didn\'t realize that! I\'ll be more careful about eating regularly.' },
      { id: 9, timestamp: '2024-02-13 04:13 PM', sender: 'dot', message: 'Perfect! I\'ve made a note about this episode for your care team. If you experience dizziness again, please let me know right away.' },
      { id: 10, timestamp: '2024-02-13 04:14 PM', sender: 'patient', message: 'Thank you so much! That really helps.' }
    ]
  }
]

export default function ConversationsSidebar({ isOpen, onClose }) {
  const [selectedPatient, setSelectedPatient] = useState(patientsWithConversations[0])

  return (
    <>
      {/* Overlay - shows when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60]"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Always fixed, slides in from right */}
      <aside
        className={`
          fixed top-0 right-0 h-full bg-white shadow-2xl z-[70] transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ width: '900px', maxWidth: '100vw' }}
      >
        <div className="h-full flex">
          {/* Patients List */}
          <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div>
                  <h3 className="text-white font-bold text-sm">Dot Conversations</h3>
                  <p className="text-indigo-200 text-xs">{patientsWithConversations.length} Active Patients</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="lg:hidden text-white hover:text-indigo-100"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Patient List */}
            <div className="flex-1 overflow-y-auto chat-scroll">
              {patientsWithConversations.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`
                    w-full px-4 py-3 border-b border-gray-200 hover:bg-white transition-colors text-left
                    ${selectedPatient.id === patient.id ? 'bg-white border-l-4 border-l-indigo-600' : 'border-l-4 border-l-transparent'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${patient.avatar} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                      {patient.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{patient.name}</h4>
                        <span className="text-xs text-gray-500 flex-shrink-0">{patient.lastMessageTime}</span>
                      </div>
                      <p className="text-xs text-gray-600 truncate mb-1">{patient.lastMessage}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{patient.totalMessages} messages</span>
                        {patient.unreadCount > 0 && (
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {patient.unreadCount}
                          </span>
                        )}
                        {patient.status === 'needs-attention' && (
                          <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded">
                            Needs Attention
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Conversation View */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Conversation Header */}
            <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedPatient.avatar} flex items-center justify-center text-white font-bold`}>
                    {selectedPatient.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedPatient.name}</h3>
                    <p className="text-sm text-gray-600">{selectedPatient.age} years • {selectedPatient.mrn}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{selectedPatient.totalMessages} messages</span>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 chat-scroll">
              <div className="space-y-4">
                {selectedPatient.conversations.map((msg) => (
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
                            ? `bg-gradient-to-br ${selectedPatient.avatar}`
                            : 'bg-gradient-to-br from-emerald-500 to-green-600'
                        } shadow-md`}
                      >
                        {msg.sender === 'patient' ? (
                          <span className="text-white font-bold text-sm">{selectedPatient.initials}</span>
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
                              ? 'bg-indigo-600 text-white'
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
                            <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
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
          </div>
        </div>
      </aside>
    </>
  )
}
