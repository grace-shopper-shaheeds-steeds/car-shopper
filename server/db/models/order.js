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
    type: Sequelize.ENUM('Open', 'Pending', 'Complete', 'Cancelled'),
    unique: false,
    allowNull: false,
    defaultValue: 'Open'
}

})

module.exports = Order
