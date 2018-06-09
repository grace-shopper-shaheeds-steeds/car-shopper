const express = require('express');
const router = express.Router()
const Category = require('../../db/models/category')
module.exports = router

router.param('id', (req, res, next, id) => {
    Category.findById(id)
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

// post a new category to product
router.post('/', (req, res, next ) => {
  console.log('req.body in category post route: ', req.body)
    Category.create(req.body)
      .then(product => {
        res.send(product);
      })
      .catch(next);
  });

// get category by id
router.get('/:id', (req, res, next) => {
    // router.param has now taken care of this!!
    res.send(req.item);
  });

// update a particular category
router.put('/:id', (req, res, next) => {
    // we already got a category from the db with router.param
    req.item.update(req.body)
    .then(updatedCategory => {
        res.send(updatedCategory);
    })
    .catch(next);
});


// post a new category to product
router.delete('/:id', (req, res, next) => {
    req.item.destroy()
    .then(item => {
    res.sendStatus(202);
    })
    .catch(next);
});


