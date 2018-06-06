const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/categories', require('./category'))
router.use('/orders', require('./order'))

// /api/orders
// /api/admin/categories
//
//
router.put('/api/orders/:orderId', (req, res, next) => {
  /*

  if req.user.isAdmin
    update
  else req.user === order.user
    update
  else
    :(

  */
})

/*
 * PUT /api/admin/orders/:id
 *  upadate
 *
 * PUT /api/orders/:id
 *  if re.user ==== order.user
 *    update
 */

// assuming app.use(passport())

const adminRouter = require('./api/admin')
function adminGateway (req, res, next) {
  // where isAdmin is a method defined on the User model
  if (req.user && req.user.isAdmin()) {
    next()
  }
  else {
    res.send(403, "Unauthorized");
  }
}
app.use('/api/admin', adminGateway, adminRouter)

function loggedInGateway (req, res, next) {
  if (req.user)) {
    next()
  }
  else {
    res.send(403, "Unauthorized");
  }
}
app.use('/api/user', loggedInGateway, userRouter);

app.user('/api', publicRouter);







router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
