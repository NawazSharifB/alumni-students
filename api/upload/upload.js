const storage = require('../../index')

function upload(file, fileName) {
    // console.log('from upload', file);

    return new Promise((resolve, reject) => {
        const fileUpload = storage.bucket.file(fileName)
        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        })

        blobStream.on('error', error => {
            console.log('from upload', error)
            reject('Failed to upload file')
        })

        blobStream.on('finish', () => {
            // console.log('uploaded')
            resolve('done')
        })

        blobStream.end(file.buffer)
    })
}

module.exports.upload = upload