const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  orderId: {
      type: Sequelize.INTEGER,
      unique: false,
      allowNull: false
  },
  productId: {
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