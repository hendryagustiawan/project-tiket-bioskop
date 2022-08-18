const {decodeData} = require('../helpers/jwt')
const {User} = require('../models')

const authentication = (req, res, next)=>{
    try {
        const {access_token} = req.headers
        if(!access_token){
            throw{name : 'Token required'}
        }else{
            const decode = decodeData(access_token)
            
            req.userData = decode
            User.findByPk(req.userData.id)
            .then((user)=>{
                if(user){
                    next()
                }
            })
            .catch((err)=>{
                throw err
            })
        }
    } catch (error) {
        if(error.name === "JsonWebTokenError"){
            res.status(400).json({message : 'Invalid Token'})
        }else if(error.name === "Token required"){
            res.status(404).json({message : 'Token is Required'})
        }else{
            res.status(500).json(error)
        }
    }
}

module.exports = {authentication}