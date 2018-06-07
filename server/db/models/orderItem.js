const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  status: {
      type: Sequelize.ENUM('open', 'filled', 'cancelled'),
      unique: false,
      allowNull: false,
      defaultValue: 'open'
    }

})

module.exports = OrderItem
