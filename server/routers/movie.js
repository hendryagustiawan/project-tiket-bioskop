const router = require('express').Router()
const ControllerMovie = require('../controllers/controllerMovie')

router.post('/add', ControllerMovie.addMovie)
router.get('/', ControllerMovie.readMovie)
router.get('/:id', ControllerMovie.readMovieById)
router.put('/edit/:id', ControllerMovie.editMovie)
router.delete('/delete/:id', ControllerMovie.deleteMovie)

module.exports = router