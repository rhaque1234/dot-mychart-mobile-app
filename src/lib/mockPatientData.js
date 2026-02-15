/**
 * Mock FHIR-based patient data for mobile patient app
 * Simulates Synthea-generated patient data with realistic medications,
 * vitals, and adherence tracking
 */

// Current date context: February 14, 2026
const TODAY = new Date('2026-02-14')

// Helper to get dates relative to today
function daysAgo(days) {
  const date = new Date(TODAY)
  date.setDate(date.getDate() - days)
  return date.toISOString()
}

function daysFromNow(days) {
  const date = new Date(TODAY)
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Patient demographics
export const patientData = {
  id: 'patient-001',
  name: 'Raiyan Haque',
  firstName: 'Raiyan',
  birthDate: '1978-05-15',
  age: 47,
  gender: 'male',
  mrn: 'MRN-8472651',
  phone: '(555) 234-5678',
  email: 'raiyan.haque@email.com'
}

// Medication schedule with adherence tracking
export const medications = [
  {
    id: 'med-001',
    name: 'Lisinopril',
    dosage: '10 mg',
    frequency: 'Once daily',
    route: 'Oral',
    time: '8:00 AM',
    status: 'active',
    category: 'Blood Pressure',
    instructions: 'Take with or without food',
    nextDose: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 8, 0),
    color: '#4F46E5' // Indigo
  },
  {
    id: 'med-002',
    name: 'Metformin',
    dosage: '500 mg',
    frequency: 'Twice daily',
    route: 'Oral',
    time: '8:00 AM, 8:00 PM',
    status: 'active',
    category: 'Diabetes',
    instructions: 'Take with meals',
    nextDose: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 20, 0),
    color: '#059669' // Green
  },
  {
    id: 'med-003',
    name: 'Atorvastatin',
    dosage: '20 mg',
    frequency: 'Once daily',
    route: 'Oral',
    time: '9:00 PM',
    status: 'active',
    category: 'Cholesterol',
    instructions: 'Take in the evening',
    nextDose: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 21, 0),
    color: '#DC2626' // Red
  },
  {
    id: 'med-004',
    name: 'Aspirin',
    dosage: '81 mg',
    frequency: 'Once daily',
    route: 'Oral',
    time: '8:00 AM',
    status: 'active',
    category: 'Cardiovascular',
    instructions: 'Take with food',
    nextDose: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 8, 0),
    color: '#F59E0B' // Amber
  }
]

// Check-in schedule for today (Feb 14, 2026)
export const todaySchedule = [
  {
    id: 'checkin-001',
    time: '8:00 AM',
    medications: ['Lisinopril', 'Metformin', 'Aspirin'],
    status: 'completed',
    completedAt: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 8, 15),
    notes: 'Taken with breakfast'
  },
  {
    id: 'checkin-002',
    time: '4:00 PM',
    medications: ['Blood pressure check'],
    status: 'upcoming',
    scheduledFor: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 16, 0),
    notes: 'Evening vitals'
  },
  {
    id: 'checkin-003',
    time: '8:00 PM',
    medications: ['Metformin'],
    status: 'upcoming',
    scheduledFor: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 20, 0),
    notes: 'Take with dinner'
  },
  {
    id: 'checkin-004',
    time: '9:00 PM',
    medications: ['Atorvastatin'],
    status: 'upcoming',
    scheduledFor: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 21, 0),
    notes: 'Evening dose'
  }
]

// Vital signs history
export const vitals = [
  {
    id: 'vital-001',
    type: 'Blood Pressure',
    value: '128/82',
    unit: 'mmHg',
    date: daysAgo(0),
    displayDate: formatDate(new Date(daysAgo(0))),
    status: 'normal',
    icon: '❤️'
  },
  {
    id: 'vital-002',
    type: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    date: daysAgo(0),
    displayDate: formatDate(new Date(daysAgo(0))),
    status: 'normal',
    icon: '💓'
  },
  {
    id: 'vital-003',
    type: 'Blood Glucose',
    value: '105',
    unit: 'mg/dL',
    date: daysAgo(1),
    displayDate: formatDate(new Date(daysAgo(1))),
    status: 'normal',
    icon: '🩸'
  },
  {
    id: 'vital-004',
    type: 'Weight',
    value: '185',
    unit: 'lbs',
    date: daysAgo(3),
    displayDate: formatDate(new Date(daysAgo(3))),
    status: 'normal',
    icon: '⚖️'
  },
  {
    id: 'vital-005',
    type: 'Temperature',
    value: '98.6',
    unit: '°F',
    date: daysAgo(2),
    displayDate: formatDate(new Date(daysAgo(2))),
    status: 'normal',
    icon: '🌡️'
  }
]

// Medication adherence calendar for February 2026
// Status: 'on-time', 'late', 'missed', 'upcoming'
export const adherenceCalendar = {
  month: 'February 2026',
  year: 2026,
  monthIndex: 1, // February
  adherence: '94%',
  daysInMonth: 28,
  firstDayOfWeek: 6, // Saturday (0 = Monday in this calendar)

  // Daily adherence status (day number: status)
  statuses: {
    1: 'on-time',
    2: 'on-time',
    3: 'on-time',
    4: 'on-time',
    5: 'on-time',
    6: 'late',
    7: 'on-time',
    8: 'on-time',
    9: 'on-time',
    10: 'missed',
    11: 'on-time',
    12: 'on-time',
    13: 'on-time',
    14: 'on-time', // Today
    15: 'upcoming',
    16: 'upcoming',
    17: 'upcoming',
    18: 'upcoming',
    19: 'upcoming',
    20: 'upcoming',
    21: 'upcoming',
    22: 'upcoming',
    23: 'upcoming',
    24: 'upcoming',
    25: 'upcoming',
    26: 'upcoming',
    27: 'upcoming',
    28: 'upcoming'
  }
}

// Weekly adherence breakdown for insights
export const weeklyAdherence = {
  week: 'Feb 8 - 14',
  adherencePercent: 94,
  dosesTaken: 27,
  dosesSkipped: 2,
  dailyBreakdown: [
    { day: 'Mon', date: 'Feb 8', percentage: 100 },
    { day: 'Tue', date: 'Feb 9', percentage: 100 },
    { day: 'Wed', date: 'Feb 10', percentage: 75 }, // Missed one dose
    { day: 'Thu', date: 'Feb 11', percentage: 100 },
    { day: 'Fri', date: 'Feb 12', percentage: 100 },
    { day: 'Sat', date: 'Feb 13', percentage: 100 },
    { day: 'Sun', date: 'Feb 14', percentage: 100 }
  ],
  insights: [
    'You maintained a 14-day streak of morning medications',
    'Evening doses taken 30 minutes earlier on average this week',
    'Blood pressure readings show consistent improvement'
  ]
}

// Conversation topics (for chat screen)
export const conversationTopics = [
  {
    id: 'topic-001',
    title: 'Blood Pressure Management',
    lastMessage: 'Your recent readings show improvement',
    timestamp: daysAgo(0),
    displayTime: 'Today',
    unread: 2,
    hasAlert: false,
    category: 'Clinical'
  },
  {
    id: 'topic-002',
    title: 'Medication Side Effects',
    lastMessage: 'How are you feeling with the new dosage?',
    timestamp: daysAgo(1),
    displayTime: 'Yesterday',
    unread: 0,
    hasAlert: false,
    category: 'Medications'
  },
  {
    id: 'topic-003',
    title: 'Upcoming Lab Work',
    lastMessage: 'Reminder: Lab appointment on Feb 18',
    timestamp: daysAgo(2),
    displayTime: 'Feb 12',
    unread: 1,
    hasAlert: true,
    category: 'Appointments'
  },
  {
    id: 'topic-004',
    title: 'Diet and Exercise',
    lastMessage: 'Great progress on your walking goal!',
    timestamp: daysAgo(3),
    displayTime: 'Feb 11',
    unread: 0,
    hasAlert: false,
    category: 'Wellness'
  }
]

