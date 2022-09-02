const {User} = require('../models')
const {checkPassword} = require('../helpers/bcrypt')
const {encodeData} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

class ControllerUser{
    // read All User
    static async readAll(req, res, next){
        try {
            const user = await User.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
            })
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
            const data = await User.findOne({
                attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
            }, {where : {id}})

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
            const data = await User.findOne({
                attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
            }, {where : {id}})

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
        if(!password && !email){
            next({name : 'password and email required'})
        }else if(!email){ // jika inputan kosong
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

    // login with googel
    static async googleLogin (req, res, next){
        const {token} = req.body
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let payload

        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
        .then(tiket => {
            payload = tiket.getPayload() // berisi data yang ada di akun googel kita pas login
            
            // cek data user apakah ada di database
            return User.findOne({
                where: {email : payload.email}
            })
        })
        .then(user => {
            // jika tidak ada di database maka kita akan buatkan, kemudian buatkan access_token
            if(!user){
                return User.create({ // punya akun googel tapi tidak punya data di database maka secara default kita akan buatkan data di databse seperti data berikut
                    username : payload.name,
                    email : payload.email,
                    password : 'qwerty',
                    role : 'staff',
                    phoneNumber : '62123456789' 
                }, {hooks : false})
            }else{
                // jika user ditemukan/ada maka kita akan buatkan accsess_token
                return user
            }
        })
        .then(data => {
            // buatkan access_token
            const access_token = encodeData({
                id : data.id,
                email: data.email,
                role : data.role
            })
            res.status(200).json({access_token})
        })
        .catch(function(error){
            next(error)
        })
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
            res.status(200).json({
               id : dataEdit[1][0].id,
               email : dataEdit[1][0].email,
               phoneNumber : dataEdit[1][0].phoneNumber
            })
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