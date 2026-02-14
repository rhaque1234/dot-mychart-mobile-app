export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg className="animate-spin h-12 w-12 text-blue-600" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
          </svg>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-700">{message}</p>
        <p className="text-xs text-gray-500 mt-1">Please wait...</p>
      </div>
    </div>
  )
}
