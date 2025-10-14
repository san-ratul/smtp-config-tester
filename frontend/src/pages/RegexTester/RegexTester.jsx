import { useState, useEffect } from 'react'
import RegexInput from './components/RegexInput'
import TestStringInput from './components/TestStringInput'
import MatchInformation from './components/MatchInformation'
import ExplanationAccordion from './components/ExplanationAccordion'
import QuickReference from './components/QuickReference'

function RegexTester() {
    const [regex, setRegex] = useState('')
    const [testString, setTestString] = useState('')
    const [flags, setFlags] = useState('gm')

    useEffect(() => {
        // 🧠 Detect if user typed /pattern/flags format
        // Example:  /abc\d+/gi  →  pattern: abc\d+ , flags: gi
        if (regex.startsWith('/') && regex.lastIndexOf('/') > 0) {
            const lastSlashIndex = regex.lastIndexOf('/')
            const pattern = regex.slice(1, lastSlashIndex)
            const flagPart = regex.slice(lastSlashIndex + 1)

            // Update states only if pattern changed to avoid infinite loops
            setRegex(pattern)
            setFlags(flagPart || '')
        }
    }, [regex])

    return (
        <div className="min-h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden">
            <div className="container mx-auto px-4 py-0 max-w-7xl">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                    {/* Main Content */}
                    <div className="xl:col-span-2 space-y-6">
                        <div
                            className="bg-white/20 backdrop-blur-md rounded-lg shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/30 relative z-10"
                        >
                            <RegexInput
                                regex={regex}
                                setRegex={setRegex}
                                flags={flags}
                                setFlags={setFlags}
                            />

                            <TestStringInput
                                testString={testString}
                                setTestString={setTestString}
                            />

                            <MatchInformation
                                regex={regex}
                                testString={testString}
                                flags={flags}
                            />
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="xl:col-span-1 space-y-6">
                        <ExplanationAccordion regex={regex} flags={flags} />
                        <QuickReference />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegexTester
