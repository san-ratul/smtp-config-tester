import React from 'react'

function ResponseSection({ message, isSuccess, onClearConfig }) {
  return (
    <div className="flex flex-col justify-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 border border-white/20">
        <p className="text-center text-gray-800 font-medium text-base">
          We do not store any user data you enter during testing. The data is kept inside your browser, and you can clear the data by clearing the form.
        </p>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Response</h2>
      <div className={`p-6 rounded-lg border-2 ${message ? (isSuccess ? 'border-green-800 bg-green-100 text-green-800' : 'border-red-800 bg-red-100 text-red-800') : 'border-white/30 bg-white/20 backdrop-blur-sm text-gray-800'}`}>
        <p className="text-center font-medium">
          {message || 'Submit the form to see the response here.'}
        </p>
        {isSuccess && (
          <button
            onClick={onClearConfig}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 font-semibold"
          >
            Clear Config
          </button>
        )}
      </div>
    </div>
  )
}

export default ResponseSection