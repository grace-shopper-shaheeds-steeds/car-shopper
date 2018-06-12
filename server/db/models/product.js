const db = require('../db.js')
const Sequelize = require('sequelize')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  soldQuantity: {
    type: Sequelize.INTEGER,
    // allowNull: false
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: '/img/default_car.png'
  },
  averageRating: {
    type: Sequelize.FLOAT
  },
  available: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  createDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get(){
      return this.getDataValue('createDate').toString().slice(0, 15)
    }
  }
})

module.exports = Product
