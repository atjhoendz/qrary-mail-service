const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const sendResponse = require('./formatResponse')
const sendMail = require('./sendmail.service')
require('dotenv').config()

const app = express()
const router = express.Router()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

router.get('/', (req, res) => {
  sendResponse(res, true, 200, {}, 'Qrary mail service is running', true)
})
router.post('/email', sendMail)

app.use('/api/v1/', router)

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${process.env.PORT}`)
})