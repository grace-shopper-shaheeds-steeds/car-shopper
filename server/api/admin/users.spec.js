const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Product = db.model('product')
const assert = require('assert')

const User = db.model('user')
const Category = db.model('category')

describe('Admin User Routes', ()=>{
    beforeEach(() =>{
        return db.sync({force: true})
            .then(() =>{
                return User.create({firstName: 'dan', lastName: 'gutt', email: 'dgutt@email.com', password:'12345', userType: 'administrator'})
            })
            .then(() =>{
                return User.create({firstName: 'brian', lastName: 'gutt', email: 'bgutt@email.com', password:'01234', userType: 'user'})
            })
    })
    describe('admin user', ()=>{
        const adminUser = request.agent(app)
        beforeEach(() =>{
            return adminUser
                .post('/auth/login')
                .send({email: 'dgutt@email.com', password: '12345'})
        })
        describe('GET routes', ()=>{
            
            it('There is a list view that allows you to see all users', ()=>{
                return adminUser
                .get('/api/admin/user')
                .expect(200)
                .then((res)=>{
                    console.log('res.body: ', res.body)
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].firstName).to.equal('dan')
                    expect(res.body[0].lastName).to.equal('gutt')
                    expect(res.body[0].email).to.equal('dgutt@email.com')
                    expect(res.body[0].userType).to.eql('administrator')
                    expect(res.body[1].firstName).to.equal('brian')
                    expect(res.body[1].lastName).to.equal('gutt')
                    expect(res.body[1].email).to.equal('bgutt@email.com')
                    expect(res.body[1].userType).to.eql('user')
                })
            })
        })
        describe('PUT route that changes the userType', ()=>{
            let user;
            beforeEach(()=>{
                return User.create({email: 'shshamsi@email.com', password:'6789', userType: 'user'})
                .then((createdUser)=>{
                    user = createdUser
                })
            })
            it('userType changes from user to administrator', ()=>{
                return adminUser
                .put(`/api/admin/user/${user.id}`)
                .send({userType: 'administrator'})
                .expect(200)
                .then((res) =>{
                    //console.log('res.body', res.body)
                    expect(res.body.user).to.equal('administrator')
                })
            })
        })
        describe('DELETE route that removes a user', ()=>{
            let user;
            beforeEach(()=>{
                return User.create({email: 'shshamsi@email.com', password:'6789', userType: 'user'})
                .then((createdUser)=>{
                    user = createdUser
                })
            })
            it('user is deleted by admin', ()=>{
                return adminUser
                .delete(`/api/admin/user/${user.id}`)
                .expect(200)
                .then((res)=>{
                    expect(res.body.message).to.equal('sucessfully deleted user')
                })
            })

        })
    })

    describe('non-admin user', ()=>{
        const nonAdminUser = request.agent(app)
        beforeEach(() =>{
            return nonAdminUser
                .post('/auth/login')
                .send({email: 'bgutt@email.com', password: '01234'})
        })
        describe('GET routes', ()=>{
            
            it('There is a list view that allows you to see all users', ()=>{
                return nonAdminUser
                .get('/api/admin/user')
                .expect(403)
                .then((res)=>{
                    expect(res.body).to.eql({})
                })
            })
        })
        describe('PUT route that changes the userType', ()=>{
            let user;
            beforeEach(()=>{
                return User.create({email: 'shshamsi@email.com', password:'6789', userType: 'user'})
                .then((createdUser)=>{
                    user = createdUser
                })
            })
            it('userType changes from user to administrator', ()=>{
                return nonAdminUser
                .put(`/api/admin/user/${user.id}`)
                .send({userType: 'administrator'})
                .expect(403)
                .then((res) =>{
                    //console.log('res.body', res.body)
                    expect(res.body).to.eql({})
                })
            })
        })
        describe('DELETE route that removes a user', ()=>{
            let user;
            beforeEach(()=>{
                return User.create({email: 'shshamsi@email.com', password:'6789', userType: 'user'})
                .then((createdUser)=>{
                    user = createdUser
                })
            })
            it('user is deleted by admin', ()=>{
                return nonAdminUser
                .delete(`/api/admin/user/${user.id}`)
                .expect(403)
                .then((res)=>{
                    expect(res.body).to.eql({})
                })
            })

        })
    })
})