const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  status: {
      type: Sequelize.ENUM('Open', 'Pending', 'Complete', 'Cancelled'),
      // unique: false,
      allowNull: false,
      defaultValue: 'Open'
  }

})

module.exports = OrderItem
