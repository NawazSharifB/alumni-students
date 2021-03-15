const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const fs = require('../index')
//fs.fs

router.post('/', (req, res) => {
    if(req.body) {
        const user = req.body
        user.uid = fs.fs.collection('user-info').doc().id
        user.role = 'user'

        // const serectKey = process.env.SECRET_KEY
        const serectKey = 'av1235454312xz'


        saveUserInfo()

        async function saveUserInfo() {
            try {
                await fs.fs.collection('user-info').doc(user.uid).set(user)
                const token = jwt.sign({data: {
                    name: user.firstName,
                    role: 'user',
                    email: user.contacts.publishedEmail[0],
                    uid: user.uid
                }}, serectKey)

                res.status(200).json({token})
            } catch(error) {
                // console.log(error)
                // send error
                res.status(200).json({message: "Server Error"})
            }
        }
    } else {
        res.status(500).json({message: 'No Request Body was Provided'})
    }
    // res.status(200).json({message: 'Successful'})
})

module.exports = router;