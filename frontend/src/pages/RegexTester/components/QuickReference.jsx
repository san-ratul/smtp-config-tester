import React, { useState } from 'react'

const QuickReference = () => {
  const [isOpen, setIsOpen] = useState(true)

  const quickReference = [
    { symbol: '.', description: 'Any character except newline' },
    { symbol: '^', description: 'Start of string' },
    { symbol: '$', description: 'End of string' },
    { symbol: '*', description: 'Zero or more' },
    { symbol: '+', description: 'One or more' },
    { symbol: '?', description: 'Zero or one' },
    { symbol: '\\d', description: 'Digit (0-9)' },
    { symbol: '\\w', description: 'Word character' },
    { symbol: '\\s', description: 'Whitespace' },
    { symbol: '[abc]', description: 'Any of a, b, or c' },
    { symbol: '[^abc]', description: 'Not a, b, or c' },
    { symbol: '(abc)', description: 'Capture group' },
  ]

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-lg shadow-2xl border border-white/30 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 bg-white/10 hover:bg-white/20 focus:outline-none transition-colors"
      >
        <span className="font-medium text-gray-800">Quick Reference</span>
        <span className="float-right transition-transform duration-200 text-gray-800">{isOpen ? '−' : '+'}</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 bg-white/10 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          <div className="space-y-2">
            {quickReference.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                <code className="bg-white/20 px-2 py-1 rounded text-sm font-mono text-gray-800">{item.symbol}</code>
                <span className="text-sm text-gray-800 flex-1 ml-2">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickReference