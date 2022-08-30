const router = require('express').Router()
const routerUser = require('./user')
const routerMovie = require('./movie')
const routerNews = require('./news')
const routerPromotion = require('./promotion')

router.use('/user', routerUser)
router.use('/movie', routerMovie)
router.use('/news', routerNews)
router.use('/promotion', routerPromotion)

module.exports = router