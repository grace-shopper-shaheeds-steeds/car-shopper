const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
    street: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    zipCode: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    addressType: {
        type: Sequelize.ENUM('billing', 'home')
    }

})


module.exports = Address