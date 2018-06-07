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
    const foundProducts = foundCart.products.map( async (productId) => {
      const foundSingleProduct = await Product.findById(productId)
      return foundSingleProduct
    })
    res.json(foundProducts)
  } catch (err){
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const foundCart = await Cart.create()
    res.json(foundCart)
  } catch (err){
    next(err)
  }
})

// router.put('/:userId/add', async (req, res, next) => {
//   try {
//     let carId = req.body.carId
//     const foundUser = await User.findById(req.params.userId)
//     const foundCart = await Cart.findById(foundUser.cartId)
//     const carToRemove = await Product.findById(carId)

//     let updatedCart = await foundCart.update({
//       products: foundCart.products.filter(product => product !== carId),
//       total: foundCart.total -= carToRemove.price
//     })

//     res.json(updatedCart)
//   } catch (err){
//     next(err)
//   }
// })

// router.put('/:userId/subtract', async (req, res, next) => {
//   try {
//     let carId = req.body.carId
//     const foundUser = await User.findById(req.params.userId)
//     const foundCart = await Cart.findById(foundUser.cartId)
//     const carToRemove = await Product.findById(carId)

//     let updatedCart = await foundCart.update({
//       products: foundCart.products.filter(product => product !== carId),
//       total: foundCart.total -= carToRemove.price
//     })

//     res.json(updatedCart)
//   } catch (err){
//     next(err)
//   }
// })

router.delete('/:userId', async (req, res, next) => {
  try {
    let carId = req.body.carId
    const foundUser = await User.findById(req.params.userId)
    const foundCart = await Cart.findById(foundUser.cartId)
    const carToRemove = await Product.findById(carId)

    let updatedCart = await foundCart.update({
      products: foundCart.products.filter(product => product !== carId),
      total: foundCart.total -= carToRemove.price
    })

    res.json(updatedCart)
  } catch (err){
    next(err)
  }
})

module.exports = router
