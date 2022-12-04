// import request from "supertest";
// import { expect } from "chai";
// import dotenv from "dotenv";
// dotenv.config();
// import { app } from '../index.js'
// import { Admin } from "../models/admin.js";
// import { checkAuth } from '../middleware/checkAuth.js'

// let id;
// let token;

// const tempAdmin = {
//     uname: "admin",
//     email: "admin8@gmail.com",
//     password: "12345678",
// };

// before((done) => {
//     Admin.deleteMany({}, function (err) { });
//     done()
// });

// describe('Test admin end points', () => {

//     describe("POST admins", () => {
//         //register admin
//         it("should register new admin with valid credentials", (done) => {
//             request(app)
//                 .post("/admins/register")
//                 .send(tempAdmin)
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     expect(res.body.data.uname).to.be.eql("admin");
//                     expect(res.body.data.email).to.be.eql("admin8@gmail.com");
//                     id = res.body.data._id
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });
//         // register failed
//         it("shouldn't accept the admin email that already exists in the database", (done) => {
//             request(app)
//                 .post("/admins/register")
//                 .send(tempAdmin)
//                 .expect(422)
//                 .then((res) => {
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //login admin
//         it("should login admin with valid credentials", (done) => {
//             request(app)
//                 .post("/admins/login")
//                 .send(tempAdmin)
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     expect(res.body.message).to.be.eql('Login Successful');
//                     token = res.body.token
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //login with invalid email 
//         it("shouldn't login with invalid email", (done) => {
//             request(app)
//                 .post("/admins/login")
//                 .send({ email: "d@gmail.com" })
//                 .expect(201)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql('Admin user not found');
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //login with invalid password
//         it("shouldn't login with invalid password", (done) => {
//             request(app)
//                 .post("/admins/login")
//                 .send({ email: "admin8@gmail.com", password: "1234" })
//                 .expect(201)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql('Password do not matched');
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });
//     });

//     describe("GET admins", () => {

//         //redirect authenticated admin to profile 
//         it("should get admin profile for authenticated admin", (done) => {
//             request(app)
//                 .get("/admins/profile")
//                 .set('Authorization', 'Bearer ' + token)
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //redirect unauthenticated admin to profile 
//         it("shouldn't get admin profile for unauthenticated admin", (done) => {
//             request(app)
//                 .get("/admins/profile")
//                 .set('Authorization', 'Bearer ' + '44')
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql('Auth Failed');
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });
//     });

// });