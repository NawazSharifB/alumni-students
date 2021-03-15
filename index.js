const express = require('express')
const cors = require('cors')
const path = require('path')

const admin = require('firebase-admin')
// const fsConfig = require('./api_key.json')
const {Storage} = require('@google-cloud/storage')

const register = require('./api/register')
const login = require('./api/login')
const infoList = require('./api/info-list')
const fullInfo = require('./api/full-info')
const getEditInfo = require('./api/get-edit-info')
const editInfo = require('./api/edit-info')
const deleteInfo = require('./api/delete-info')
const uploadImage = require('./api/upload/upload-image')
const middleware = require('./utilities/verify-token')
const usernameValidity = require('./api/validity-checks/username-validity')
const primaryEmailValidity = require('./api/validity-checks/primary-email-validity')
const primaryPhoneValidity = require('./api/validity-checks/primary-phone-validity')

admin.initializeApp({
  // credential: admin.credential.cert(fsConfig)
  credential: admin.credential.cert(JSON.parse(process.env.API_KEY))
})
const fs = admin.firestore()
// fs.fs

const storage = new Storage({
  // keyFilename: './api_key.json'
  // credentials: fsConfig
  credentials: JSON.parse(process.env.API_KEY)
});
const bucket = storage.bucket(process.env.STORAGE_APP_NAME)
//bucket

const app = express()
app.use(cors())
app.use(express.json())


const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/dist/pizza-shop'))


app.use('/server/register', register)
app.use('/server/login', login)
app.use('/server/info-list', infoList)
app.use('/server/full-info', middleware.verifyToken, fullInfo)
app.use('/server/get-edit-info', middleware.verifyToken, getEditInfo)
app.use('/server/edit-info', middleware.verifyToken, editInfo)
app.use('/server/delete-info', middleware.verifyToken, deleteInfo)
app.use('/server/upload-image', uploadImage)
app.use('/server/username-validity', usernameValidity)
app.use('/server/primary-email-validity', primaryEmailValidity)
app.use('/server/primary-phone-validity', primaryPhoneValidity)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/pizza-shop/index.html'))
})



app.listen(port, () => {
  console.log('server is running on port', port)
})

module.exports.fs = fs
module.exports.bucket = bucket