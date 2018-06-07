const express = require('express');
const router = express.Router()
const Product = require('../db/models/product')
const Category = require('../db/models/category')

router.post('/', async (req, res, next) => {
    try{
        const newProduct = await Product.create(req.body)
        res.json({message: 'Created product successfully!', product: newProduct})
    } catch (err){
        next(err)
    }
})


router.put('/:id', async (req, res, next) =>{
    try{
       await Product.update(
            req.body, {
                where: {
                    id: req.params.id
                }
            })
        res.json({message: 'Updated product successfully'})
    } catch(err){
        next(err)
    }
})


router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      include: [{model: Category}]
    })
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    const foundProduct = await Product.findById(id)
    res.json(foundProduct)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) =>{
    await Product.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({message: 'Successfully deleted'})
})

module.exports = router
