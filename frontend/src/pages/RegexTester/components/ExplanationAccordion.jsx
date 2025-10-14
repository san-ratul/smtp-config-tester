import React, { useState } from 'react'
import { useRegexExplanation } from '../../../hooks/useRegexExplanation'
import { getFlagExplanations } from '../../../utils/regexFlags'
import RegexHeader from './RegexHeader'
import ExplanationList from './ExplanationList'
import FlagsList from './FlagsList'

const ExplanationAccordion = ({ regex, flags }) => {
    const [isOpen, setIsOpen] = useState(true)
    const explanation = useRegexExplanation(regex)
    const flagExplanations = getFlagExplanations(flags)

   return (
       <div className="rounded-lg shadow-2xl border border-white/30 overflow-hidden">
           <RegexHeader regex={regex} flags={flags} />

           <div className="bg-white/20 backdrop-blur-md">
               <button
                   onClick={() => setIsOpen(!isOpen)}
                   className="w-full text-left p-4 bg-white/10 hover:bg-white/20 focus:outline-none transition-colors"
               >
                   <span className="font-medium text-gray-800">Regex Explanation</span>
                   <span className="float-right transition-transform duration-200 text-gray-800">
                       {isOpen ? '−' : '+'}
                   </span>
               </button>

               <div
                   className={`overflow-hidden transition-all duration-300 ease-in-out ${
                       isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                   }`}
               >
                   <div className="p-4 bg-white/10 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                       {explanation.length > 0 ? (
                           <div className="space-y-4">
                               <ExplanationList explanations={explanation} />
                               <FlagsList flags={flagExplanations} />
                           </div>
                       ) : (
                           <p className="text-gray-600 italic">Enter a regex pattern to see its explanation.</p>
                       )}
                   </div>
               </div>
           </div>
       </div>
   )
}

export default ExplanationAccordion
