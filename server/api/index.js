const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

async function adminGateway(req, res, next){
  console.log('req.user.id: ', req.user.id)
  console.log('User.isAdmin: ', await User.isAdmin(req.user.id))
  if(await User.isAdmin(req.user.id)){
    next()
  } else {
    res.status(403).send('Unauthorized')
  }

}

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/admin', adminGateway, require('./admin'))

//router.use('/categories', require('./category'))

router.use('/cart', require('./cart'))

router.use('/orders', require('./order'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
