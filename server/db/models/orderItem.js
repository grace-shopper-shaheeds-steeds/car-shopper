const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  status: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false
  }

})