const storage = require('../../index')

function deleteFile(filePath) {
    // console.log(filePath)
    return new Promise((resolve, reject) => {
        storage.bucket.file(filePath).delete()
            .then(data => {
                // console.log('deleted')
                resolve('done')
            }).catch(error => {
                if(error.code === 404) {
                    resolve('done')
                } else {
                    console.log('from error', error)
                    reject('failed to delete')
                }
            })
    })

}

module.exports.deleteFile = deleteFile