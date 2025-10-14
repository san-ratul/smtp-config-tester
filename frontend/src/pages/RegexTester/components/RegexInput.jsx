import React from 'react'

const RegexInput = ({ regex, setRegex, flags, setFlags, onTest }) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-800 font-medium mb-2">Regular Expression:</label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={regex}
          onChange={(e) => setRegex(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your regex pattern"
        />
        <input
          type="text"
          value={flags}
          onChange={(e) => setFlags(e.target.value)}
          className="w-full sm:w-20 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Flags"
        />
        <button
          onClick={onTest}
          className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
        >
          Test Regex
        </button>
      </div>
    </div>
  )
}

export default RegexInput