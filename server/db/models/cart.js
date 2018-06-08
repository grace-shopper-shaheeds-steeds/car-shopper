const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Cart = db.define('cart', {
  products: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
  quantity: {
    type: Sequelize.VIRTUAL,
    get() {
      if (!this.products.length)  {
        return 'no items'
      }
      let obj = {}
      let arr = this.products
      if (!arr.length) return 'nothing here'
      for (let i = 0; i < arr.length; i++) {
        if (obj[arr[i]] === undefined) {
          obj[arr[i]] = 1
        } else {
          obj[arr[i]]++
        }
      }
      return obj
    },
  },
  total: {
    type: Sequelize.INTEGER,
  }
})

Cart.beforeUpdate( async (instance) => {
  let sum = 0
  if (!instance.products) return ''
  let arr = []
  instance.products.forEach(productId => {
    arr.push(Product.findById(productId))
  })
  let holder = await Promise.all(arr)
  holder.forEach(async item => {
    sum += item.price
  })
  instance.total = sum
})

module.exports = Cart
