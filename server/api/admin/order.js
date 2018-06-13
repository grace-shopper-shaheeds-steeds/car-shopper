const express = require('express');
const router = express.Router()
const Order = require('../../db/models/order')
const Address = require('../../db/models/address')
const User = require('../../db/models/user')
const gsSendMail = require('@sendgrid/mail')
gsSendMail.setApiKey(process.env.SENDGRID_API_KEY)

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
 
// update a particular order
router.put('/:id', (req, res, next) => {
  // we already got a order from the db with router.param
  req.item.update(req.body)
  .then(updatedOrder => {
    let firstName, lastName, email = ''
    Address.findById(req.item.addressId)
    .then(address => {
      email = address.email
    })
    User.findById(req.item.userId)
    .then(user => {
      firstName = user.firstName
      lastName = user.lastName
    })
    let confirmMessage = '<h5>Hello ' + firstName + ' ' + lastName + '.</h5>  Your order: <strong>' + req.item.id + '</strong> has shipped'
    confirmMessage += '<br/>Thank you for your business with Grace Shopper.'
    
    const message = {
      to: email,
      from: 'Grace.Shopper.Admin@graceshopper.com',
      subject: 'Your graceshopper.com order update',
      html: confirmMessage
    };
      
    gsSendMail.send(message);


    res.send(updatedOrder);
  })
  .catch(next);
});
  
// delete a new order... we won't actually delete the order
// we'll just update the status to 'X' for deleted order
router.delete('/:id', (req, res, next) => {
    req.item.update({ status: 'Cancelled' })
    .then(item => {
      res.send(item);
      // res.sendStatus(202);
    })
    .catch(next);
});

    
