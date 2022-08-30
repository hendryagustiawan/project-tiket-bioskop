const {User} = require('../models')
const {checkPassword} = require('../helpers/bcrypt')
const {encodeData} = require('../helpers/jwt')

class ControllerUser{
    // read All User
    static async readAll(req, res, next){
        try {
            const user = await User.findAll()
            if(user.length === 0){
                throw {name : 'notFound'}
            }else{
                res.status(200).json(user)
            }
        } catch (error) {
            next(error)
        }
    }

    // get one user by UserId
    static async getOneUser(req, res, next){
        const id = req.userData.id

        try {
            const data = await User.findByPk(id)

            if(!data){
                throw {name : 'notFound'}
            }else{
                res.status(200).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    // read by id
    static async readUserById(req, res, next){
        const {id} = req.params

        try {
            const data = await User.findByPk(id)

            if(!data){
                throw {name : 'notFound'}
            }else{
                res.status(200).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    // Add User or Registrasi
    static async addUser(req, res, next){
        const {username, password, email, phoneNumber} = req.body

        const  checkEmail = await User.findOne({where : {email}})

        if(checkEmail){
            next({name : "Email already"})
        }else{
            try {
                const newData = await User.create({username, password, email, role : 'admin', phoneNumber})
    
                res.status(200).json({id : newData.id, username : newData.username, email : newData.email, role : newData.role, phoneNumber : newData.phoneNumber})
            } catch (error) {
                next(error)
            }
        }
        
    }

    // user login
    static async login(req, res, next){
        const {email, password} = req.body
        
        // cek inputan ada/tidak
        if(!email){ // jika inputan kosong
            next({name : 'emailRequired'})
        }else if(!password){
            next({name : 'passwordRequired'})
        }else{
            try {
                const user = await User.findOne({where : {email}})
                const check = checkPassword (password, user.password)

                if(user && check){ // untuk mendapatkan access_token setelah login
                    const access_token = encodeData({
                        id : user.id,
                        email : user.email,
                        role : user.role
                    })
                    res.status(200).json({access_token})
                }else{ // jika terjadi kesalahan inputan dari user
                    throw {name : 'invalidUser'}
                }
            } catch (error) {
                next(error)
            }
        }
    }

    // edit user
    static async editUser(req, res, next){
        const {id} = req.params
        const {username, password, email, role, phoneNumber} = req.body
        
        try {
            const dataEdit = await User.update({username, password, email, role, phoneNumber}, {where : {id}, individualHooks: true, returning : true})
            if(dataEdit[0] === 0){
                throw {name : 'notFound'}
            }
            res.status(200).json(dataEdit)
        } catch (error) {
            next(error)
        }
    }

    // delete user
    static async deleteUser(req, res, next){
        const {id} = req.params

        try {
            const data = await User.destroy({where : {id}})

            if(!data){
                throw {name : 'notFound'}
            }else{
                res.status(200).json({message : 'Success to delete data user'})
            }
        } catch (error) {
            next(error)
        }
    }

}

module.exports = ControllerUser