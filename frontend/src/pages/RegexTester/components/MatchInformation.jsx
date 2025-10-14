import React from 'react'
import { useMatchProcessing } from '../../../hooks/useMatchProcessing'
import MatchHeader from './MatchHeader'
import MatchResults from './MatchResults'

/**
 * Main component for displaying regex match information
 * Refactored to use smaller, focused components
 */
const MatchInformation = ({ regex, testString, flags }) => {
    const { processedLines, hasContent, relaxedRegex } = useMatchProcessing(regex, testString, flags)
    const rawPattern = regex || ''

    // Show message when no regex is provided
    if (!rawPattern.trim()) {
        return (
            <div className="bg-blue-50 border border-blue-300 text-blue-800 px-4 py-3 rounded mb-6">
                ℹ️ No regex provided yet. Please type a pattern.
            </div>
        )
    }

    return (
        <div className="bg-white/20 backdrop-blur-md rounded-lg shadow-2xl p-6 border border-white/30">
            <MatchHeader />
            <MatchResults
                processedLines={processedLines}
                hasContent={hasContent}
                relaxedRegex={relaxedRegex}
            />
        </div>
    )
}

export default MatchInformation