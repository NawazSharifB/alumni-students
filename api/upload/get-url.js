const storage = require('../../index')

function getUrl(filePath) {
    return new Promise((resolve, reject) => {
        const file = storage.bucket.file(filePath)
        file.getSignedUrl({action:'read', expires: '03-09-2491'}).then(s => {
            // console.log('got url')
            resolve(s[0])
        }).catch(error => {
            console.log('from get url', error)
            reject('failed to get url')
        })
    })
    
}

module.exports.getUrl = getUrl