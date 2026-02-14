import ModeToggle from '../ui/ModeToggle'

export default function CardShell({ title, badge, children, mode, onModeChange, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3 min-w-0">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
          {badge}
        </div>
        {onModeChange && <ModeToggle mode={mode} onChange={onModeChange} />}
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}
