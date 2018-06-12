const express = require('express');
const router = express.Router()
const Product = require('../../db/models/product')
const Category = require('../../db/models/category')


router.post('/', async (req, res, next) => {
    try{
        let newProduct = null;
        if(!!req.body.category){
            const category = await Category.findOne({
                where: {
                    name: req.body.category
                },
            })
            newProduct = await Product.create({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                photo: req.body.photo,
                inventoryQuantity: req.body.inventoryQuantity,
                categoryId: category.id
            })
        } else {
            newProduct = await Product.create({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                photo: req.body.photo,
                inventoryQuantity: req.body.inventoryQuantity,
            })
        }

        res.status(201).json({message: 'Created product successfully!', product: newProduct})
    } catch (err){
        next(err)
    }
})


router.put('/:id', async (req, res, next) =>{
    try{
        console.log('req.body in admin put route: ', req.body)
        if(!!req.body.category){
            const category = await Category.findOne({
                where: {
                    name: req.body.category
                },
            })
            const instance = await Product.update({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                photo: req.body.photo,
                inventoryQuantity: req.body.inventoryQuantity,
                // available: req.body.available,
                categoryId: category.id
            }, {where: {
                     id: req.params.id
                 }, 
                 returning: true
             })
        } if(req.body.categoryId === null){
           const instance =  await Product.update({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                photo: req.body.photo,
                inventoryQuantity: req.body.inventoryQuantity,
                // available: req.body.available,
                categoryId: null
            }, {where: {
                     id: req.params.id
                 },
                 returning: true
             })
        }
           const instance = await Product.update({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                photo: req.body.photo,
                inventoryQuantity: req.body.inventoryQuantity,
               available: req.body.available
           }, {where: {
                     id: req.params.id
                 },
                 returning: true
             })
        res.json({message: 'Updated product successfully', product: instance[1][0]})
    } catch(err){
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
