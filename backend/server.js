const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.post('/test-smtp', async (req, res) => {
  const { host, port, user, pass, from, to, message, encryption } = req.body
  try {
    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port),
      secure: encryption === 'SSL',
      auth: {
        user,
        pass
      }
    })
    await transporter.sendMail({
      from,
      to,
      subject: 'SMTP Test',
      text: message || 'This is a test email from SMTP Tester app.'
    })
    res.json({ success: true })
  } catch (error) {
    res.json({ success: false, error: error.message })
  }
})

app.listen(3001, () => console.log('Server running on port 3001'))