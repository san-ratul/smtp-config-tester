import React from 'react'

const TestStringInput = ({ testString, setTestString }) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-800 font-medium mb-2">Test String:</label>
      <textarea
        value={testString}
        onChange={(e) => setTestString(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32"
        placeholder="Enter text to test against"
        rows="7"
      />
    </div>
  )
}

export default TestStringInput