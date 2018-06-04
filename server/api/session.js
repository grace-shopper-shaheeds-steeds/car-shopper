const router = require('express').Router()
const {Session} = require('../db/session')
module.exports = router

router.param('id', (req, res, next, id) => {
    Session.findById(id)
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
  
// post a new item to cart
// req.body is the item object
router.post('/session', (req, res, next) => {
    Session.create(req.body)
      .then(item => {
        res.send(item);
      })
      .catch(next);
  });
  
router.delete('/session/:id', (req, res, next) => {
    req.item.remove()
    .then(item => {
    res.sendStatus(202);
    })
    .catch(next);
});

router.put('/session/:id', (req, res, next) => {
    req.item.update(req.body)
        .then(item => {
        res.send(item);
        })
        .catch(next);
    });
    
