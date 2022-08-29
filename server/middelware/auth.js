const {decodeData} = require('../helpers/jwt')
const {User} = require('../models')

const authentication = (req, res, next)=>{
    try {
        const {access_token} = req.headers
        if(!access_token){
            throw {name : 'Token required'}
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
        next(error)
    }
}

const authorizationAdmin = (req, res, next) => {
    try {
        const role = req.userData.role

        if(role === 'admin'){
            next()
        }else{
            throw {name : 'Forbidden'} 
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {authentication, authorizationAdmin}