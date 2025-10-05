import { useState, useEffect } from 'react'
import SmtpForm from './SmtpForm'
import ResponseSection from './ResponseSection'

function App() {
  const [config, setConfig] = useState({
    host: '',
    port: '',
    user: '',
    pass: '',
    from: '',
    to: '',
    message: '',
    encryption: 'TLS'
  })
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('smtpConfig')
    if (saved) {
      setConfig(JSON.parse(saved))
    }
  }, [])

  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value })
  }

  const handleClearConfig = () => {
    localStorage.removeItem('smtpConfig')
    setConfig({ host: '', port: '', user: '', pass: '', from: '', to: '', message: '', encryption: 'TLS' })
    setMessage('')
    setIsSuccess(false)
  }

  const handleClearForm = () => {
    setConfig({ host: '', port: '', user: '', pass: '', from: '', to: '', message: '', encryption: 'TLS' })
    localStorage.removeItem('smtpConfig')
    setMessage('')
    setIsSuccess(false)
  }

  const isFormEmpty = !config.host && !config.port && !config.user && !config.pass && !config.from && !config.to && !config.message

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    localStorage.setItem('smtpConfig', JSON.stringify(config))
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/test-smtp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      })
      const result = await response.json()
      if (result.success) {
        setMessage('SMTP test successful!')
        setIsSuccess(true)
      } else {
        setMessage('SMTP test failed: ' + result.error)
        setIsSuccess(false)
      }
    } catch (error) {
      setMessage('Error: ' + error.message)
      setIsSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-blue-200 to-indigo-400 flex items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-md rounded-lg shadow-2xl p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 border border-white/30">
        <SmtpForm
          config={config}
          setConfig={setConfig}
          loading={loading}
          handleSubmit={handleSubmit}
          handleClearForm={handleClearForm}
          isFormEmpty={isFormEmpty}
        />
        <ResponseSection
          message={message}
          isSuccess={isSuccess}
          onClearConfig={handleClearConfig}
        />
      </div>
    </div>
  )
}

export default App