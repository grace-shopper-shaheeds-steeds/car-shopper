const router = require('express').Router()
const productRouter = require('./product')

router.use('/products', productRouter)

module.exports = router