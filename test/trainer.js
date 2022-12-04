// import request from "supertest";
// import { expect } from "chai";
// import dotenv from "dotenv";
// dotenv.config();
// import { app } from '../index.js'
// import { Trainer } from "../models/trainer.js";
// import { checkAuth } from '../middleware/checkAuth.js'

// let id;
// let token;

// const tempTrainer = {
//     uname: "trainer",
//     email: "trainer8@gmail.com",
//     area: 'yoga',
//     description: 'good trainer',
//     password: "12345678",
// };
// before((done) => {
//     Trainer.deleteMany({}, function (err) { });
//     done()
// });
// describe('Test trainer end points', () => {

//     describe("POST trainers", () => {
//         //register trainer
//         it("should register new trainer with valid credentials", (done) => {
//             request(app)
//                 .post("/trainers/register")
//                 .send(tempTrainer)
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     expect(res.body.data.uname).to.be.eql("trainer");
//                     expect(res.body.data.email).to.be.eql("trainer8@gmail.com");
//                     id = res.body.data._id
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });
//         // register failed
//         it("shouldn't accept the admin email that already exists in the database", (done) => {
//             request(app)
//                 .post("/trainers/register")
//                 .send(tempTrainer)
//                 .expect(422)
//                 .then((res) => {
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //login trainer
//         it("should login trainer with valid credentials", (done) => {
//             request(app)
//                 .post("/trainers/login")
//                 .send(tempTrainer)
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
//                 .post("/trainers/login")
//                 .send({ email: "d@gmail.com" })
//                 .expect(201)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql('Trainer not found');
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //login with invalid password
//         it("shouldn't login with invalid password", (done) => {
//             request(app)
//                 .post("/trainers/login")
//                 .send({ email: "trainer8@gmail.com", password: "1234" })
//                 .expect(201)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql('Password do not matched');
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });
//     });

//     describe("GET trainers", () => {

//         //redirect authenticated trainer to profile 
//         it("should get trainer profile for authenticated trainer", (done) => {
//             request(app)
//                 .get("/trainers/profile")
//                 .set('Authorization', 'Bearer ' + token)
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //redirect unauthenticated trainer to profile 
//         it("shouldn't get trainer profile for unauthenticated trainer", (done) => {
//             request(app)
//                 .get("/trainers/profile")
//                 .set('Authorization', 'Bearer ' + '44')
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql('Auth Failed');
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//          //get trainer
//          it("should get all trainers if available", (done) => {
//              request(app)
//                  .get("/trainers/all")
//                  .expect(200)
//                  .then((res) => {
//                      expect(res.body.success).to.be.eql(true);
//                      done();
//                  })
//                  .catch((err) => done(err));
//          });

//          //get trainer by id
//          it("should get trainer by id", (done) => {
//              request(app)
//                  .get("/trainers/" + id)
//                  .expect(200)
//                  .then((res) => {
//                      expect(res.body.success).to.be.eql(true);
//                      done();
//                  })
//                  .catch((err) => done(err));
//          });

//          //invalid trainer id
//          it("shouldn't get trainer with invalid id", (done) => {
//              request(app)
//                  .get("/trainers/" + "11")
//                  .expect(404)
//                  .then((res) => {
//                      expect(res.body.success).to.be.eql(false);
//                      expect(res.body.message).to.be.eql('server error');
//                      done();
//                  })
//                  .catch((err) => done(err));
//          });
//     });

    
//     describe("PUT trainers", () => {

//         //update trainer
//         it("should update trainer by id", (done) => {
//             request(app)
//                 .put("/trainers/" + id)
//                 .send({ uname: "new trainer" })
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     expect(res.body.data.uname).to.be.eql("new trainer");
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //update trainer with invalid id
//         it("shouldn't update trainer with invalid id", (done) => {
//             request(app)
//                 .put("/trainers/" + "11")
//                 .send({ email: "admin8@gmail.com" })
//                 .expect(201)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql("Trainer not found");
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //update trainer details by adding enrolled trainer id
//         it("should update trainer details by adding enrolled trainee id", (done) => {
//             const traineeId = "1457dfd2se5"
//             request(app)
//                 .put("/trainers/trainees/" + id)
//                 .send({ traineesId: traineeId })
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //update trainer details by adding enrolled trainer id with invalid trainer id
//         it("shouldn't update trainer details by adding enrolled trainee id with invalid id", (done) => {
//             const traineeId = "1457dfd2se5"
//             request(app)
//                 .put("/trainers/trainees/" + "11")
//                 .send({ traineesId: traineeId })
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql("Trainer not found");
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//     });

//     describe("DELETE trainers", () => {

//         //delete trainer by invalid id
//         it("shouldn't delete trainer by invalid id", (done) => {
//             request(app)
//                 .delete("/trainers/" + "11")
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql('Trainer not found');
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });
        
//         //delete trainer by id
//         it("should delete trainer by id", (done) => {
//             request(app)
//                 .delete("/trainers/" + id)
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });
        
//     });

// });