const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Session = db.define('session', {
  ipAddress: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  userId: {
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