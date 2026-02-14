export default function ErrorAlert({ title = 'Error', message }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-lg">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
          <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div>
          <h3 className="text-red-800 font-semibold">{title}</h3>
          <p className="text-red-600 text-sm mt-1">{message}</p>
        </div>
      </div>
    </div>
  )
}
