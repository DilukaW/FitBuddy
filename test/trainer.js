import assert from 'assert'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { response } from 'express';
import { app } from '../index.js'
import bcrypt from "bcryptjs";
import { User } from '../models/user.js'

chai.should();
chai.use(chaiHttp);

describe('Test trainer api endpoints', () => {



    //Test the login route
    describe('GET trainers/login', () => {
        it('It Should login the trainer', (done) => {
            chai.request(app).get('/trainers/login').send({ email: "dt.w1j@gmail.com" }).end((err, response) => {
                response.should.have.status(200)
                done();
            })
        })

    });

     //Test the login trainer profile route
     describe('GET trainers/profile/', () => {
        it('It Should redirect to trainer profile', (done) => {
            const id = '636f9f50c3fdd3d2836a008e';
            chai.request(app).get('/trainers/profile' + id).end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success');
                done();
            })
        })


    });

    //Test get all users route
    describe('GET trainers/all', () => {
        it('It Should get all the trainers', (done) => {
            chai.request(app).get('/trainers/all').end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success');
                response.body.should.have.property('data');
                response.body.should.have.property('success').eq(true);
                done();
            })
        })

    });

    //Test get user by id route
    describe('GET trainers/:id', () => {
        it('It Should get trainer by id', (done) => {
            const id = '6371bd406aa2f1cb20a6a945';
            chai.request(app).get('/trainers/' + id).end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success');
                response.body.should.have.property('data');
                response.body.should.have.property('success').eq(true);


                done();
            })
        })
        it('It Should give error for wrong trainer id', (done) => {
            const id = '6371bd406aa2f1cb20a6a94';
            chai.request(app).get('/trainers/' + id).end((err, response) => {
                response.body.should.be.a('object');
                response.body.should.have.property('success');
                response.body.should.have.property('message');
                response.body.should.have.property('success').eq(false);
                response.body.should.have.property('message').eq("server error");


                done();
            })
        })
    });

     //Test update trainer route
     describe('PUT trainers/:id', () => {
        it('It Should give error update trainer with wrong id', (done) => {
            const id = '6371bd406aa2f1cb20a6a94';
            const trainer = {
                uname: "tom",
            };
            chai.request(app).post('/trainers/'+id).send(trainer).end((err, response) => {
                response.should.have.status(404);
             
                done();
            })
        })

    });

    //Test add enroll user route
    describe('PUT /trainees/:id', () => {
        it('It Should give error if update user all ready enrolled ', (done) => {
            const id = '636f9f50c3fdd3d2836a002';
            chai.request(app).post('/trainers/trainees/'+id).end((err, response) => {
                response.should.have.status(404);
                done();
            })
        })

    })

    //Test the trainer registration route
    describe('POST trainers/register', () => {
        it('It Should give a error for duplicate emails', (done) => {
            const trainer = {
                uname: "tom",
                email: "tom@gmail.com",
                are:"yoga",
                description:"new",
                password: "123478",
            };
            chai.request(app).post('/trainers/register').send(trainer).end((err, response) => {
                response.should.have.status(422);
                response.body.should.be.a('array');
               

                done();
            })
        })

    })

});