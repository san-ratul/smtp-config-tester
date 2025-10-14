import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-md shadow-2xl border-b border-white/30">
            <nav className="flex justify-between items-center max-w-7xl mx-auto p-4">
                <div className="text-gray-800 font-bold text-xl">SMTP Tester</div>
                <ul className="flex space-x-4">
                    <li><Link to="/" className="text-gray-800 hover:text-gray-600">Mail Tester</Link></li>
                    <li><Link to="/regex-tester" className="text-gray-800 hover:text-gray-600">Regex Tester</Link></li>
                </ul>
            </nav>
        </div>

    )
}

export default Navigation