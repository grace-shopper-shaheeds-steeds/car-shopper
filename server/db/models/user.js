const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Cart = require('./cart')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName:{
    type: Sequelize.STRING
  },
  fullName:{
    type: Sequelize.VIRTUAL,
    get(){
      return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName')
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  userType: {
    type: Sequelize.ENUM('administrator', 'user'),
    defaultValue: 'user'
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get () {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  cartId: {
    type: Sequelize.INTEGER
  },
  userName: {
    type: Sequelize.VIRTUAL,
    get(){
      if(!!this.getDataValue('firstName')){
        return this.getDataValue('email').slice(0,2) + this.getDataValue('id')
      }
    }
  }
  
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.beforeValidate( async (newUser) => {
  let newCart = await Cart.create()
  newUser.cartId = newCart.id
})

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}


User.isAdmin = async function (userId){
  const user = await User.findById(userId)
  if(user.userType === 'administrator'){
    return true;
  } 
  return false
}


/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
