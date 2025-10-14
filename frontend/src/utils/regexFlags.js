export const getFlagExplanations = (flagString) => {
    const flagExplanations = []
    if (flagString.includes('g')) {
        flagExplanations.push({ symbol: 'g', description: 'Global. All matches (don\'t return after first match)' })
    }
    if (flagString.includes('m')) {
        flagExplanations.push({ symbol: 'm', description: 'Multi line. Causes ^ and $ to match the begin/end of each line (not only begin/end of string)' })
    }
    if (flagString.includes('i')) {
        flagExplanations.push({ symbol: 'i', description: 'Case insensitive. Case insensitive match' })
    }
    if (flagString.includes('s')) {
        flagExplanations.push({ symbol: 's', description: 'Dot all. Allows . to match newlines' })
    }
    if (flagString.includes('u')) {
        flagExplanations.push({ symbol: 'u', description: 'Unicode. Treat pattern as a sequence of Unicode code points' })
    }
    if (flagString.includes('y')) {
        flagExplanations.push({ symbol: 'y', description: 'Sticky. Matches only from the index indicated by the lastIndex property' })
    }
    return flagExplanations
}