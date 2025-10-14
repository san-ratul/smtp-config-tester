import React from 'react'

const FlagsList = ({ flags }) => {
    if (!flags || flags.length === 0) return null

    return (
        <div>
            <h4 className="font-semibold text-gray-800 mb-2">Global pattern flags:</h4>
            <ul className="space-y-2">
                {flags.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <code className="bg-white/20 px-2 py-1 rounded text-sm font-mono mr-3 flex-shrink-0 text-gray-800">
                            {item.symbol}
                        </code>
                        <span className="text-gray-800">modifier: {item.description}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FlagsList