const express = require('express')
const router = express.Router()
const fs = require('../index')
//fs.fs

router.put('/', (req, res) => {
    const user = req.userData

    if(req.body) {
        updateData()
        async function updateData() {
            try {
                const a = await fs.fs.collection('user-info').doc(req.body.uid).update(prepareData(req.body))
                res.status(200).json({message: 'Successful', uid: req.body.uid})
            } catch(error) {
                // console.log(14, error)
                res.status(500).json({message: 'Server Error'})
            }
        }
    } else {
        res.status(400).json({message: 'No Request Body Was Provided'})
    }

    function prepareData(data) {
        if (user.uid !== data.uid) {
            delete data.password
            return data
        }
        return data
    }
})

module.exports = router;