const router = require('express').Router()
const productRouter = require('./product')
const orderRouter = require('./order')
const orderItemRouter = require('./orderitem')
const categoryRouter = require('./category')

router.use('/products', productRouter)
router.use('/orders', orderRouter)
router.use('/orderitems', orderItemRouter)
router.use('/category', categoryRouter)

module.exports = router