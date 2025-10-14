import React from 'react'

const MatchInformation = ({ matches, error, regex, testString }) => {
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        Error: {error}
      </div>
    )
  }

  const processLines = (text, matches) => {
    const lines = text.split('\n')
    const processedLines = []
    let lineNumber = 1

    lines.forEach((line, lineIndex) => {
      // Skip empty lines
      if (line.trim() === '') return
      const lineMatches = matches.filter(match => {
        const matchStart = match.index
        const matchEnd = match.index + match.match.length
        const lineStart = text.split('\n').slice(0, lineIndex).join('\n').length + (lineIndex > 0 ? 1 : 0)
        const lineEnd = lineStart + line.length
        return matchStart >= lineStart && matchEnd <= lineEnd
      })

      const highlightLine = (lineText, lineMatches) => {
        if (!lineMatches || lineMatches.length === 0) return lineText

        let result = []
        let lastIndex = 0

        lineMatches.forEach((match, index) => {
          const relativeIndex = match.index - (text.split('\n').slice(0, lineIndex).join('\n').length + (lineIndex > 0 ? 1 : 0))
          // Add text before the match
          if (relativeIndex > lastIndex) {
            result.push(lineText.slice(lastIndex, relativeIndex))
          }
          // Add highlighted match
          result.push(
            <span key={`match-${lineIndex}-${index}`} className="bg-yellow-200 px-1 rounded">
              {match.match}
            </span>
          )
          lastIndex = relativeIndex + match.match.length
        })

        // Add remaining text
        if (lastIndex < lineText.length) {
          result.push(lineText.slice(lastIndex))
        }

        return result
      }

      processedLines.push({
        lineNumber: lineNumber++,
        content: highlightLine(line, lineMatches),
        matches: lineMatches,
        hasMatches: lineMatches.length > 0
      })
    })

    return processedLines
  }

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-lg shadow-2xl p-6 border border-white/30">
      <h3 className="font-bold text-gray-800 mb-4">Results (Line by Line):</h3>
      <div className="bg-white/10 p-3 rounded border max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent space-y-1">
        {processLines(testString, matches).length > 0 ? (
          processLines(testString, matches).map((line, index) => (
            <div key={index} className={`flex items-start ${line.hasMatches ? 'bg-green-50' : 'bg-red-50'} p-2 rounded`}>
              <span className="text-gray-800 mr-3 min-w-[2rem] text-right">{line.lineNumber}:</span>
              <div className="flex-1">
                {line.content}
                {line.matches.length > 0 && (
                  <div className="text-xs text-green-600 mt-1">
                    ✓ Match found (length: {line.matches[0].match.length}, line: {line.lineNumber})
                  </div>
                )}
                {line.matches.length === 0 && testString && (
                  <div className="text-xs text-red-600 mt-1">
                    ✗ No matches - line doesn't contain the required pattern
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-600 italic text-center py-4">
            No test string provided or no content to analyze.
          </div>
        )}
      </div>
    </div>
  )
}

export default MatchInformation