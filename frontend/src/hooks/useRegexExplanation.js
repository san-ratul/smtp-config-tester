import { useState, useEffect } from 'react'
import { getRegexColor } from '../utils/regexColors'

const generateExplanation = (pattern) => {
    if (!pattern) return []

    const explanations = []
    const chars = pattern.split('')

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i]
        const nextChar = chars[i + 1]

        switch (char) {
            case '.':
                explanations.push({
                    symbol: '.',
                    description: 'Any single character (except newline)',
                    type: 'special',
                    color: getRegexColor('special')
                })
                break
            case '^':
                explanations.push({
                    symbol: '^',
                    description: 'Start of string',
                    type: 'anchor',
                    color: getRegexColor('anchor')
                })
                break
            case '$':
                explanations.push({
                    symbol: '$',
                    description: 'End of string',
                    type: 'anchor',
                    color: getRegexColor('anchor')
                })
                break
            case '*':
                explanations.push({
                    symbol: '*',
                    description: 'Zero or more of the preceding token',
                    type: 'quantifier',
                    color: getRegexColor('quantifier')
                })
                break
            case '+':
                explanations.push({
                    symbol: '+',
                    description: 'One or more of the preceding token',
                    type: 'quantifier',
                    color: getRegexColor('quantifier')
                })
                break
            case '?':
                explanations.push({
                    symbol: '?',
                    description: 'Zero or one of the preceding token (optional)',
                    type: 'quantifier',
                    color: getRegexColor('quantifier')
                })
                break
            case '\\':
                if (nextChar) {
                    switch (nextChar) {
                        case 'd':
                            explanations.push({
                                symbol: '\\d',
                                description: 'Any digit (0-9)',
                                type: 'escape',
                                color: getRegexColor('escape')
                            })
                            i++
                            break
                        case 'w':
                            explanations.push({
                                symbol: '\\w',
                                description: 'Any word character (letter, digit, underscore)',
                                type: 'escape',
                                color: getRegexColor('escape')
                            })
                            i++
                            break
                        case 's':
                            explanations.push({
                                symbol: '\\s',
                                description: 'Any whitespace character',
                                type: 'escape',
                                color: getRegexColor('escape')
                            })
                            i++
                            break
                        case 'D':
                            explanations.push({
                                symbol: '\\D',
                                description: 'Any non-digit character',
                                type: 'escape',
                                color: getRegexColor('escape')
                            })
                            i++
                            break
                        case 'W':
                            explanations.push({
                                symbol: '\\W',
                                description: 'Any non-word character',
                                type: 'escape',
                                color: getRegexColor('escape')
                            })
                            i++
                            break
                        case 'S':
                            explanations.push({
                                symbol: '\\S',
                                description: 'Any non-whitespace character',
                                type: 'escape',
                                color: getRegexColor('escape')
                            })
                            i++
                            break
                        default:
                            explanations.push({
                                symbol: `\\${nextChar}`,
                                description: `Escaped literal ${nextChar}`,
                                type: 'escape',
                                color: getRegexColor('escape')
                            })
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
                explanations.push({
                    symbol: charClass,
                    description: `Any character in the set ${charClass}`,
                    type: 'characterClass',
                    color: getRegexColor('characterClass')
                })
                break
            case '(':
                if (chars[i + 1] === '?' && chars[i + 2] === ':') {
                    explanations.push({
                        symbol: '(?:',
                        description: 'Start of non-capturing group',
                        type: 'group',
                        color: getRegexColor('group')
                    })
                    i += 2
                } else {
                    explanations.push({
                        symbol: '(',
                        description: 'Start of capture group',
                        type: 'group',
                        color: getRegexColor('group')
                    })
                }
                break
            case ')':
                explanations.push({
                    symbol: ')',
                    description: 'End of group',
                    type: 'group',
                    color: getRegexColor('group')
                })
                break
            case '{':
                let quantifier = '{'
                i++
                while (i < chars.length && chars[i] !== '}') {
                    quantifier += chars[i]
                    i++
                }
                quantifier += '}'
                explanations.push({
                    symbol: quantifier,
                    description: `Quantifier: matches the previous token ${quantifier.slice(1, -1)} times`,
                    type: 'quantifier',
                    color: getRegexColor('quantifier')
                })
                break
            case '|':
                explanations.push({
                    symbol: '|',
                    description: 'OR operator (alternation)',
                    type: 'alternation',
                    color: getRegexColor('alternation')
                })
                break
            default:
                if (char.match(/[a-zA-Z0-9]/)) {
                    explanations.push({
                        symbol: char,
                        description: `Literal character "${char}"`,
                        type: 'literal',
                        color: getRegexColor('literal')
                    })
                } else {
                    explanations.push({
                        symbol: char,
                        description: `Special character "${char}"`,
                        type: 'special',
                        color: getRegexColor('special')
                    })
                }
        }
    }

    return explanations
}

export const useRegexExplanation = (regex) => {
    const [explanation, setExplanation] = useState([])

    useEffect(() => {
        setExplanation(generateExplanation(regex))
    }, [regex])

    return explanation
}