// Recent messages
export const recentMessages = [
  {
    id: 'msg-001',
    from: 'Care Team',
    message: 'Your blood pressure readings this week look great!',
    timestamp: daysAgo(0),
    displayTime: '2 hours ago',
    isRead: false
  },
  {
    id: 'msg-002',
    from: 'Dr. Sarah Chen',
    message: 'Lab results are in. Everything looks normal.',
    timestamp: daysAgo(1),
    displayTime: 'Yesterday',
    isRead: true
  },
  {
    id: 'msg-003',
    from: 'Pharmacy',
    message: 'Your prescription is ready for pickup',
    timestamp: daysAgo(2),
    displayTime: 'Feb 12',
    isRead: true
  }
]

// Monthly statistics
export const monthlyStats = {
  daysTracked: 14,
  currentStreak: 11,
  longestStreak: 14,
  totalDosesTaken: 52,
  totalDosesMissed: 2,
  overallAdherence: 96,
  averageAdherenceByDayOfWeek: {
    Monday: 100,
    Tuesday: 98,
    Wednesday: 95,
    Thursday: 100,
    Friday: 97,
    Saturday: 95,
    Sunday: 100
  }
}

// Helper function to get next check-in
export function getNextCheckIn() {
  const now = new Date()
  const upcoming = todaySchedule.filter(c => c.status === 'upcoming')

  if (upcoming.length === 0) {
    return {
      time: '8:00 AM',
      medications: ['Lisinopril', 'Metformin', 'Aspirin'],
      isTomorrow: true
    }
  }

  return {
    time: upcoming[0].time,
    medications: upcoming[0].medications,
    isToday: true
  }
}

// Helper function to get greeting based on time
export function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

// Helper function to calculate adherence percentage
export function calculateAdherence(taken, total) {
  if (total === 0) return 0
  return Math.round((taken / total) * 100)
}

// Dynamic adherence data for multiple weeks
export const weeklyAdherenceData = {
  // Week 0 (current week: Feb 8-14)
  0: {
    week: 'Feb 8 - 14',
    adherencePercent: 94,
    dosesTaken: 27,
    dosesSkipped: 2,
    dailyBreakdown: [
      { day: 'Mon', date: 'Feb 8', percentage: 100 },
      { day: 'Tue', date: 'Feb 9', percentage: 100 },
      { day: 'Wed', date: 'Feb 10', percentage: 75 },
      { day: 'Thu', date: 'Feb 11', percentage: 100 },
      { day: 'Fri', date: 'Feb 12', percentage: 100 },
      { day: 'Sat', date: 'Feb 13', percentage: 100 },
      { day: 'Sun', date: 'Feb 14', percentage: 100 }
    ],
    insights: [
      'You maintained a 14-day streak of morning medications',
      'Evening doses taken 30 minutes earlier on average this week',
      'Blood pressure readings show consistent improvement'
    ]
  },
  // Week -1 (Feb 1-7)
  '-1': {
    week: 'Feb 1 - 7',
    adherencePercent: 91,
    dosesTaken: 26,
    dosesSkipped: 3,
    dailyBreakdown: [
      { day: 'Mon', date: 'Feb 1', percentage: 100 },
      { day: 'Tue', date: 'Feb 2', percentage: 100 },
      { day: 'Wed', date: 'Feb 3', percentage: 75 },
      { day: 'Thu', date: 'Feb 4', percentage: 100 },
      { day: 'Fri', date: 'Feb 5', percentage: 75 },
      { day: 'Sat', date: 'Feb 6', percentage: 100 },
      { day: 'Sun', date: 'Feb 7', percentage: 100 }
    ],
    insights: [
      'Good consistency with morning medications',
      'Two evening doses were delayed this week',
      'Consider setting a reminder for Wednesday evenings'
    ]
  },
  // Week -2 (Jan 25-31)
  '-2': {
    week: 'Jan 25 - 31',
    adherencePercent: 88,
    dosesTaken: 25,
    dosesSkipped: 4,
    dailyBreakdown: [
      { day: 'Mon', date: 'Jan 25', percentage: 100 },
      { day: 'Tue', date: 'Jan 26', percentage: 75 },
      { day: 'Wed', date: 'Jan 27', percentage: 100 },
      { day: 'Thu', date: 'Jan 28', percentage: 75 },
      { day: 'Fri', date: 'Jan 29', percentage: 100 },
      { day: 'Sat', date: 'Jan 30', percentage: 100 },
      { day: 'Sun', date: 'Jan 31', percentage: 100 }
    ],
    insights: [
      'Adherence improved by end of week',
      'Tuesday and Thursday showed some missed doses',
      'Overall weekly pattern remains strong'
    ]
  },
  // Week 1 (future: Feb 15-21)
  '1': {
    week: 'Feb 15 - 21',
    adherencePercent: 96,
    dosesTaken: 28,
    dosesSkipped: 1,
    dailyBreakdown: [
      { day: 'Mon', date: 'Feb 15', percentage: 100 },
      { day: 'Tue', date: 'Feb 16', percentage: 100 },
      { day: 'Wed', date: 'Feb 17', percentage: 100 },
      { day: 'Thu', date: 'Feb 18', percentage: 100 },
      { day: 'Fri', date: 'Feb 19', percentage: 75 },
      { day: 'Sat', date: 'Feb 20', percentage: 100 },
      { day: 'Sun', date: 'Feb 21', percentage: 100 }
    ],
    insights: [
      'Projected: Excellent adherence trend',
      'Continue current routine for best results',
      'Lab work scheduled for Thursday'
    ]
  }
}

