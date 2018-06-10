const express = require('express');
const router = express.Router()
const User = require('../../db/models/user')


router.get('/', async (req, res, next) =>{
    try{
        const userList = await User.findAll({
            attributes:['id', 'firstName', 'lastName', 'email', 'userType']
        })
        res.json(userList)
    } catch(err){
        console.error(err)
    }

})

router.put('/:id', async (req, res, next) =>{
    console.log('req.body in put route for user: ', req.body)
    try{
        const instance = await User.update({
            userType: req.body.userType
        },{
            where:{
                id: req.params.id
            },
            returning: true
        })
        res.json({message: 'Successfully changed status', user: instance[1][0].dataValues.userType})

    } catch(err){
        console.error(err)
    }
})

router.delete('/:id', async (req, res, next)=>{
    await User.destroy({
        where:{
            id: req.params.id
        }
    })
    res.json({message: 'sucessfully deleted user'})
})

module.exports = router
