// 'use strict'

// const db = require('../server/db')
// const seedData = require('./data.json')
// const { Product, Category } = require('../server/db/models')

// db.sync({force: true})
//   .then(() => {
//     return Promise.all(seedData[1].map( async (category) => {
//       await Category.create(category)
//     }))
//   })
//   .then(() => {
//     console.log('Category seed successful!');
//   })
//   .then(() => {
//     return Promise.all(
//       seedData[0].map( async (product) => {
//         const newProduct = await Product.create(product)
//         await newProduct.addCategory(Math.ceil(Math.random() * seedData[1].length))
//       })
//     )
//   })
//   .then(() => {
//     console.log('Product seed successful!');
//     db.close()
//   })
//   .catch((err) => {
//     console.log('There was an error: ');
//     console.error(err.stack)
//     db.close()
// })
