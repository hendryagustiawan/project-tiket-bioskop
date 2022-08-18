const router = require('express').Router()
const routerUser = require('./user')
const routerMovie = require('./movie')

router.use('/user', routerUser)
router.use('/movie', routerMovie)


module.exports = router