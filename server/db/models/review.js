const db = require('../db.js')
const Sequelize = require('sequelize')
const Product = require('./product')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
  },
  rating: {
    type: Sequelize.FLOAT
  },
  createDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get(){
      return this.getDataValue('createDate').toString().slice(0, 15)
    }
  }
})

Review.afterCreate( async (instance) => {
  const productId = instance.productId

  const reviews = await Review.findAll({
    where: {
      productId
    }
  })

  let reviewCount = 0

  const total = reviews.reduce((acc, review) => {
    reviewCount++
    acc += review.rating
    return acc
  }, 0)

  const averageRating = Math.round( (total / reviewCount ) * 10 ) / 10

  await Product.update({
    averageRating
  }, {
    where: { id: productId },
    returning: true,
    plain: true
  })
})

module.exports = Review
