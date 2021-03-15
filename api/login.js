const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const fs = require('../index')
//fs.fs

router.post('/', (req, res) => {
    if(req.body) {
        const loginInfo = req.body;
        // console.log(loginInfo.username)
        // const serectKey = process.env.SECRET_KEY
        const serectKey = 'av1235454312xz'


        getUser()
        async function getUser() {
            try {
                let infoList = [];
                const dataList = await Promise.all([
                    fs.fs.collection('user-info').where('username', '==', loginInfo.username).get(),
                    fs.fs.collection('user-info').where('primaryPhone', '==', +loginInfo.username).get(),
                    fs.fs.collection('user-info').where('primaryEmail', '==', loginInfo.username).get(),
                ])
                dataList.forEach(dataItemList => {
                    dataItemList.forEach(item => infoList.push(item.data()))
                })
                // console.log(infoList.length)
                const user = infoList[0]

                if (!user) {
                    // console.log('user doesnt exist')
                    res.status(401).json({message: 'username doesnt exist'})
                } else if(user.password !== loginInfo.password) {
                    res.status(401).json({message: 'Password doesnt exist'})
                } else {
                    const data = {
                        name: user.firstName,
                        role: user.role,
                        email: user.contacts.publishedEmail[0],
                        uid: user.uid
                    }
                    // console.log(data);
                    const token = jwt.sign({data: {
                        name: user.firstName,
                        role: user.role,
                        email: user.contacts.publishedEmail[0],
                        uid: user.uid
                    }}, serectKey)
                    
                    res.status(200).json({token})
                }
            } catch(error) {
                // console.log(error)
                res.status(500).json({message: 'Server Error'})
            }
        }

        // res.json({message:'successful'})
        // console.log(info)
    } else {
        res.status(400).json({message: 'No Request Body was Provided'})
    }
})

module.exports = router;