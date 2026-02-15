export default function SettingsScreen({ isConnected }) {
  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: '👤', label: 'Profile', value: 'John Doe', action: () => {} },
        { icon: '📧', label: 'Email', value: 'john.doe@example.com', action: () => {} },
        { icon: '📱', label: 'Phone', value: '+1 (555) 123-4567', action: () => {} }
      ]
    },
    {
      title: 'Dot Device',
      items: [
        { icon: '🔌', label: 'Connection Status', value: isConnected ? 'Connected' : 'Disconnected', action: () => {} },
        { icon: '🔊', label: 'Voice Settings', value: 'Configure', action: () => {} },
        { icon: '🔔', label: 'Notifications', value: 'Enabled', action: () => {} }
      ]
    },
    {
      title: 'Care Team',
      items: [
        { icon: '👨‍⚕️', label: 'Primary Doctor', value: 'Dr. Smith', action: () => {} },
        { icon: '👩‍⚕️', label: 'Nurse', value: 'Sarah Johnson', action: () => {} },
        { icon: '📞', label: 'Emergency Contact', value: '+1 (555) 911-0000', action: () => {} }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: '🌙', label: 'Quiet Hours', value: '10 PM - 7 AM', action: () => {} },
        { icon: '💊', label: 'Medication Reminders', value: 'On', action: () => {} },
        { icon: '🔐', label: 'Privacy & Security', value: 'Manage', action: () => {} }
      ]
    }
  ]

  return (
    <div className="flex-1 overflow-auto bg-white pb-20">
      {/* Header */}
      <div className="bg-black text-white p-6 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-1">Settings</h1>
          <p className="text-gray-300 text-sm">Manage your account and preferences</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-6 mb-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
              👤
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">John Doe</h2>
              <p className="text-gray-300 text-sm mb-2">Patient ID: #12345</p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                <span className="text-xs text-gray-300">
                  {isConnected ? 'Device Connected' : 'Device Offline'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
              {section.title}
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={item.action}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">{item.label}</div>
                    {item.value && (
                      <div className="text-sm text-gray-500 mt-0.5">{item.value}</div>
                    )}
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* About Section */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
            About
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="text-2xl">ℹ️</div>
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-900">Help & Support</div>
                <div className="text-sm text-gray-500 mt-0.5">Get help with Dot</div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="text-2xl">📄</div>
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-900">Terms & Privacy</div>
                <div className="text-sm text-gray-500 mt-0.5">Legal information</div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="p-4 bg-gray-50">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Dot Mobile App</div>
                <div className="text-xs text-gray-500">Version 1.0.0</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button className="w-full bg-black text-white rounded-xl p-4 font-semibold hover:bg-gray-900 transition-colors">
          Sign Out
        </button>
      </div>
    </div>
  )
}
