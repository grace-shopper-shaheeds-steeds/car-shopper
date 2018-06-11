const express = require('express');
const router = express.Router()
const Cart = require('../db/models/cart')
const User = require('../db/models/user')
const Product = require('../db/models/product')
const faker = require('faker')

router.get('/temp', async (req, res, next) => {
  try {
    const tempUser = await User.create({
      email: faker.internet.email()
    })
    res.json(tempUser)
  } catch (err){
    next(err)
  }
})

router.put('/cartMerge', async (req, res, next) => {
  try {
    console.log('entered')
    const tempUser = await User.findById(+req.body.tempUserId)
    const userToUpdate = await User.findById(req.body.userId)
    const oldCart = await Cart.findById(tempUser.cartId)
    if (!oldCart.products.length) {
      res.end()
    } else {
      const newCart = await Cart.findById(userToUpdate.cartId)
      console.log('oldcart', oldCart)
      console.log('newcart', newCart)
      await newCart.update({
        products: oldCart.products
      })
      await oldCart.update({
        products: [],
      })
      res.end()
    }
  } catch (err){
    next(err)
  }
})


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
    console.log('foundProducts: ', foundProducts)
    let holder = await Promise.all(arr)
    res.json(holder)
  } catch (err){
    next(err)
  }
})

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

router.put('/:userId/delete', async (req, res, next) => {
  try {
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
