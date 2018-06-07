const router = require('express').Router()
const productRouter = require('./product')
const orderRouter = require('./order')
const orderItemRouter = require('./orderitem')

router.use('/products', productRouter)
router.use('/orders', orderRouter)
router.use('/orderitems', orderItemRouter)


module.exports = router