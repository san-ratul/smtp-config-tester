import { getRegexColor } from './regexColors'

export const parseRegexForColoring = (pattern) => {
    if (!pattern) return []

    const coloredParts = []
    const chars = pattern.split('')

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i]
        const nextChar = chars[i + 1]

        switch (char) {
            case '.':
                coloredParts.push({
                    text: '.',
                    type: 'special',
                    color: getRegexColor('special')
                })
                break
            case '^':
                coloredParts.push({
                    text: '^',
                    type: 'anchor',
                    color: getRegexColor('anchor')
                })
                break
            case '$':
                coloredParts.push({
                    text: '$',
                    type: 'anchor',
                    color: getRegexColor('anchor')
                })
                break
            case '*':
                coloredParts.push({
                    text: '*',
                    type: 'quantifier',
                    color: getRegexColor('quantifier')
                })
                break
            case '+':
                coloredParts.push({
                    text: '+',
                    type: 'quantifier',
                    color: getRegexColor('quantifier')
                })
                break
            case '?':
                coloredParts.push({
                    text: '?',
                    type: 'quantifier',
                    color: getRegexColor('quantifier')
                })
                break
            case '\\':
                if (nextChar) {
                    coloredParts.push({
                        text: `\\${nextChar}`,
                        type: 'escape',
                        color: getRegexColor('escape')
                    })
                    i++
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
                coloredParts.push({
                    text: charClass,
                    type: 'characterClass',
                    color: getRegexColor('characterClass')
                })
                break
            case '(':
                if (chars[i + 1] === '?' && chars[i + 2] === ':') {
                    coloredParts.push({
                        text: '(?:',
                        type: 'group',
                        color: getRegexColor('group')
                    })
                    i += 2
                } else {
                    coloredParts.push({
                        text: '(',
                        type: 'group',
                        color: getRegexColor('group')
                    })
                }
                break
            case ')':
                coloredParts.push({
                    text: ')',
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
                coloredParts.push({
                    text: quantifier,
                    type: 'quantifier',
                    color: getRegexColor('quantifier')
                })
                break
            case '|':
                coloredParts.push({
                    text: '|',
                    type: 'alternation',
                    color: getRegexColor('alternation')
                })
                break
            default:
                if (char.match(/[a-zA-Z0-9]/)) {
                    coloredParts.push({
                        text: char,
                        type: 'literal',
                        color: getRegexColor('literal')
                    })
                } else {
                    coloredParts.push({
                        text: char,
                        type: 'special',
                        color: getRegexColor('special')
                    })
                }
        }
    }

    return coloredParts
}