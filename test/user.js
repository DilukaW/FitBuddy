import assert from 'assert'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { response } from 'express';
import { app } from '../index.js'
import bcrypt from "bcryptjs";
import { User } from '../models/user.js'

chai.should();
chai.use(chaiHttp);


describe('Test user api endpoints', () => {



    //Test the login route
    describe('GET users/login', () => {
        it('It Should login the user', (done) => {
            chai.request(app).get('/users/login').send({ email: "dt.w1j@gmail.com" }).end((err, response) => {
                response.should.have.status(200)
                done();
            })
        })

    })

    //Test the login user profile route
    describe('GET users/profile/', () => {
        it('It Should redirect to user profile', (done) => {
            const id = '636f9f50c3fdd3d2836a002e';
            chai.request(app).get('/users/profile' + id).end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success');
                done();
            })
        })


    })

    //Test get all users route
    describe('GET users/all', () => {
        it('It Should get all the users', (done) => {
            chai.request(app).get('/users/all').end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success');
                response.body.should.have.property('data');
                response.body.should.have.property('success').eq(true);


                done();
            })
        })

    })

    //Test get user by id route
    describe('GET users/:id', () => {
        it('It Should get user by id', (done) => {
            const id = '636f9f50c3fdd3d2836a002e';
            chai.request(app).get('/users/' + id).end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success');
                response.body.should.have.property('data');
                response.body.should.have.property('success').eq(true);


                done();
            })
        })


    })

    //Test update user route
    describe('PUT users/:id', () => {
        it('It Should give error update user with wrong id', (done) => {
            const id = '636f9f50c3fdd3d2836a002';
            const user = {
                uname: "tom",
            };
            chai.request(app).post('/users/'+id).send(user).end((err, response) => {
                response.should.have.status(404);
                done();
            })
        })

    })

    //Test add enroll trainer route
    describe('PUT /trainers/:id', () => {
        it('It Should give error if update user all ready enrolled ', (done) => {
            const id = '636f9f50c3fdd3d2836a002';
            chai.request(app).post('/users/trainers/'+id).end((err, response) => {
                response.should.have.status(404);
                done();
            })
        })

    })

    //Test the user registration route
    describe('POST users/register', () => {
        it('It Should give a error for duplicate emails', (done) => {
            const user = {
                uname: "tom",
                email: "tom@gmail.com",
                gender: "Male",
                age: "20",
                password: "123478",
            };
            chai.request(app).post('/users/register').send(user).end((err, response) => {
                response.should.have.status(422);

                done();
            })
        })

    })

    //
    // it('GET all users',function(done){
    //    chai.request(app)
    //    .get("/user/all")
    //    .end((err,response)=>{
    //     chai.expect(response.status).to.be.equal(200)

    //     done();
    //    })
    // })
})