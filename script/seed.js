// 'use strict'

// const db = require('../server/db')
// const seedData = require('./data.json')
// const { Product, Category } = require('../server/db/models')

// async function seed () {

//   await db.sync({force: true})

//   await Promise.all(seedData[1].map( async (category) => {
//     await Category.create(category)
//   }))

//   console.log(`Categories seeded!`)

//   await Promise.all(
//     seedData[0].map( async (product) => {
//       const newProduct = await Product.create(product)
//       await newProduct.addCategory(Math.ceil(Math.random() * seedData[1].length))
//     })
//   )

//   console.log(`Products seeded!`)

// }

// // Execute the `seed` function, IF we ran this module directly (`node seed`).
// // `Async` functions always return a promise, so we can use `catch` to handle
// // any errors that might occur inside of `seed`.
// if (module === require.main) {
//   seed()
//   .catch(err => {
//     console.error(err)
//     process.exitCode = 1
//   })
//   .finally(() => { // `finally` is like then + catch. It runs no matter what.
//     console.log('closing db connection')
//     db.close()
//     console.log('db connection closed')
//   })
//   /*
//   * note: everything outside of the async function is totally synchronous
//   * The console.log below will occur before any of the logs that occur inside
//   * of the async function
//   */
//   console.log('seeding...')
// }

// module.exports = seed
