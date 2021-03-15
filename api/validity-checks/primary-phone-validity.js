const express = require('express')
const router = express.Router()
const fs = require('../../index')

router.get('/:phone', (req, res) => {
    const phone = req.params.phone

    if(phone) {
        const arr = []
        fs.fs.collection('user-info').where('primaryPhone', '==', +phone).get()
            .then(items => {
                items.forEach(item => arr.push(item.data()))
                res.status(200).json({items: arr.length})
            }).catch(error => {
                console.log(error)
                res.status(500).json({message: 'Server Error'})
            })
    } else {
        res.status(400).json({message: 'No Email was Provided'})
    }
    
})

module.exports = router