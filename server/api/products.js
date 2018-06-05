const express = require('express');
const router = express.Router()

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



module.exports = router