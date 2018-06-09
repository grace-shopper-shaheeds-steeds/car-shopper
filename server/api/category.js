const express = require('express');
const router = express.Router()
const Category = require('../db/models/category')
module.exports = router

// GET - api/categories
router.get('/', (req, res, next ) => {
  Category.findAll()
    .then(results => {
      res.send(results);
    })
    .catch(next);
});
