const db = require('../db.js')
const Sequelize = require('sequelize')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
  },
  rating: {
    type: Sequelize.FLOAT
  }
})

module.exports = Review
