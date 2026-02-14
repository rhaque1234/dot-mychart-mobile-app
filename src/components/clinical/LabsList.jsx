import CollapsibleSection from './CollapsibleSection'

export default function LabsList({ items }) {
  return (
    <CollapsibleSection title="Recent Labs" count={items.length}>
      {items.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No recent labs on file</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-1.5 text-xs font-medium text-gray-500">Lab</th>
                <th className="text-right py-1.5 text-xs font-medium text-gray-500">Value</th>
                <th className="text-right py-1.5 text-xs font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((l) => (
                <tr key={l.id} className="border-b border-gray-50">
                  <td className="py-1.5 text-gray-700">{l.display}</td>
                  <td className="py-1.5 text-right">
                    <span className="font-medium text-gray-900">{l.value}</span>{' '}
                    <span className="text-gray-400 text-xs">{l.unit}</span>
                    {l.referenceRange && (
                      <span className="block text-xs text-gray-400">Ref: {l.referenceRange}</span>
                    )}
                  </td>
                  <td className="py-1.5 text-right text-xs text-gray-400">{l.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </CollapsibleSection>
  )
}
