// import request from "supertest";
// import { expect } from "chai";
// import dotenv from "dotenv";
// dotenv.config();
// import { app } from '../index.js'
// import { User } from "../models/user.js";
// import { checkAuth } from '../middleware/checkAuth.js'

// let id;
// let token;

// const tempUser = {
//     uname: "tom",
//     email: "t8@gmail.com",
//     gender: "Male",
//     age: 20,
//     password: "12345678",
// };

// before((done) => {
//     User.deleteMany({}, function (err) { });
//     done()
// });
// describe('Test user end points', () => {
//     describe("POST users", () => {
//         //register user
//         it("should register new user with valid credentials", (done) => {
//             request(app)
//                 .post("/users/register")
//                 .send(tempUser)
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     expect(res.body.data.uname).to.be.eql("tom");
//                     expect(res.body.data.email).to.be.eql("t8@gmail.com");
//                     id = res.body.data._id
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });
//         // register failed
//         it("shouldn't accept the user email that already exists in the database", (done) => {
//             request(app)
//                 .post("/users/register")
//                 .send(tempUser)
//                 .expect(422)
//                 .then((res) => {
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //login user
//         it("should login user with valid credentials", (done) => {
//             request(app)
//                 .post("/users/login")
//                 .send(tempUser)
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
//                 .post("/users/login")
//                 .send({ email: "d@gmail.com" })
//                 .expect(201)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql('User not found');
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //login with invalid password
//         it("shouldn't login with invalid password", (done) => {
//             request(app)
//                 .post("/users/login")
//                 .send({ email: "t8@gmail.com", password: "1234" })
//                 .expect(201)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql('Password do not matched');
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });
//     });

//     describe("GET users", () => {

//         // redirect authenticated user to profile 
//         it("should get user profile if authenticated", (done) => {
//             request(app)
//                 .get("/users/profile")
//                 .set('Authorization', 'Bearer ' + token)
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //redirect unauthenticated user to profile 
//         it("shouldn't get user profile for unauthenticated user", (done) => {
//             request(app)
//                 .get("/users/profile")
//                 .set('Authorization', 'Bearer ' + '44')
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql('Auth Failed');
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //get users
//         it("should get all users if available", (done) => {
//             request(app)
//                 .get("/users/all")
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //get user by id
//         it("should get user by id", (done) => {
//             request(app)
//                 .get("/users/" + id)
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);

//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //invalid user id
//         it("shouldn't get user with invalid id", (done) => {
//             request(app)
//                 .get("/users/" + "11")
//                 .expect(404)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql('server error');
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });
//     });


//     describe("PUT users", () => {

//         //update user
//         it("should update user by id", (done) => {
//             request(app)
//                 .put("/users/" + id)
//                 .send({ uname: "new tom" })
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     expect(res.body.data.uname).to.be.eql("new tom");
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //update user with invalid id
//         it("shouldn't update user with invalid id", (done) => {
//             request(app)
//                 .put("/users/" + "11")
//                 .send({ email: "t8@gmail.com" })
//                 .expect(201)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql("User not found");
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //update user details by adding enrolled trainer id
//         it("should update user details by adding enrolled trainer id", (done) => {
//             const trainerId = "1457dfd2se5"
//             request(app)
//                 .put("/users/trainers/" + id)
//                 .send({ trainersId: trainerId })
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //update user details by adding enrolled trainer id with invalid user id
//         it("shouldn't update user details by adding enrolled trainer id with invalid id", (done) => {
//             const trainerId = "1457dfd2se5"
//             request(app)
//                 .put("/users/trainers/" + "11")
//                 .send({ trainersId: trainerId })
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql("User not found");
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//     });

//     describe("DELETE users", () => {


//         //delete user by invalid id
//         it("shouldn't delete user by invalid id", (done) => {
//             request(app)
//                 .delete("/users/" + "11")
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql('User not found');
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //delete user by id
//         it("should delete user by id", (done) => {
//             request(app)
//                 .delete("/users/" + id)
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//     });


// });



