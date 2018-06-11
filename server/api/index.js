const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

async function adminGateway(req, res, next){
  if(req.user && await User.isAdmin(req.user.id)){
    next()
  } else {
    res.status(403).send('Unauthorized')
  }

}

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/reviews', require('./reviews'))
router.use('/orders', require('./order'))
router.use('/orderitems', require('./orderItem'))
router.use('/admin', adminGateway, require('./admin'))
router.use('/addresses', require('./address'))
router.use('/categories', require('./category'))
router.use('/cart', require('./cart'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
