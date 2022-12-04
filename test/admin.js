// import assert from 'assert'
// import chai, { expect } from 'chai'
// import chaiHttp from 'chai-http'
// import { response } from 'express';
// import { app } from '../index.js'


// chai.should();
// chai.use(chaiHttp);


// describe('Test admin api endpoints', () => {

//     //Test the login route
//     describe('GET admins/login', () => {
//         it('It Should login the admin', (done) => {
//             chai.request(app).get('/admins/login').send({ email: "dt.wj85@gmail.com" }).end((err, response) => {
//                 response.should.have.status(200)
//                 done();
//             })
//         })

//     });

//     //Test the login admin profile route
//     describe('GET admins/profile/', () => {
//         it('It Should redirect to admin profile', (done) => {
//             const id = '6361d8dca3441095cfa7d204';
//             chai.request(app).get('/admins/profile'+ id).end((err, response) => {
//                 response.should.have.status(200);
//                 response.body.should.be.a('object');
            
//                 done();
//             })
//         })


//     })

//     //Test the admin add route
//     describe('POST admins/register', () => {
//         it('It Should give a error for duplicate emails', (done) => {
//             const user = {
//                 uname: "tom",
//                 email: "tom@gmail.com",
//                 gender: "Male",
//                 age: "20",
//                 password: "123478",
//             };
//             chai.request(app).post('/admins/register').send(user).end((err, response) => {
//                 response.should.have.status(422);
//                 response.body.should.be.a('array');
                

//                 done();
//             })
//         })

//     })
// });