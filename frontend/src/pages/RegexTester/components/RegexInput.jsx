import React, { useState } from 'react'

const RegexInput = ({ regex, setRegex, flags, setFlags, onTest }) => {
  const [error, setError] = useState('');

  const validateRegex = (pattern) => {
    if (!pattern) {
      setError('Regex pattern cannot be empty');
      return false;
    }
    try {
      new RegExp(pattern);
      setError('');
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    }
  };

  const validateFlags = (flagStr) => {
    const validFlags = ['g', 'i', 'm', 's', 'u', 'y', 'd'];
    return [...flagStr].every(flag => validFlags.includes(flag));
  };

  const handleRegexChange = (e) => {
    const newValue = e.target.value;
    setRegex(newValue);
    validateRegex(newValue);
  };

  const handleFlagsChange = (e) => {
    const newFlags = e.target.value;
    if (validateFlags(newFlags)) {
      setFlags(newFlags);
      setError('');
    } else {
      setError('Invalid regex flags. Valid flags are: g, i, m, s, u, y, d');
    }
  };

  const handleTest = () => {
    if (validateRegex(regex) && validateFlags(flags)) {
      onTest();
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-800 font-medium mb-2">Regular Expression:</label>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 flex flex-col">
          <input
            type="text"
            value={regex}
            onChange={handleRegexChange}
            className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
            placeholder="Enter your regex pattern"
          />
          {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
        </div>
        <input
          type="text"
          value={flags}
          onChange={handleFlagsChange}
          className={`w-full sm:w-20 p-3 border ${error && flags ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${error && flags ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
          placeholder="Flags"
        />
        <button
          onClick={handleTest}
          className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap disabled:bg-blue-300 disabled:cursor-not-allowed"
          disabled={!!error}
        >
          Test Regex
        </button>
      </div>
    </div>
  )
}

export default RegexInput