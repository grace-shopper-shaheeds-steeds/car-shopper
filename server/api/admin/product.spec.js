const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Product = db.model('product')
const assert = require('assert')

const User = db.model('user')
const Category = db.model('category')



describe('Admin Product Routes', () =>{
    beforeEach(() =>{
        return db.sync({force: true})
            .then(() =>{
                return User.create({email: 'dgutt@email.com', password:'12345', userType: 'administrator'})
            })
            .then(() =>{
                return User.create({email: 'shshamsi@email.com', password:'6789', userType: 'user'})
            })
    })
    describe('admin user', () =>{
        const adminUser = request.agent(app)
        beforeEach(() =>{
            return adminUser
                .post('/auth/login')
                .send({email: 'dgutt@email.com', password: '12345'})
        })
        describe('POST /api/admin/products', () => {
            const sampleProduct = {
                title: 'Prius',
                description: 'fastest car alive',
                price: 11,
                inventoryQuantity: 1,
            };
            it('Adding a new product to the database', () => {
                return adminUser
                    .post('/api/admin/products')
                    .send(sampleProduct)
                    .expect(201)
                    .then((res)=>{
                        expect(res.body.product.title).to.equal('Prius')
                        expect(res.body.product.description).to.equal('fastest car alive')
                        expect(res.body.product.price).to.equal(11)
                        expect(res.body.product.inventoryQuantity).to.equal(1)
                    })
            })
        })

        describe('PUT /api/admin/products', ()=>{
            let product;
            let category;
            const sampleProduct = {
                title: 'Prius',
                description: 'fastest car alive',
                price: 11,
                inventoryQuantity: 1,
            };
            beforeEach(()=>{
               return Product.create(sampleProduct)
               .then((createdProduct)=>{
                    product = createdProduct
               })
               .then(()=>{
                   return Category.create({name: 'SUV'})
               })
               .then((createdCategory)=>{
                   console.log('createdCategory in put route test: ', createdCategory)
                   category = createdCategory
               })

            })

            const newTitle = {
                title: 'Tesla',
                description: 'fastest car alive',
                price: 11,
                inventoryQuantity: 1,
            }
            const addCategory = {
                title: 'Tesla',
                description: 'fastest car alive',
                price: 11,
                inventoryQuantity: 1,
                category: 'SUV'
            }
            const removeCategory = {
                title: 'Tesla',
                description: 'fastest car alive',
                price: 11,
                inventoryQuantity: 1,
                categoryId: null
            }
            it('Updating a current product title', ()=>{
                return adminUser
                    .put(`/api/admin/products/${product.id}`)
                    .send(newTitle)
                    .expect(200)
                    .then((res) =>{
                        console.log('res.body in put route test: ', res.body)
                        expect(res.body.product.title).to.equal('Tesla')
                    })
            })
            it('Updating a current category', ()=>{
                return adminUser
                    .put(`/api/admin/products/${product.id}`)
                    .send(addCategory)
                    .expect(200)
                    .then((res) =>{
                        console.log('res.body in put route test: ', res.body)
                        console.log('category in the update category test: ', category)
                        expect(res.body.product.categoryId).to.equal(category.id)
                    })
            })
            it('Removing a category', ()=>{
                return adminUser
                    .put(`/api/admin/products/${product.id}`)
                    .send(removeCategory)
                    .expect(200)
                    .then((res) =>{
                        console.log('res.body in put route test: ', res.body)
                        console.log('category in the update category test: ', category)
                        expect(res.body.product.categoryId).to.equal(null)
                    })
            })
        })
    })
    describe('non-admin user', () =>{

    })

    // describe('POST Route', () =>{
    //     const user1 = request.agent()
    //     const sampleProduct = {
    //         title: 'Prius',
    //         description: 'fastest car alive',
    //         price: 10.5,
    //         inventoryQuantity: 1,
    //         photo: 'photoTest',
    //         averageRating: 3.5
    //     }
    //     user1
    //         .post('http://localhost:8080/signup')
    //         .send(sampleUser1)
    //         .end(function(err, response){
    //             if(err) throw err
    //         })
    // })
})