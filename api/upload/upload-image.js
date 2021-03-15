const express = require('express')
const router = express.Router()
const Multer = require('multer')
const { v4:uuidv4 } = require('uuid')
// storage.bucket

const upload = require('./upload')
const getUrl = require('./get-url')
const deleteFile = require('./delete-file')

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
})

router.post('/', multer.single('profile-image'),(req, res) => {

    
    if(req.file) {
        uploadImage()
    } else {
        return res.status(400).json({message: 'no file was provided'})
    }



    async function uploadImage() {
        const fileName = `profile-image/${uuidv4()}|${Date.now()}`
        if(req.body.filePath !== 'null') {
            // delete previous image and then upload new image
            // console.log('file path exists')
            // console.log(req.body.filePath);
            try {
                await deleteFile.deleteFile(req.body.filePath)
                await upload.upload(req.file, fileName)
                const url = await getUrl.getUrl(fileName)
                // let url = await Promise.all([deleteFile.deleteFile(req.body.filePath), upload.upload(req.file, fileName), getUrl.getUrl(fileName)])
                // url = url[2]
                // console.log('done')
                res.status(200).json({url, filePath: fileName})
            } catch(error) {
                console.log(error)
                res.status(500).json({message: 'Server Error'})
            }
        } else {
            // no previous file. upload new image
            console.log('file path doesnt exist')
            try {
                await upload.upload(req.file, fileName)
                const url = await getUrl.getUrl(fileName)
                // let url = await Promise.all([upload.upload(req.file, fileName), getUrl.getUrl(fileName)])
                // url = url[1]
                // console.log('done')
                res.status(200).json({url, filePath: fileName})
            } catch(error) {
                console.log(error)
                res.status(500).json({message: 'Server Error'})
            }

        }
    }
})

module.exports = router



// const file = storage.bucket.file('pictures/custom pipe.png')
// file.getSignedUrl({action:'read', expires: '03-09-2491'}).then(s => {
//     console.log(s[0])
//  //    console.log(s)
// }).catch(error => {
//     console.log(error)
// })