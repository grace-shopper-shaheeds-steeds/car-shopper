const express = require('express');
const router = express.Router()
const Cart = require('../db/models/cart')
const User = require('../db/models/user')
const Product = require('../db/models/product')

router.get('/:userId', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.userId)
    const foundCart = await Cart.findById(foundUser.cartId)
    res.json(foundCart)
  } catch (err){
    next(err)
  }
})

router.get('/:userId/products', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.userId)
    const foundCart = await Cart.findById(foundUser.cartId)
    let arr = []
    const foundProducts = foundCart.products.forEach( async (productId) => {
      arr.push(Product.findById(productId))
    })
    let holder = await Promise.all(arr)
    res.json(holder)
  } catch (err){
    next(err)
  }
})


// 'ROUTE FOR CREATING NEW CART!!! WILL NEED LATER FOR USERS WHO ARE NOT SIGNED IN!!!!!!!!!!!!!'
// router.post('/', async (req, res, next) => {
//   try {
//     const foundCart = await Cart.create()
//     res.json(foundCart)
//   } catch (err){
//     next(err)
//   }
// })

router.put('/:userId/add', async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    let carId = req.body.carId
    const foundUser = await User.findById(req.params.userId)
    const foundCart = await Cart.findById(foundUser.cartId)
    let updatedCart
    if (foundCart.products) {
      updatedCart = await foundCart.update({
        products: [...foundCart.products, carId],
      })
    } else {
      updatedCart = await foundCart.update({
        products: [carId]
      })
    }
    
    res.json(updatedCart)
  } catch (err){
    next(err)
  }
})

router.put('/:userId/subtract', async (req, res, next) => {
  try {
    let remover = true
    let carId = req.body.carId
    const foundUser = await User.findById(req.params.userId)
    const foundCart = await Cart.findById(foundUser.cartId)
    let updatedCart = await foundCart.update({
      products: foundCart.products.filter(productId => {
        if (productId === carId && remover) {
          remover = !remover
          return false
        }
        return true
      })
    })
    res.json(updatedCart)
  } catch (err){
    next(err)
  }
})

router.delete('/:userId/delete', async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    let carId = req.body.carId
    const foundUser = await User.findById(req.params.userId)
    const foundCart = await Cart.findById(foundUser.cartId)
    let updatedCart = await foundCart.update({
      products: foundCart.products.filter(product => product !== carId),
    })

    res.json(updatedCart)
  } catch (err){
    next(err)
  }
})

module.exports = router
