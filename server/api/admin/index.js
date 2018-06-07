const router = require('express').Router()
const productRouter = require('./product')
const categoryRouter = require('./category')

router.use('/products', productRouter)
router.use('/category', categoryRouter)


module.exports = router