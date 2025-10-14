export const REGEX_COLORS = {
    literal: { text: 'text-green-400', bg: 'bg-green-400' },
    anchor: { text: 'text-yellow-400', bg: 'bg-yellow-400' },
    quantifier: { text: 'text-blue-400', bg: 'bg-blue-400' },
    characterClass: { text: 'text-purple-400', bg: 'bg-purple-400' },
    group: { text: 'text-orange-400', bg: 'bg-orange-400' },
    alternation: { text: 'text-red-400', bg: 'bg-red-400' },
    escape: { text: 'text-cyan-400', bg: 'bg-cyan-400' },
    special: { text: 'text-pink-400', bg: 'bg-pink-400' }
}

export const getRegexColor = (type) => {
    return REGEX_COLORS[type] || { text: 'text-gray-400', bg: 'bg-gray-400' }
}