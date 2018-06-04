const User = require('./user')
const Product = require('./product')
const Review = require('./review')
const Order = require('./order')
const Session = require('./session')
const OrderItem = require('./orderItem')
const Address = require('./address')

Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(Review)
Review.belongsTo(User)

User.hasOne(Session)
Session.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderItem)
OrderItem.belongsTo(Order)

User.hasMany(Address)
Address.hasMany(User)

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
  Session,
  Order,
  OrderItem,
  Address
}
