const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  userId: {
      type: Sequelize.INTEGER,
      unique: false,
      allowNull: false
  },
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