const express = require('express');
const router = express.Router()
const Order = require('../../db/models/order')
module.exports = router

router.param('id', (req, res, next, id) => {
    Order.findById(id)
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
 
// update a particular order
router.put('/:id', (req, res, next) => {
    // we already got a order from the db with router.param
    req.item.update(req.body)
    .then(updatedOrder => {
        res.send(updatedOrder);
    })
    .catch(next);
});
  
// delete a new order... we won't actually delete the order
// we'll just update the status to 'X' for deleted order
router.delete('/:id', (req, res, next) => {
    req.item.update({ status: 'cancelled' })
    .then(item => {
      res.send(item);
      // res.sendStatus(202);
    })
    .catch(next);
});

    
