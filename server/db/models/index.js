const User = require('./user')
const Product = require('./product')
const Review = require('./review')
const Order = require('./order')
const Cart = require('./cart')
const OrderItem = require('./orderItem')
const Address = require('./address')
const Category = require('./category')

Review.belongsTo(Product)
Product.hasMany(Review)

Review.belongsTo(User)
User.hasMany(Review)


Order.belongsTo(Address)
Order.belongsTo(User)
User.hasMany(Order)

OrderItem.belongsTo(Product)
OrderItem.belongsTo(Order)
Order.hasMany(OrderItem)

User.belongsToMany(Address, { through: 'userAddress' })
Address.belongsToMany(User, { through: 'userAddress' })


Product.belongsTo(Category)
Category.hasMany(Product)

// Category.belongsToMany(Product, { through: 'productCategory' })
// Product.belongsToMany(Category, { through: 'productCategory' })

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Review,
  Order,
  OrderItem,
  Category,
  Address,
  Cart
}
