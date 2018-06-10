const router = require('express').Router()
const productRouter = require('./product')
const categoryRouter = require('./category')
const orderRouter = require('./order')
const userRouter = require('./users')

router.use('/products', productRouter)
router.use('/category', categoryRouter)
router.use('/orders', orderRouter)
router.use('/user', userRouter)
router.use('/', (req, res, next) =>{
    console.log('req.path: ', req.path)
})


module.exports = router