const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  totalAmt: {
      type: Sequelize.INTEGER,
      unique: false,
      allowNull: false
  },
  status: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false
  }

})

module.exports = Order
