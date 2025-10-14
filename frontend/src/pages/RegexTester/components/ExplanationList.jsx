import React from 'react'

const ExplanationList = ({ explanations }) => {
    if (explanations.length === 0) return null

    return (
        <div>
            <h4 className="font-semibold text-gray-800 mb-2">Pattern Explanation:</h4>
            <ul className="space-y-2">
                {explanations.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <code className={`px-2 py-1 rounded text-sm font-mono mr-3 flex-shrink-0 text-gray-800 w-12 text-center ${item.color.bg}`}>
                            {item.symbol}
                        </code>
                        <span className="text-gray-800">{item.description}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ExplanationList