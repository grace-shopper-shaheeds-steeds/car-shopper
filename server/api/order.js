const express = require('express');
const router = express.Router()
const Order = require('../db/models/order')
const Product = require('../db/models/product')
const User = require('../db/models/user')
const Address = require('../db/models/address')
const OrderItem = require('../db/models/orderItem')


module.exports = router

router.param('id', (req, res, next, id) => {
    Order.findById(id)
      .then(item => {
        // if no item found, send 404
        if (!item) res.sendStatus(404);
        else {
          req.item = item;
          // we have to call next here so that the actual route we want to hit will match after the router.param
          next();
        }
      })
      .catch(next);
  });

  // retrieve all orders
router.get('/', (req, res, next ) => {
    Order.findAll({
      include: [
        {model: User, attributes: ["id", "firstName", "lastName", "email" ]},
        {model: Address},
        {model: OrderItem, include: [{model: Product}]},
      ]
    })
    .then(results => {
      res.send(results);
    })
    .catch(next);
  });

// get order by id
router.get('/:id', (req, res, next) => {
  Order.findOne({ 
    where: { id: req.params.id },
    include: [
      {model: User, attributes: ["id", "firstName", "lastName", "email" ]},
      {model: Address},
      {model: OrderItem, include: [{model: Product}]},
    ]
  })
  .then( order => {
    // router.param has now taken care of this!!
    res.send(order);
  })
});

// post a new order to product
router.post('/', async (req, res, next ) => {
  console.log(req.body)
  let {address, addressId, cart, userId, saveAddress} = req.body
  let products = req.body.cart.products

  try {
      // first we create the address record if it doesn't exist
      if(!addressId) {
        const newAddress = await Address.create(address)
        addressId = newAddress.id
      }
      // if the user wants to save this address, then we'll update the user record with this new address

      const order = {
        totalAmt: cart.total,
        addressId: addressId,
        userId: userId
      }
      let newOrder = await Order.create(order)
      const itemsArray = products.filter(product => {return {productId: product, orderId: newOrder.id} })
      await OrderItem.bulkCreate(itemsArray)
      newOrder = await Order.findById(newOrder.id)
      res.send(newOrder);
  } catch (err){
      next(err)
  }
});


