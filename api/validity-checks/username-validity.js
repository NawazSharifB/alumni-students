const express = require('express')
const router = express.Router()
const fs = require('../../index')
// fs.fs

router.get('/:username', (req, res) => {
    const username = req.params.username

    if (username) {
        const arr = []
        fs.fs.collection('user-info').where('username', '==', username).get()
            .then( items => {
                items.forEach(item => arr.push(item.data()))
                res.status(200).json({items: arr.length})

            }).catch(error => {
                console.log(error)
                res.status(500).json({message: 'Server Error'})
            })
    } else {
        res.status(400).json({message: 'No Username was provided'})
    }
})

module.exports = router