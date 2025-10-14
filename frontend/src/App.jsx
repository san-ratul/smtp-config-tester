import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import RegexTester from './pages/RegexTester/RegexTester'
import Navigation from './components/Navigation'

function App() {
    return (
        <div className="pt-20 min-h-screen bg-gradient-to-br from-purple-300 via-blue-200 to-indigo-400">
            <Router>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/regex-tester" element={<RegexTester/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App