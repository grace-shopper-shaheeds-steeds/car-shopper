const db = require('../db.js')
const Sequelize = require('sequelize')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
  },
  rating: {
    type: Sequelize.FLOAT
  },
  createDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get(){
      return this.getDataValue('createDate').toString().slice(0, 15)
    }
  }
})


module.exports = Review
