const router = require('express').Router()
const ControllerUser = require('../controllers/controllerUser')
const {authentication} = require('../middelware/auth')


router.post('/add', ControllerUser.addUser)
router.post('/login', ControllerUser.login)
router.use(authentication)
router.get('/', ControllerUser.readAll)
router.get('/:id', ControllerUser.readUserById)
router.put('/edit/:id', ControllerUser.editUser)
router.delete('/delete/:id', ControllerUser.deleteUser)



module.exports = router