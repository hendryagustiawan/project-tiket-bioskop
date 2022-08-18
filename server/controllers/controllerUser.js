const {User} = require('../models')
const {checkPassword} = require('../helpers/bcrypt')
const {encodeData} = require('../helpers/jwt')

class ControllerUser{
    // read All User
    static async readAll(req, res){
        try {
            const user = await User.findAll()
            if(user.length === 0){
                throw {name : 'notFound'}
            }else{
                res.status(200).json(user)
            }
        } catch (error) {
            if(error.name === 'notFound'){
                res.status(404).json({message : 'Data Not Found'})
            }else{
                res.status(500).json(error)
            }
        }
    }

    // read by id
    static async readUserById(req, res){
        const {id} = req.params

        try {
            const data = await User.findByPk(id)

            if(!data){
                throw {name : 'notFound'}
            }else{
                res.status(200).json(data)
            }
        } catch (error) {
            if(error.name === 'notFound'){
                res.status(404).json({message : 'Data Not Found'})
            }else{
                res.status(500).json(error)
            }
        }
    }

    // Add User or Registrasi
    static async addUser(req, res){
        const {username, password, email, role, phoneNumber} = req.body
        
        try {
            const newData = await User.create({username, password, email, role, phoneNumber})

            res.status(200).json(newData)
        } catch (error) {
            if(error.name === 'SequelizeValidationError'){
                const errMessage = error.errors.map(el => {
                    return el.message
                })
                res.status(400).json({message : errMessage})
            }else{
                res.status(500).json(error)
            }
        }
    }

    // user login
    static async login(req, res){
        const {email, password} = req.body
        
        // cek inputan ada/tidak
        if(!email || !password){ // jika inputan kosong
            res.status(400).json({message : 'Email and Password is required'})
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
                if(error.name === 'invalidUser'){
                    res.status(400).json({message : 'Bad Request'})
                }else{
                    res.status(500).json(error)
                }
            }
        }
    }

    // edit user
    static async editUser(req, res){
        const {id} = req.params
        const {username, password, email, role, phoneNumber} = req.body
        
        try {
            const dataEdit = await User.update({username, password, email, role, phoneNumber}, {where : {id}, individualHooks: true, returning : true})
            if(dataEdit[0] === 0){
                throw {name : 'notFound'}
            }
            res.status(200).json(dataEdit)
        } catch (error) {
            if(error.name === 'SequelizeValidationError'){
                let errMessage = error.errors.map(el=>{
                    return el.message
                })
                res.status(400).json(errMessage)
            } else if(error.name === 'notFound'){
                res.status(404).json({message : 'Data Not Found'})
            }
            else{
                res.status(500).json(error)
            }
        }
    }

    // delete user
    static async deleteUser(req, res){
        const {id} = req.params

        try {
            const data = await User.destroy({where : {id}})

            if(!data){
                throw {name : 'notFound'}
            }else{
                res.status(200).json({message : 'Success to delete data user'})
            }
        } catch (error) {
            if(error.name === 'notFound'){
                res.status(404).json({message : 'Data Not Found'})
            }else{
                res.status(500).json(error)
            }
        }
    }

}

module.exports = ControllerUser