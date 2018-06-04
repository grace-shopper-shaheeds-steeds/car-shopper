const db = require('./db.js')
const Sequelize = require('sequelize')

const Product = db.define('product', {
  description: {
    type: Sequelize.TEXT,
  },
  photo: {
    type: Sequelize.TEXT,
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  averageRating: {
    type: Sequelize.FLOAT
  }
})

module.exports = Product
