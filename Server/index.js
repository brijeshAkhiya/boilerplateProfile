require('./Connection/connection')
const express = require('express')
const cors = require('cors')
const app = express()
const { appPort } = require('./Config/config')
const auth = require('./Controller/auth')
const userDetails = require('./Controller/userDetails')
const bodyParser = require('body-parser')
app.use(express.urlencoded())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', auth)
app.use('/', userDetails)
app.get('/', (req, res) => {
  // eslint-disable-next-line no-path-concat
  res.sendFile(__dirname + '/index.html')
})
app.listen(process.env.PORT || appPort.port)
