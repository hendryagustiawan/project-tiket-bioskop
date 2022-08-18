const {Movie} = require('../models')

class ControllerMovie{
    // read movie
    static async readMovie(req, res){
        try {
            const data = await Movie.findAll()

            if(data.length === 0){
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

    // read by id
    static async readMovieById(req, res){
        const {id} = req.params

        try {
            const data = await Movie.findByPk(id)

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

    // add movie
    static async addMovie(req, res){
        const {title, imgUrl, genre, producer, director, writer, synopsis, cast, price, duration, UserId, ProductionId} = req.body

        try {
            const newData = await Movie.create({title, imgUrl, genre, producer, director, writer, synopsis, cast, price, duration, UserId, ProductionId})

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

    // edit movie
    static async editMovie(req, res){
        const {id} = req.params
        
        const {title, imgUrl, genre, producer, director, writer, synopsis, cast, price, duration, UserId, ProductionId} = req.body

        try {
            const dataEdit = await Movie.update({title, imgUrl, genre, producer, director, writer, synopsis, cast, price, duration, UserId, ProductionId}, {where : {id}, individualHooks: true, returning : true})
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

    // delete movie
    static async deleteMovie(req, res){
        const {id} = req.params
        console.log(id);

        try {
            const data = await Movie.destroy({where : {id}})

            if(!data){
                throw {name : 'notFound'}
            }else{
                res.status(200).json({message : 'Success to delete data movie'})
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

module.exports = ControllerMovie