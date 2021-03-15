const express = require('express')
const router = express.Router()
const fs = require('../index')
//fs.fs

router.get('/:id', (req, res) => {
    const user = req.userData

    if(req.params.id) {
        getInfo()
        console.log('get-edit-info got called')
        async function getInfo() {
            try {
                const info = await fs.fs.collection('user-info').doc(req.params.id).get()
               if(info.data()) {
                   const datum = prepareData(info.data())
                   if(datum) {
                       res.status(200).json(datum)
                   } else {
                       res.status(401).json({message: 'UnAuthorized Request'})
                   }
               } else {
                   res.status(404).json({message: 'Not Found'})
               }
            } catch(error) {
                // console.log(error)
                res.status(500).json({message: 'Server Error'})
            }

        }
    } else {
        res.status(400).json({message: 'No Request ID was Provided'})
    }


    function prepareData(info) {
        if(user.uid === req.params.id) {
            return info
        } else if (user.uid !== req.params.id && user.role === 'admin') {
            info.password = 'U787$jw%wki_uw343dn@eid332#'
            return info
        } else {
            return null
        }
    }




})

module.exports = router;