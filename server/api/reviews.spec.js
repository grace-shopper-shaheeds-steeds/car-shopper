
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')

describe('Reviews Routes', () => {

  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET ROUTES', () => {

    const sampleReview = {
      content: 'Lorem ipsum dolar sit emit',
      rating: 3
    }

    beforeEach(() => {
      return Review.create(sampleReview)
    })

    it('GET /api/reviews', () => {
      return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].content).to.be.equal('Lorem ipsum dolar sit emit')
        })
    })

    it('GET /api/reviews/:id', () => {
      return request(app)
        .get('/api/reviews/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.rating).to.be.equal(3)
        })
    })

  })

})
