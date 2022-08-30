const router = require('express').Router()
const ControllerUser = require('../controllers/controllerUser')
const {authentication} = require('../middelware/auth')


router.post('/add', ControllerUser.addUser)
router.post('/login', ControllerUser.login)
router.post('google-login', ControllerUser.googleLogin)
router.use(authentication)
router.get('/', ControllerUser.readAll)
router.get('/one-user', ControllerUser.getOneUser)
router.get('/:id', ControllerUser.readUserById)
router.put('/:id', ControllerUser.editUser)
router.delete('/:id', ControllerUser.deleteUser)



module.exports = router