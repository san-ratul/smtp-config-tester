import React, { useState, useEffect } from 'react'

const ExplanationAccordion = ({ regex }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [explanation, setExplanation] = useState('')

  const generateExplanation = (pattern) => {
    if (!pattern) return []

    const explanations = []
    const chars = pattern.split('')

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i]
      const nextChar = chars[i + 1]

      switch (char) {
        case '.':
          explanations.push({ symbol: '.', description: 'Any single character (except newline)' })
          break
        case '^':
          explanations.push({ symbol: '^', description: 'Start of string' })
          break
        case '$':
          explanations.push({ symbol: '$', description: 'End of string' })
          break
        case '*':
          explanations.push({ symbol: '*', description: 'Zero or more of the preceding element' })
          break
        case '+':
          explanations.push({ symbol: '+', description: 'One or more of the preceding element' })
          break
        case '?':
          explanations.push({ symbol: '?', description: 'Zero or one of the preceding element' })
          break
        case '\\':
          if (nextChar) {
            switch (nextChar) {
              case 'd':
                explanations.push({ symbol: '\\d', description: 'Any digit (0-9)' })
                i++ // Skip next char
                break
              case 'w':
                explanations.push({ symbol: '\\w', description: 'Any word character (letter, digit, underscore)' })
                i++
                break
              case 's':
                explanations.push({ symbol: '\\s', description: 'Any whitespace character' })
                i++
                break
              case 'D':
                explanations.push({ symbol: '\\D', description: 'Any non-digit character' })
                i++
                break
              case 'W':
                explanations.push({ symbol: '\\W', description: 'Any non-word character' })
                i++
                break
              case 'S':
                explanations.push({ symbol: '\\S', description: 'Any non-whitespace character' })
                i++
                break
              default:
                explanations.push({ symbol: `\\${nextChar}`, description: `Literal backslash followed by ${nextChar}` })
                i++
            }
          }
          break
        case '[':
          let charClass = '['
          i++
          while (i < chars.length && chars[i] !== ']') {
            charClass += chars[i]
            i++
          }
          charClass += ']'
          explanations.push({ symbol: charClass, description: `Any character in the set ${charClass}` })
          break
        case '(':
          explanations.push({ symbol: '(', description: 'Start of capture group' })
          break
        case ')':
          explanations.push({ symbol: ')', description: 'End of capture group' })
          break
        case '|':
          explanations.push({ symbol: '|', description: 'OR operator (alternation)' })
          break
        default:
          if (char.match(/[a-zA-Z0-9]/)) {
            explanations.push({ symbol: char, description: `Literal character "${char}"` })
          } else {
            explanations.push({ symbol: char, description: `Special character "${char}"` })
          }
      }
    }

    return explanations
  }

  useEffect(() => {
    setExplanation(generateExplanation(regex))
  }, [regex])

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-lg shadow-2xl border border-white/30 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 bg-white/10 hover:bg-white/20 focus:outline-none transition-colors"
      >
        <span className="font-medium text-gray-800">Regex Explanation</span>
        <span className="float-right transition-transform duration-200 text-gray-800">{isOpen ? '−' : '+'}</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 bg-white/10 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          {explanation.length > 0 ? (
            <ul className="space-y-2">
              {explanation.map((item, index) => (
                <li key={index} className="flex items-start">
                  <code className="bg-white/20 px-2 py-1 rounded text-sm font-mono mr-3 flex-shrink-0 text-gray-800">
                    {item.symbol}
                  </code>
                  <span className="text-gray-800">{item.description}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 italic">Enter a regex pattern to see its explanation.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExplanationAccordion