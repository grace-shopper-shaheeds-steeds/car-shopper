const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
console.log('shaheed testing branch')
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
