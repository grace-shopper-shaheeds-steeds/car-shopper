const User = require('./user')
const Product = require('./product')
const Review = require('./review')
const Order = require('./order')

const OrderItem = require('./orderItem')
const Address = require('./address')
const Category = require('./category')

Review.belongsTo(Product)
Product.hasMany(Review)

Review.belongsTo(User)
User.hasMany(Review)


Order.belongsTo(User)
User.hasMany(Order)

OrderItem.belongsTo(Order)
Order.hasMany(OrderItem)

User.belongsToMany(Address, { through: 'userAddress' })
Address.belongsToMany(User, { through: 'userAddress' })

Category.belongsTo(Product)
Product.hasMany(Category)

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
  Address
}
