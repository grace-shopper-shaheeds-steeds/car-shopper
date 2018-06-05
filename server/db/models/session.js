const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Session = db.define('session', {
  ipAddress: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  status: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false
  }

})


module.exports = Session