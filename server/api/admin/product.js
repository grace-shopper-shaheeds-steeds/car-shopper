const express = require('express');
const router = express.Router()
const Product = require('../../db/models/product')
const Category = require('../../db/models/category')


router.post('/', async (req, res, next) => {
    try{
        console.log('req.body in admin post route: ', req.body)
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
                inventoryQuantity: req.body.inventoryQuantity,
                categoryId: category.id
            })
        } else {
            newProduct = await Product.create({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                inventoryQuantity: req.body.inventoryQuantity,
            })
        }
        
        res.json({message: 'Created product successfully!', product: newProduct})
    } catch (err){
        next(err)
    }
})


router.put('/:id', async (req, res, next) =>{
    try{
        if(!!req.body.category){
            const category = await Category.findOne({
                where: {
                    name: req.body.category
                }, 
            })
            await Product.update({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                inventoryQuantity: req.body.inventoryQuantity,
                categoryId: category.id
            }, {where: {
                     id: req.params.id
                 }
             })
        } else if(req.body.categoryId === null){
            await Product.update({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                inventoryQuantity: req.body.inventoryQuantity,
                categoryId: null
            }, {where: {
                     id: req.params.id
                 }
             })
        } else {
            await Product.update({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                inventoryQuantity: req.body.inventoryQuantity,
            }, {where: {
                     id: req.params.id
                 }
             })
        }
        // if(!!req.body.removeCategory){
        //     await Product.update({
        //         categoryId: null
        //     }, {
        //         where: {
        //             id: req.params.id
        //         }
        //     })
        // }
        res.json({message: 'Updated product successfully'})
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