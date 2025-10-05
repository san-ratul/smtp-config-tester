function SmtpForm({ config, setConfig, loading, handleSubmit, handleClearForm, isFormEmpty }) {
  const handleChange = (e) => {
    setConfig(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">SMTP Tester</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="host"
            value={config.host}
            onChange={handleChange}
            placeholder="SMTP Host *"
            required
            className="w-full px-4 py-3 border border-white/30 bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 placeholder-gray-500"
          />
          <input
            name="port"
            value={config.port}
            onChange={handleChange}
            placeholder="Port *"
            required
            className="w-full px-4 py-3 border border-white/30 bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 placeholder-gray-500"
          />
        </div>
        <select
          name="encryption"
          value={config.encryption}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 bg-white/20 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
        >
          <option value="SSL">SSL</option>
          <option value="TLS">TLS</option>
          <option value="none">None</option>
        </select>
        <input
          name="user"
          value={config.user}
          onChange={handleChange}
          placeholder="Username *"
          required
          className="w-full px-4 py-3 border border-white/30 bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 placeholder-gray-500"
        />
        <input
          name="pass"
          type="password"
          value={config.pass}
          onChange={handleChange}
          placeholder="Password *"
          required
          className="w-full px-4 py-3 border border-white/30 bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 placeholder-gray-500"
        />
        <input
          name="from"
          type="email"
          value={config.from}
          onChange={handleChange}
          placeholder="From Email *"
          required
          className="w-full px-4 py-3 border border-white/30 bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 placeholder-gray-500"
        />
        <input
          name="to"
          type="email"
          value={config.to}
          onChange={handleChange}
          placeholder="To Email *"
          required
          className="w-full px-4 py-3 border border-white/30 bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 placeholder-gray-500"
        />
        <textarea
          name="message"
          value={config.message}
          onChange={handleChange}
          placeholder="Email Message"
          rows="4"
          className="w-full px-4 py-3 border border-white/30 bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 placeholder-gray-500"
        />
        <div className="grid grid-cols-2 gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed transition duration-300 font-semibold"
          >
            {loading ? 'Testing...' : 'Test SMTP'}
          </button>
          <button
            type="button"
            onClick={handleClearForm}
            disabled={isFormEmpty}
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 font-semibold"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  )
}

export default SmtpForm