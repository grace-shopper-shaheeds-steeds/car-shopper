const express = require('express');
const router = express.Router()
const OrderItem = require('../../db/models/orderItem')
module.exports = router

router.param('id', (req, res, next, id) => {
  OrderItem.findById(id)
      .then(item => {
        // if no item found, send 404
        if (!item) res.sendStatus(404);
        else {
          req.item = item;
          // we have to call next here so that the actual route we want to hit will match after the router.param
          next();
        }
      })
      .catch(next);
  });

// update a particular orderItem
router.put('/:id', (req, res, next) => {
    // we already got a order from the db with router.param
    req.item.update(req.body)
    .then(updatedOrderItem => {
        res.send(updatedOrderItem);
    })
    .catch(next);
});
  
// delete a new order... we won't actually delete the order
// we'll just update the status to 'cancelled' for deleted order
router.delete('/:id', (req, res, next) => {
    req.item.update({ status: 'cancelled' })
    .then(item => {
      res.send(item);
    })
    .catch(next);
});

    
