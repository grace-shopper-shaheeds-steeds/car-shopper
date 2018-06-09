const router = require('express').Router()
const productRouter = require('./product')
const categoryRouter = require('./category')

router.use('/products', productRouter)
router.use('/category', categoryRouter)
router.use('/', (req, res, next) =>{
    console.log('req.path: ', req.path)
})


module.exports = router