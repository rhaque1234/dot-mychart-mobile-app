import { useState } from 'react'
import ClinicalSidebar from '../components/clinical/ClinicalSidebar'
import NavigationSidebar from '../components/navigation/NavigationSidebar'
import ConversationsSidebar from '../components/chat/ConversationsSidebar'
import LoadingSpinner from '../components/ui/LoadingSpinner'

// Mock patient data to showcase the beautified UI
const mockPatientData = {
  patient: {
    name: 'Sarah Johnson',
    firstName: 'Sarah',
    age: 42,
    gender: 'female',
    birthDate: '1982-03-15',
    mrn: 'MRN-2024-789456'
  },
  medications: [
    {
      id: '1',
      name: 'Metformin 500mg',
      status: 'active',
      dosage: '500mg',
      frequency: 'Twice daily',
      route: 'Oral'
    },
    {
      id: '2',
      name: 'Lisinopril 10mg',
      status: 'active',
      dosage: '10mg',
      frequency: 'Once daily',
      route: 'Oral'
    },
    {
      id: '3',
      name: 'Atorvastatin 20mg',
      status: 'active',
      dosage: '20mg',
      frequency: 'Once daily at bedtime',
      route: 'Oral'
    },
    {
      id: '4',
      name: 'Aspirin 81mg',
      status: 'active',
      dosage: '81mg',
      frequency: 'Once daily',
      route: 'Oral'
    }
  ],
  vitals: [
    {
      id: 'v1',
      display: 'Blood Pressure',
      value: '128/82',
      unit: 'mmHg',
      date: '2024-02-14'
    },
    {
      id: 'v2',
      display: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      date: '2024-02-14'
    },
    {
      id: 'v3',
      display: 'Temperature',
      value: '98.6',
      unit: '°F',
      date: '2024-02-14'
    },
    {
      id: 'v4',
      display: 'Weight',
      value: '165',
      unit: 'lbs',
      date: '2024-02-14'
    }
  ],
  allergies: [
    {
      id: 'a1',
      substance: 'Penicillin',
      criticality: 'high',
      reaction: 'Hives, difficulty breathing',
      category: 'Medication'
    },
    {
      id: 'a2',
      substance: 'Latex',
      criticality: 'low',
      reaction: 'Skin irritation',
      category: 'Environment'
    }
  ],
  conditions: [
    {
      id: 'c1',
      display: 'Type 2 Diabetes Mellitus',
      clinicalStatus: 'active'
    },
    {
      id: 'c2',
      display: 'Essential Hypertension',
      clinicalStatus: 'active'
    },
    {
      id: 'c3',
      display: 'Hyperlipidemia',
      clinicalStatus: 'active'
    }
  ],
  labs: [
    {
      id: 'l1',
      display: 'Hemoglobin A1C',
      value: '6.8',
      unit: '%',
      referenceRange: '4.0-5.6',
      date: '2024-02-10'
    },
    {
      id: 'l2',
      display: 'LDL Cholesterol',
      value: '105',
      unit: 'mg/dL',
      referenceRange: '<100',
      date: '2024-02-10'
    },
    {
      id: 'l3',
      display: 'HDL Cholesterol',
      value: '58',
      unit: 'mg/dL',
      referenceRange: '>40',
      date: '2024-02-10'
    },
    {
      id: 'l4',
      display: 'eGFR',
      value: '92',
      unit: 'mL/min/1.73m²',
      referenceRange: '>60',
      date: '2024-02-10'
    }
  ]
}

export default function DemoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [navSidebarOpen, setNavSidebarOpen] = useState(false)
  const [conversationsOpen, setConversationsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Navigation Sidebar */}
      <NavigationSidebar isOpen={navSidebarOpen} onClose={() => setNavSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0 h-20 sticky top-0 z-20">
          <div className="h-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile menu toggle */}
              <button
                onClick={() => setNavSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Patient Dashboard
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  Real-time clinical overview
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {/* Dot Conversations Button */}
              <button
                onClick={() => setConversationsOpen(!conversationsOpen)}
                className={`relative p-2 rounded-lg transition-colors ${
                  conversationsOpen ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100 text-gray-600'
                }`}
                title="View Dot Conversations"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
              </button>
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {/* User menu */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-xs text-gray-500">Nurse Practitioner</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold">
                  SJ
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Total Patients */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Patients</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">1,234</h3>
                    <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      +12% this month
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Appointments Today */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">48</h3>
                    <p className="text-sm text-gray-500 mt-1">12 remaining</p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Pending Lab Results */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Labs</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">23</h3>
                    <p className="text-sm text-orange-600 mt-1">Requires attention</p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Critical Alerts */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">3</h3>
                    <p className="text-sm text-red-600 mt-1">Immediate action needed</p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Welcome Card */}
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-xl shadow-lg p-8 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Welcome back, Sarah! 👋</h2>
                      <p className="text-indigo-100 mb-4">Here's what's happening with your patients today</p>
                      <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                        View Schedule
                      </button>
                    </div>
                    <div className="hidden md:block">
                      <svg className="w-32 h-32 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Current Patient Info Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Current Patient Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white text-xl font-bold">
                        SJ
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                        <p className="text-sm text-gray-600">42 years • Female • MRN: 2024-789456</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500">Last Visit</p>
                        <p className="text-sm font-semibold text-gray-900">Feb 10, 2024</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Conditions</p>
                        <p className="text-sm font-semibold text-gray-900">3 Active</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Medications</p>
                        <p className="text-sm font-semibold text-gray-900">4 Active</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Allergies</p>
                        <p className="text-sm font-semibold text-red-600">2 Known</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Clinical Sidebar (always visible) */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <ClinicalSidebar
                    patient={mockPatientData.patient}
                    medications={mockPatientData.medications}
                    conditions={mockPatientData.conditions}
                    allergies={mockPatientData.allergies}
                    vitals={mockPatientData.vitals}
                    labs={mockPatientData.labs}
                    loading={false}
                    error={null}
                    isOpen={sidebarOpen}
                    onToggle={() => setSidebarOpen(!sidebarOpen)}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Conversations Sidebar */}
      <ConversationsSidebar
        isOpen={conversationsOpen}
        onClose={() => setConversationsOpen(false)}
      />
    </div>
  )
}
