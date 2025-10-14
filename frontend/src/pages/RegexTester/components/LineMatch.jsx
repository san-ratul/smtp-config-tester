import React from 'react'
import { useMatchHighlighting } from '../../../hooks/useMatchProcessing'

/**
 * Component for rendering a single line with match information
 */
const LineMatch = ({ lineData, relaxedRegex }) => {
    const { lineNumber, rawText, matches, hasMatches, mismatchReason, lineStart } = lineData
    const { highlightLine } = useMatchHighlighting()

    // Highlight the line content with proper relaxed regex
    const highlightedContent = highlightLine(rawText, matches, lineStart, relaxedRegex)

    return (
        <div
            className={`flex items-start ${hasMatches ? 'bg-green-50' : 'bg-red-50'} p-2 rounded`}
        >
            <span className="text-gray-800 mr-3 min-w-[2rem] text-right">
                {lineNumber}:
            </span>
            <div className="flex-1">
                <div className="font-mono text-sm">
                    {highlightedContent}
                </div>
                {matches.length > 0 ? (
                    <div className="text-xs text-green-600 mt-1">
                        ✓ {matches.length} match{matches.length > 1 ? 'es' : ''} found (line {lineNumber})
                    </div>
                ) : (
                    <div className="text-xs text-red-600 mt-1">
                        ✗ {mismatchReason}
                    </div>
                )}
            </div>
        </div>
    )
}

export default LineMatch