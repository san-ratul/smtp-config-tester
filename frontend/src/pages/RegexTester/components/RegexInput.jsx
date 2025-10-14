import React, { useState, useEffect, useRef } from 'react'

const RegexInput = ({ regex, setRegex, flags, setFlags }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const flagOptions = [
    { key: 'g', label: 'Global', desc: 'Find all matches' },
    { key: 'm', label: 'Multiline', desc: '^ and $ match line starts/ends' },
    { key: 'i', label: 'Case Insensitive', desc: 'Ignore case differences' },
    { key: 's', label: 'Dot All', desc: '. matches newlines' },
    { key: 'u', label: 'Unicode', desc: 'Treat pattern as Unicode' },
    { key: 'y', label: 'Sticky', desc: 'Match from lastIndex only' }
  ];

  const handleFlagToggle = (flagKey) => {
    if (flags.includes(flagKey)) {
      setFlags(flags.replace(flagKey, ''));
    } else {
      setFlags(flags + flagKey);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-6">
      <label className="block text-gray-800 font-medium mb-2">Regular Expression:</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={regex}
          onChange={(e) => setRegex(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your regex pattern"
        />
        <div className="relative w-24" ref={dropdownRef}>
          <div
            className="p-3 border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-gray-700">{flags || 'Flags'}</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {isDropdownOpen && (
            <div className="absolute z-[100] mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg right-0">
              {flagOptions.map(flag => (
                <label key={flag.key} className="flex flex-col px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={flags.includes(flag.key)}
                      onChange={() => handleFlagToggle(flag.key)}
                      className="mr-2"
                    />
                    <span className="text-sm font-bold">{flag.label} ({flag.key})</span>
                  </div>
                  <span className="text-xs text-gray-600 ml-5">{flag.desc}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RegexInput