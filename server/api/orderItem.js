
const express = require('express');
const router = express.Router()
const OrderItem = require('../db/models/orderItem')
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

  // retrieve all orders
router.get('/', (req, res, next ) => {
  OrderItem.findAll({
      include: {all: true}
    })
      .then(results => {
        res.send(results);
      })
      .catch(next);
  });

// get orderItem by id
router.get('/:id', (req, res, next) => {
    // router.param has now taken care of this!!
    res.send(req.item);
  });

// post a new orderItem
router.post('/', (req, res, next ) => {
  console.log(req.body)

  OrderItem.create(req.body)
    .then(item => {
      res.send(item);
    })
    .catch(next);
  });


