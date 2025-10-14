import { useState } from 'react'
import RegexInput from './components/RegexInput'
import TestStringInput from './components/TestStringInput'
import MatchInformation from './components/MatchInformation'
import ExplanationAccordion from './components/ExplanationAccordion'
import QuickReference from './components/QuickReference'

function RegexTester() {
  const [regex, setRegex] = useState('')
  const [testString, setTestString] = useState('')
  const [matches, setMatches] = useState([])
  const [error, setError] = useState('')
  const [flags, setFlags] = useState('g')

  const handleTest = () => {
    try {
      const lines = testString.split('\n')
      const results = []

      lines.forEach((line, lineIndex) => {
        if (line.trim() === '') return // Skip empty lines

        const lineStartIndex = testString.split('\n').slice(0, lineIndex).join('\n').length + (lineIndex > 0 ? 1 : 0)
        const reg = new RegExp(regex, flags)

        // Test the entire line against the regex
        const match = reg.exec(line)
        if (match) {
          results.push({
            match: match[0],
            index: lineStartIndex + match.index,
            groups: match.slice(1)
          })
        }
      })

      setMatches(results)
      setError('')
    } catch (err) {
      setError(err.message)
      setMatches([])
    }
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden">
      <div className="container mx-auto px-4 py-0 max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white/20 backdrop-blur-md rounded-lg shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/30">
              <RegexInput
                regex={regex}
                setRegex={setRegex}
                flags={flags}
                setFlags={setFlags}
                onTest={handleTest}
              />

              <TestStringInput
                testString={testString}
                setTestString={setTestString}
              />

              <MatchInformation matches={matches} error={error} regex={regex} testString={testString} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            <ExplanationAccordion regex={regex} />
            <QuickReference />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegexTester