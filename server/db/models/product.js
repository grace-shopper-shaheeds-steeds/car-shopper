const db = require('../db.js')
const Sequelize = require('sequelize')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  // REVIEW: price as float?
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  // REVIEW: how do you plan to track inventory
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: 'https://i.imgur.com/dPjEQa1.png'
  },
  averageRating: {
    type: Sequelize.FLOAT
  }
})

module.exports = Product
