const router = require('express').Router()
const ControllerMovie = require('../controllers/controllerMovie')
const {authentication, authorizationAdmin} = require('../middelware/auth')

router.use(authentication)
router.get('/', ControllerMovie.readMovie)
router.post('/add', authorizationAdmin, ControllerMovie.addMovie)
router.get('/:id', ControllerMovie.readMovieById)
router.put('/:id', authorizationAdmin, ControllerMovie.editMovie)
router.delete('/:id', authorizationAdmin, ControllerMovie.deleteMovie)

module.exports = router