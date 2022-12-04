
// import request from "supertest";
// import { expect } from "chai";
// import dotenv from "dotenv";
// dotenv.config();
// import { app } from '../index.js'


// describe('Test exercise api end points', () => {
//     describe('GET exercise', () => {
//         //get List of bodyparts
//         it("Should get all the body parts", (done) => {
//             request(app)
//                 .get('/bodyPartList')
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //get List of bodyparts
//         it("Shouldn't get all the body parts if api request limit exceeded", (done) => {
//             request(app)
//                 .get('/bodyPartList')
//                 .expect(201)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql("api request limit exceeded");
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//          //get list of exercises by bodyPart
//          it("Should get list of exercises by bodyPart", (done) => {
//             const part = "chest"
//             request(app)
//                 .get('/part/' + part)
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //get list of exercises by bodyPart
//         it("Shouldn't get list of exercises by bodyPart if api request limit exceeded", (done) => {
//             const part = "chest"
//             request(app)
//                 .get('/part/' + part)
//                 .expect(201)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql("api request limit exceeded");
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //get exercise by exercise id
//         it("Should get exercise by exercise id ", (done) => {
//             const id = "0001"
//             request(app)
//                 .get('/exerciseId/' + id)
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //get exercise by exercise id
//         it("Shouldn't get exercise by exercise id if api request limit exceeded", (done) => {
//             const id = "0001"
//             request(app)
//                 .get('/exerciseId/' + id)
//                 .expect(201)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql("api request limit exceeded");
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//          //get exercise by exercise name
//          it("Should get exercise by exercise name", (done) => {
//             const name = "assisted lying calves stretch";
//             request(app)
//                 .get('/exerciseName/' + name)
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //get exercise by exercise name
//         it("Shouldn't get exercise by exercise name if api request limit exceeded", (done) => {
//             const name = "assisted lying calves stretch";
//             request(app)
//                 .get('/exerciseName/' + name)
//                 .expect(201)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql("api request limit exceeded");
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //get list of target mussels
//         it("Should get list of target mussels", (done) => {
//             request(app)
//                 .get('/targetMussels')
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //get list of target mussels
//         it("Shouldn't get list of target mussels if api request limit exceeded", (done) => {
//             request(app)
//                 .get('/targetMussels')
//                 .expect(201)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql("api request limit exceeded");
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//          //get list of exercises by target mussel
//          it("Should get list of exercises by target mussel", (done) => {
//             const mussel = "abs"
//             request(app)
//                 .get('/targetMussel/' + mussel)
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     done();
//                 })
//                 .catch((err) => done(err));
//             });

//         //get list of exercises by target mussel
//         it("Shouldn't get list of exercises by target mussel if api request limit exceeded", (done) => {
//             const mussel = "abs"
//             request(app)
//                 .get('/targetMussel/' + mussel)
//                 .expect(201)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql("api request limit exceeded");
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//          //get list of exercises
//          it("Should get list of exercises", (done) => {
//             request(app)
//                 .get('/exercises')
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //get list of exercises
//         it("Shouldn't get list of exercises if api request limit exceeded", (done) => {
//             request(app)
//                 .get('/exercises')
//                 .expect(201)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql("api request limit exceeded");
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //get list of exercise by equipment
//         it("Should get list of exercise by equipment", (done) => {
//             const equipment = "band"
//             request(app)
//                 .get('/equipmentName/' + equipment)
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //get list of exercise by equipment
//         it("Shouldn't get list of exercise by equipment if api request limit exceeded", (done) => {
//             const equipment = "band"
//             request(app)
//                 .get('/equipmentName/' + equipment)
//                 .expect(201)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql("api request limit exceeded");
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //get List of equipments
//         it("Should get list of equipments", (done) => {
//             request(app)
//                 .get('/equipments')
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(true);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });

//         //get List of equipments
//         it("Shouldn't get list of equipments if api request limit exceeded", (done) => {
//             request(app)
//                 .get('/equipments')
//                 .expect(201)
//                 .then((res) => {
//                     expect(res.body.success).to.be.eql(false);
//                     expect(res.body.message).to.be.eql("api request limit exceeded");
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });


//     });


// });
