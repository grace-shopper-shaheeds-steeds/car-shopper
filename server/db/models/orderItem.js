const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  // REVIEW: price, qty ?
  status: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false
  }

})

module.exports = OrderItem
