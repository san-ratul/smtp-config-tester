// Utility functions for regex processing and validation

/**
 * Build RegExp safely from pattern + flags (always ensure 'g' for scanning)
 */
export const buildRegex = (regex, flags = '') => {
    if (!regex || !regex.trim()) return null

    try {
        let finalFlags = flags || ''
        if (!finalFlags.includes('g')) finalFlags += 'g'
        return new RegExp(regex, finalFlags)
    } catch {
        return null
    }
}

/**
 * Create a relaxed version of regex by removing ^ and $ anchors
 */
export const makeRelaxedRegex = (regex) => {
    if (!regex) return null

    const src = regex.source.replace(/^\^/, '').replace(/\$$/, '')
    if (src === '') return null

    let flags = regex.flags
    if (!flags.includes('g')) flags += 'g'

    try {
        return new RegExp(src, flags)
    } catch {
        return null
    }
}

/**
 * Get mismatch reason for a line that didn't match
 */
export const getLineMismatchReason = (lineText, fullRegex, relaxedRegex, lineMatches) => {
    if (lineText.length === 0) return 'Empty line'
    if (lineMatches.length > 0) return null // already matched

    const trimmed = lineText.trim()
    if (trimmed.length === 0) return 'Whitespace-only line'

    // If trimming enables a match, explain the space problem
    try {
        if (fullRegex && fullRegex.test(trimmed)) {
            return 'Leading/trailing spaces prevent match (try trimming or allow \\s*)'
        }
    } catch {}

    // If relaxed regex finds a substring, report partial
    if (relaxedRegex) {
        try {
            relaxedRegex.lastIndex = 0
            const found = relaxedRegex.test(lineText)
            if (found) {
                // Count occurrences
                let count = 0
                relaxedRegex.lastIndex = 0
                const text = lineText
                for (const _ of text.matchAll(relaxedRegex)) count++
                return `Contains a valid substring ${count} time${count > 1 ? 's' : ''}, but full pattern didn't match the whole line`
            }
        } catch {}
    }

    return 'No matches found'
}

/**
 * Find partial matches in a line (true regex-based, not plain substring)
 */
export const findPartialOccurrences = (lineText, lineStart, fullMatches, relaxedRegex) => {
    const out = []
    if (!relaxedRegex) return out

    try {
        relaxedRegex.lastIndex = 0
        for (const m of lineText.matchAll(relaxedRegex)) {
            const relIdx = m.index ?? 0
            const globIdx = lineStart + relIdx
            const matchedText = m[0] ?? ''

            // Skip if this exact match (position and content) is already in full matches
            const isExactDuplicate = fullMatches.some((fm) =>
                fm.index === globIdx && fm.match === matchedText
            )

            if (!isExactDuplicate && matchedText.length > 0) {
                out.push({ index: globIdx, match: matchedText, type: 'partial' })
            }
        }
    } catch {}
    return out
}

/**
 * Process text and find all matches
 */
export const processMatches = (text, regexObj) => {
    const computedMatches = []
    if (regexObj && text) {
        try {
            for (const m of text.matchAll(regexObj)) {
                computedMatches.push({ index: m.index ?? 0, match: m[0] ?? '' })
            }
        } catch {
            // if user passed flags that break, just fall through with no matches
        }
    }
    return computedMatches
}

/**
 * Process lines and extract match information
 */
export const processLines = (text, computedMatches, regexObj, relaxedRegex) => {
    const lines = text.split('\n')
    const processed = []
    let lineNo = 1
    let offset = 0

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const lineStart = offset
        const lineEnd = lineStart + line.length

        const lineMatches = computedMatches.filter((mm) => {
            const s = mm.index
            const e = mm.index + mm.match.length
            return s >= lineStart && e <= lineEnd
        })

        processed.push({
            lineNumber: lineNo++,
            content: line,
            rawText: line,
            matches: lineMatches,
            hasMatches: lineMatches.length > 0,
            mismatchReason: getLineMismatchReason(line, regexObj, relaxedRegex, lineMatches),
            lineStart: lineStart // Add lineStart for proper highlighting
        })

        // advance offset (+1 for the newline we split on, except after last line)
        offset = lineEnd + 1
    }

    return processed
}