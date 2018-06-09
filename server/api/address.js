const express = require('express');
const router = express.Router()
const Address = require('../db/models/address')

module.exports = router

// for POST, the id is supposed to the userId not the addressId
router.param('id', (req, res, next, id) => {
    Address.findById(id)
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

// retrieve all addresses
router.get('/', (req, res, next ) => {
  Address.findAll()
  .then(results => {
    res.send(results);
  })
  .catch(next);
});

// post a new address
router.post('/', (req, res, next ) => {
  Address.create(req.body)
    .then(address => {
      res.send(address);
    })
    .catch(next);
  });

// get address by id
router.get('/:id', (req, res, next) => {
    // router.param has now taken care of this!!
    res.send(req.item);
  });
  
// update a particular address
router.put('/:id', (req, res, next) => {
    // we already got a address from the db with router.param
    req.item.update(req.body)
    .then(updatedAddress => {
        res.send(updatedAddress);
    })
    .catch(next);
});

// delete a new address
router.delete('/:id', (req, res, next) => {
    req.item.destroy()
    .then(item => {
    res.sendStatus(202);
    })
    .catch(next);
});

    
