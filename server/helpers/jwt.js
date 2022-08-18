const jwt = require('jsonwebtoken')

const encodeData = (payload) => {
    return jwt.sign(payload, 'sangatrahasiacuy')
}

const decodeData = (token) =>{
    return jwt.verify(token, 'sangatrahasiacuy')
}


module.exports = {encodeData, decodeData}