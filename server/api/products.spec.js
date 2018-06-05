
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET ROUTES', () => {
    const sampleProduct = {
      title: 'Prius',
      description: 'fastest car alive',
      price: 10.5,
      inventoryQuantity: 1,
      photo: 'photoTest',
      averageRating: 3.5
    }

    beforeEach(() => {
      return Product.create(sampleProduct)
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal('Prius')
        })
    })
  })

  describe('POST ROUTES', () =>{
    const sampleProduct2 = {
      title: 'Prius',
      description: 'fastest car alive',
      price: 10.5,
      inventoryQuantity: 1,
      photo: 'photoTest',
      averageRating: 3.5
    }
    it('POST /api/products', async () =>{
      await request(app)
        .post('/api/products')
        .send(sampleProduct2)
        .expect(200)
        const newProduct = await Product.findOne({
          where:{
            title: 'Prius'
          }
        })
        expect(!!newProduct).to.be.equal(true)
    })

  })
})


