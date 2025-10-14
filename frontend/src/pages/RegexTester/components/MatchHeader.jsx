import React from 'react'

/**
 * Component for rendering the match information header with legend
 */
const MatchHeader = () => {
    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-2 md:space-y-0">
            <div className="font-bold text-lg leading-tight">
                <h3>Match Information</h3>
            </div>
            <div className="text-xs text-gray-600 flex items-center space-x-3">
                <div>
                    <span className="bg-yellow-200 px-1 rounded">abc</span> Full match
                </div>
                <div>
                    <span className="bg-orange-200 px-1 rounded">abc</span> Partial substring
                </div>
            </div>
        </div>
    )
}

export default MatchHeader