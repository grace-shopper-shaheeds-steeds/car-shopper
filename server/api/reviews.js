const express = require('express');
const router = express.Router()
const Review = require('../db/models/review')

// GET - /api/reviews
router.get('/', async (req, res, next) => {
  try {
    const allReviews = await Review.findAll()
    res.json(allReviews)
  } catch (err) { next(err) }
})

// GET /api/review/:id
router.get('/:id', async (req, res, next) => {
  try {
    const singleReview = await Review.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(singleReview)
  } catch (err) { next(err) }
})

// POST /api/review - TODO
router.post('/', async (req, res, next) => {
  const {content, rating, productId, userId} = req.body
  try {
    const newReview = await Review.create({
      content,
      rating,
      productId,
      userId
    })
    res.json(newReview)
  } catch (err) { next(err) }
})

module.exports = router
