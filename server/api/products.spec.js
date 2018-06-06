
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

    it('GET /api/products/1', () => {
      return request(app)
        .get('/api/products/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.title).to.be.equal('Prius')
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
      // REVIEW: are we using then or async/await?
      //  also, indentation here is a little confusing
        const newProduct = await Product.findOne({
          where:{
            title: 'Prius'
          }
        })
        expect(!!newProduct).to.be.equal(true)
    })

  })


  describe('PUT ROUTES', () => {
    const sampleProduct = {
      title: 'Prius',
      description: 'fastest car alive',
      price: 10.5,
      inventoryQuantity: 1,
      photo: 'photoTest',
      averageRating: 3.5
    }

    const newTitle = { title: 'Tesla'}

    beforeEach(() => {
      return Product.create(sampleProduct)
    })

    it('PUT /api/products/:id', async () => {
      await request(app)
        .put('/api/products/1')
        .send(newTitle)
        const res = await Product.findAll()
        expect(res).to.be.an('array')
        expect(res[0].title).to.be.equal('Tesla')

    })
  })

  describe('DELETE ROUTES', () => {
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

    it('DELETE /api/products/:id', async () => {
      await request(app)
        .delete('/api/products/1')
        .expect(200)
        const res = await Product.findAll()
        expect(res).to.be.an('array')
        expect(res.length).to.be.equal(0)

    })
  })

})
