const jwt = require('jsonwebtoken')

// const serectKey = process.env.SECRET_KEY
const serectKey = 'av1235454312xz'

function verifyToken(req, res, next) {
    // console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1]

    if(token == 'null') {
        console.log('token doesnt exist')
        return res.status(400).json({message: 'Verification Token Doesnt exist'})
    }

    const payload = jwt.verify(token, serectKey)

    if(!payload) {
        return res.status(401).json({message: "Unauthorized Request"})
    } else {
        req.userData = payload.data;
        next()
    }
}

module.exports.verifyToken = verifyToken