const jwt = require('jsonwebtoken')

const encodeData = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET)
}

const decodeData = (token) =>{
    return jwt.verify(token, process.env.JWT_SECRET)
}


module.exports = {encodeData, decodeData}