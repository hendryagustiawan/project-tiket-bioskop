const {Movie} = require('../models')

class ControllerMovie{
    // read movie
    static async readMovie(req, res, next){
        try {
            const data = await Movie.findAll()

            if(data.length === 0){
                throw {name : 'notFound'}
            }else{
                res.status(200).json(data)
            }
        } catch (error) {
            next(error)    
        }
    }

    // read by id
    static async readMovieById(req, res, next){
        const {id} = req.params

        try {
            const data = await Movie.findByPk(id)

            if(!data){
                throw {name : 'notFound'}
            }else{
                res.status(200).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    // add movie
    static async addMovie(req, res, next){
        const {title, imgUrl, genre, producer, director, writer, synopsis, cast, price, duration, ProductionId} = req.body
        const UserId = req.userData.id

        try {
            const newData = await Movie.create({title, imgUrl, genre, producer, director, writer, synopsis, cast, price, duration, UserId, ProductionId})

            res.status(200).json(newData)
        } catch (error) {
            next(error)
        }
    }

    // edit movie
    static async editMovie(req, res, next){
        const {id} = req.params
        
        const {title, imgUrl, genre, producer, director, writer, synopsis, cast, price, duration, UserId, ProductionId} = req.body

        try {
            const dataEdit = await Movie.update({title, imgUrl, genre, producer, director, writer, synopsis, cast, price, duration, UserId, ProductionId}, {where : {id}, individualHooks: true, returning : true})
            if(dataEdit[0] === 0){
                throw {name : 'notFound'}
            }
            res.status(200).json(dataEdit[1][0])
        } catch (error) {
            next(error)
        }
    }

    // delete movie
    static async deleteMovie(req, res, next){
        const {id} = req.params
        
        try {
            const data = await Movie.destroy({where : {id}})

            if(!data){
                throw {name : 'notFound'}
            }else{
                res.status(200).json({message : 'Success to delete data movie'})
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerMovie