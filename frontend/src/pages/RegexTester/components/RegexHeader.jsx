import React from 'react'
import { parseRegexForColoring } from '../../../utils/regexParser'

const RegexHeader = ({ regex, flags }) => {
    if (!regex) return null

    const coloredParts = parseRegexForColoring(regex)

    return (
        <div className="bg-black/80 font-mono px-4 py-3 overflow-x-auto whitespace-pre">
            <span className="text-green-300">/</span>
            {coloredParts.map((part, index) => (
                <span key={index} className={part.color.text}>
                    {part.text}
                </span>
            ))}
            <span className="text-green-300">/{flags}</span>
        </div>
    )
}

export default RegexHeader