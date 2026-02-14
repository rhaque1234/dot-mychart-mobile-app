import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json'
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('json', json)

export default function JsonViewer({ data }) {
  const formatted = JSON.stringify(data, null, 2)

  return (
    <div className="max-h-96 overflow-auto rounded-lg border border-gray-200">
      <SyntaxHighlighter
        language="json"
        style={xcode}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.8125rem',
          lineHeight: '1.5',
          background: '#fafafa',
        }}
      >
        {formatted}
      </SyntaxHighlighter>
    </div>
  )
}