// Monthly adherence data
export function getMonthlyAdherenceData(monthOffset = 0) {
  const baseDate = new Date(2026, 1, 14) // Feb 14, 2026
  const targetDate = new Date(baseDate)
  targetDate.setMonth(targetDate.getMonth() + monthOffset)

  const year = targetDate.getFullYear()
  const monthIndex = targetDate.getMonth()
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December']
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const firstDay = new Date(year, monthIndex, 1).getDay()
  const firstDayOfWeek = (firstDay + 6) % 7 // Convert to Mon=0, Sun=6

  // Generate realistic adherence data for each month
  const monthlyData = {
    0: { adherence: '94%', missedDays: [10], lateDays: [6], daysTracked: 14, streak: 11 },
    '-1': { adherence: '91%', missedDays: [7, 14], lateDays: [3, 21], daysTracked: 31, streak: 8 },
    '-2': { adherence: '88%', missedDays: [5, 18], lateDays: [12, 25], daysTracked: 31, streak: 6 },
    '1': { adherence: '96%', missedDays: [], lateDays: [19], daysTracked: 0, streak: 0 }
  }

  const data = monthlyData[monthOffset] || monthlyData[0]

  // Build statuses for all days
  const statuses = {}
  const today = new Date(2026, 1, 14) // Feb 14, 2026
  const isCurrentMonth = monthIndex === today.getMonth() && year === today.getFullYear()
  const todayDate = isCurrentMonth ? today.getDate() : -1

  for (let day = 1; day <= daysInMonth; day++) {
    if (isCurrentMonth && day > todayDate) {
      statuses[day] = 'upcoming'
    } else if (data.missedDays.includes(day)) {
      statuses[day] = 'missed'
    } else if (data.lateDays.includes(day)) {
      statuses[day] = 'late'
    } else {
      statuses[day] = 'on-time'
    }
  }

  return {
    month: `${monthNames[monthIndex]} ${year}`,
    year,
    monthIndex,
    adherence: data.adherence,
    daysInMonth,
    firstDayOfWeek,
    statuses,
    daysTracked: data.daysTracked,
    currentStreak: data.streak
  }
}

// Monthly period adherence (for week vs month toggle)
export const monthlyPeriodData = {
  0: {
    adherencePercent: 92,
    dosesTaken: 110,
    dosesSkipped: 10,
    insights: [
      'Overall monthly adherence improved by 3% from last month',
      'Morning medication consistency at 97%',
      'Weekend adherence matches weekday performance'
    ]
  },
  '-1': {
    adherencePercent: 89,
    dosesTaken: 105,
    dosesSkipped: 15,
    insights: [
      'January showed good improvement in second half',
      'Evening medications need more attention',
      'Consider adjusting dinner reminders'
    ]
  }
}
