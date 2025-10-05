# SMTP Tester

A modern web application for testing SMTP configurations. This tool allows you to verify your email server settings by sending test emails through a clean, intuitive interface.

## Features

- **SMTP Configuration Testing**: Input your SMTP server details and test connectivity
- **Secure Input Handling**: Password fields and secure data handling
- **Local Storage**: Saves your configuration locally in the browser for convenience
- **Real-time Feedback**: Immediate success/error responses with detailed error messages
- **Encryption Support**: Supports SSL, TLS, and no encryption options
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Privacy Focused**: No data is stored on servers; everything stays in your browser

## Prerequisites

- Node.js (version 14 or higher) - [Download from nodejs.org](https://nodejs.org)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd smtp-tester
   ```

2. **Set up the backend:**

   ```bash
   cd backend
   npm install
   npm start
   ```

   The backend will start on `http://localhost:3001`

3. **Set up the frontend:**

   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Edit .env to set VITE_API_URL=http://localhost:3001
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

4. **Open your browser** and navigate to `http://localhost:5173`

## Usage

1. Fill in your SMTP configuration details:
   - **SMTP Host**: Your email server hostname (e.g., smtp.gmail.com)
   - **Port**: SMTP port (usually 587 for TLS, 465 for SSL)
   - **Encryption**: Choose SSL, TLS, or None
   - **Username**: Your email username
   - **Password**: Your email password or app password
   - **From Email**: Sender email address
   - **To Email**: Recipient email address
   - **Message**: Optional custom message for the test email

2. Click **"Test SMTP"** to send a test email

3. View the response in the right panel - success or error messages will be displayed

4. Use **"Clear Form"** to reset all fields and local storage

## API

### POST /test-smtp

Tests the SMTP configuration by attempting to send an email.

**Request Body:**

```json
{
  "host": "smtp.example.com",
  "port": 587,
  "encryption": "TLS",
  "user": "username",
  "pass": "password",
  "from": "sender@example.com",
  "to": "recipient@example.com",
  "message": "Optional test message"
}
```

**Response:**

```json
{
  "success": true
}
```

or

```json
{
  "success": false,
  "error": "Error message"
}
```

## Technologies Used

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, Nodemailer
- **Styling**: Tailwind CSS with custom glassmorphism effects

## Development

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts

- `npm start` - Start the server

## Security Note

This application is designed for testing purposes only. Be cautious when entering sensitive information like passwords. The app stores configuration data locally in your browser's localStorage and does not transmit it to any external servers except for the SMTP test request to your configured backend.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
