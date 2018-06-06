const express = require('express');
const router = express.Router()
const Order = require('../db/models/order')
const OrderItem = require('../db/models/orderItem')
module.exports = router

router.param('id', (req, res, next, id) => {
    Order.findById(id)
      .then(item => {
        if (!item) res.sendStatus(404);
        else if (item.user.id != req.user.id) {
          res.send(403, "Not your record buddy")
        }
        // if no item found, send 404
        else {
          req.item = item;
          // we have to call next here so that the actual route we want to hit will match after the router.param
          next();
        }
      })
      .catch(next);
  });

  // retrieve all orders
router.get('/', (req, res, next ) => {
    Order.findAll()
      .then(results => {
        res.send(results);
      })
      .catch(next);
  });

// post a new order to product
router.post('/', (req, res, next ) => {
    Order.create(req.body)
      .then(product => {
        res.send(product);
      })
      .catch(next);
  });

// get order by id
router.get('/:id', (req, res, next) => {
    // router.param has now taken care of this!!
    res.send(req.item);
  });

// update a particular order
router.put('/:id', async (req, res, next) => {
  const order = Order.findById(req.params.id);
  if (!order.userId != req.user.id) {
    res.send(403, "Not your order, buddy");
  }
  else {
    // we already got a order from the db with router.param
  // REVIEW: can I change somebody elses' order?
    req.item.update(req.body)
    .then(updatedOrder => {
        res.send(updatedOrder);
    })
    .catch(next);
  }
});


// delete a new order
router.delete('/:id', (req, res, next) => {
    req.item.destroy()
    .then(item => {
    res.sendStatus(202);
    })
    .catch(next);
});


