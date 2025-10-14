import { useMemo } from 'react'
import {
    buildRegex,
    makeRelaxedRegex,
    processMatches,
    processLines,
    findPartialOccurrences
} from '../utils/matchUtils'

/**
 * Custom hook for processing regex matches in text
 */
export const useMatchProcessing = (regex, testString, flags) => {
    return useMemo(() => {
        // Build regex object
        const regexObj = buildRegex(regex, flags)
        const rawPattern = regex || ''

        if (!rawPattern.trim()) {
            return {
                regexObj: null,
                relaxedRegex: null,
                processedLines: [],
                totalMatches: 0,
                hasContent: false
            }
        }

        // Process matches
        const text = typeof testString === 'string' ? testString : ''
        const computedMatches = processMatches(text, regexObj)
        const relaxedRegex = regexObj ? makeRelaxedRegex(regexObj) : null

        // Process lines
        const processedLines = processLines(text, computedMatches, regexObj, relaxedRegex)

        return {
            regexObj,
            relaxedRegex,
            processedLines,
            totalMatches: computedMatches.length,
            hasContent: text.trim().length > 0
        }
    }, [regex, testString, flags])
}

/**
 * Hook for highlighting matches in text
 */
export const useMatchHighlighting = () => {
    const highlightLine = (lineText, lineMatches, lineStart, relaxedRegex) => {
        const partialMatches = findPartialOccurrences(lineText, lineStart, lineMatches, relaxedRegex)

        // Filter out partial matches that exactly match full matches
        const filteredPartialMatches = partialMatches.filter(partial =>
            !lineMatches.some(full =>
                full.index === partial.index && full.match === partial.match
            )
        )

        const all = [
            ...lineMatches.map((m) => ({ ...m, type: 'full' })),
            ...filteredPartialMatches
        ].sort((a, b) => a.index - b.index)

        if (all.length === 0) return lineText

        const result = []
        let last = 0
        all.forEach((m, i) => {
            const rel = m.index - lineStart
            if (rel > last) result.push(lineText.slice(last, rel))
            result.push(
                <span
                    key={`m-${lineStart}-${i}`}
                    className={`${m.type === 'full' ? 'bg-yellow-200' : 'bg-orange-200'} px-1 rounded`}
                >
                    {m.match}
                </span>
            )
            last = rel + m.match.length
        })
        if (last < lineText.length) result.push(lineText.slice(last))
        return result
    }

    return { highlightLine }
}