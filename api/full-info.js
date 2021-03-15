const express = require('express')
const router = express.Router()
const fs = require('../index')
//fs.fs

router.get('/:id', (req, res) => {
    const user = req.userData

    if(req.params.id) {
        getData()
        async function getData() {
            try {
                const info = await fs.fs.collection('user-info').doc(req.params.id).get()
                // console.log(info.data())
                if(info.data()) {
                    res.status(200).json(prepareData(info.data()))
                } else {
                    res.status(404).json({message: 'Not Found'})
                }
            } catch(error) {
                console.log(error)
                res.status(500).json({message: 'Server Error'})
            }

        }
    } else {
        res.status(400).json({message: 'No Data ID was provided'})
    }


    function prepareData(info) {
        // if user is data holder it self or is an admin or moderator
        if(user.role === 'admin' || user.role === 'moderator' || user.uid === req.params.id) {
            delete info.password
            return info
        } else {
            // if user is a general user and not data holder

            // ['username', 'password', 'primaryEmail', 'primaryPhone'].forEach(item1 => delete info[item1])
            // ['road', 'postal', 'postCode', 'village'].forEach(item3 => delete info.address[item3])
            // ['email', 'phone'].forEach(item2 => delete info.contacts[item2])

           
            delete info.username
            delete info.password
            delete info.contacts.email
            delete info.contacts.phone
            delete info.primaryEmail
            delete info.primaryPhone
            delete info.address.postCode
            delete info.address.road
            delete info.address.postal
            delete info.address.village
            return info
        }
    }



})


module.exports = router;