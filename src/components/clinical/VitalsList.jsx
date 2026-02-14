import CollapsibleSection from './CollapsibleSection'

export default function VitalsList({ items }) {
  return (
    <CollapsibleSection title="Recent Vitals" count={items.length}>
      {items.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No recent vitals on file</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-1.5 text-xs font-medium text-gray-500">Vital</th>
                <th className="text-right py-1.5 text-xs font-medium text-gray-500">Value</th>
                <th className="text-right py-1.5 text-xs font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((v) => (
                <tr key={v.id} className="border-b border-gray-50">
                  <td className="py-1.5 text-gray-700">{v.display}</td>
                  <td className="py-1.5 text-right font-medium text-gray-900">
                    {v.value} <span className="text-gray-400 font-normal">{v.unit}</span>
                  </td>
                  <td className="py-1.5 text-right text-xs text-gray-400">{v.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </CollapsibleSection>
  )
}
