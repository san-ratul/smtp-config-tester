import React from 'react'
import LineMatch from './LineMatch'

/**
 * Component for rendering the list of match results
 */
const MatchResults = ({ processedLines, hasContent, relaxedRegex }) => {
    if (!hasContent) {
        return (
            <div className="text-gray-600 italic text-center py-4">
                No test string provided or no content to analyze.
            </div>
        )
    }

    return (
        <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent space-y-1">
            {processedLines.map((lineData, idx) => (
                <LineMatch
                    key={`line-${idx}`}
                    lineData={lineData}
                    relaxedRegex={relaxedRegex}
                />
            ))}
        </div>
    )
}

export default MatchResults