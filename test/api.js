// import assert from 'assert'
// import chai, { expect } from 'chai'
// import chaiHttp from 'chai-http'
// import { response } from 'express';
// import { app } from '../index.js'
// import bcrypt from "bcryptjs";
// import { User } from '../models/user.js'

// chai.should();
// chai.use(chaiHttp);

// describe('Test exercises api endpoints', () => {

//     //get List of bodyparts
//     describe('GET /bodyPartList', () => {
//         // it('It Should get all the body parts', (done) => {
//         //     chai.request(app).get('/bodyPartList').end((err, response) => {
//         //         response.should.have.status(200);
//         //         response.body.should.have.property('data');
//         //         response.body.should.have.property('success').eq(true);
//         //         done();
//         //     })
//         // });
//         it('It Should give error when api call failing', (done) => {
//             chai.request(app).get('/bodyPartList').end((err, response) => {
           
               
//                 response.body.should.have.property('success').eq(false);
//                 response.body.should.have.property('message').eq("api request limit exceeded");
//                 done();
//             })
//         });
//     });

// //get List of exercises by bodyPart
// describe('GET /part/:part', () => {
//     const part="chest"
//     // it('It Should get list of exercises by bodyPart', (done) => {
//     //     chai.request(app).get('/part/'+part').end((err, response) => {
//     //         response.should.have.status(200);
//     //         response.body.should.have.property('data');
//     //         response.body.should.have.property('success').eq(true);
//     //         done();
//     //     })
//     // });
//     it('It Should give error when api call failing', (done) => {
//         const part="chest"
//         chai.request(app).get('/part/'+part).end((err, response) => {
       
           
//             response.body.should.have.property('success').eq(false);
//             response.body.should.have.property('message').eq("api request limit exceeded");
//             done();
//         })
//     });
// });

// //get exercise by exercise id
// describe('GET /exerciseId/:id', () => {
//     const id="0001"
//     // it('It Should get exercise by exercise id', (done) => {
//     //     chai.request(app).get('/exerciseId/'+id').end((err, response) => {
//     //         response.should.have.status(200);
//     //         response.body.should.have.property('data');
//     //         response.body.should.have.property('success').eq(true);
//     //         done();
//     //     })
//     // });
//     it('It Should give error when api call failing', (done) => {
//         const id="0001"
//         chai.request(app).get('/exerciseId/'+id).end((err, response) => {
           
//             response.body.should.have.property('success').eq(false);
//             response.body.should.have.property('message').eq("api request limit exceeded");
//             done();
//         })
//     });
// });

// //get exercise by exercise name
// describe('GET /exerciseName/:name', () => {
//     const name="assisted lying calves stretch";
//     // it('It Should get exercise by exercise name', (done) => {
//     //     chai.request(app).get('/exerciseName/'+name').end((err, response) => {
//     //         response.should.have.status(200);
//     //         response.body.should.have.property('data');
//     //         response.body.should.have.property('success').eq(true);
//     //         done();
//     //     })
//     // });
//     it('It Should give error when api call failing', (done) => {
//         const name="assisted lying calves stretch";
//         chai.request(app).get('/exerciseName/'+name).end((err, response) => {
     
           
//             response.body.should.have.property('success').eq(false);
//             response.body.should.have.property('message').eq("api request limit exceeded");
//             done();
//         })
//     });
// });

// //get list of target mussels
// describe('GET /targetMussels', () => {
  
//     // it('It Should get list of target mussels', (done) => {
//     //     chai.request(app).get('/targetMussels').end((err, response) => {
//     //         response.should.have.status(200);
//     //         response.body.should.have.property('data');
//     //         response.body.should.have.property('success').eq(true);
//     //         done();
//     //     })
//     // });
//     it('It Should give error when api call failing', (done) => {

//         chai.request(app).get('/targetMussels').end((err, response) => {
          
//             response.body.should.have.property('success').eq(false);
//             response.body.should.have.property('message').eq("api request limit exceeded");
//             done();
//         })
//     });
// });

// //get list of exercises by target mussel
// describe('GET /targetMussel/:mussel', () => {
//   const mussel="chest"
//     // it('It Should get list of exercises by target mussel', (done) => {
//     //     chai.request(app).get('/targetMussel/'+mussel).end((err, response) => {
//     //         response.should.have.status(200);
//     //         response.body.should.have.property('data');
//     //         response.body.should.have.property('success').eq(true);
//     //         done();
//     //     })
//     // });
//     it('It Should give error when api call failing', (done) => {
//         const mussel="chest"
//         chai.request(app).get('/targetMussel/'+mussel).end((err, response) => {
    
           
//             response.body.should.have.property('success').eq(false);
//             response.body.should.have.property('message').eq("api request limit exceeded");
//             done();
//         })
//     });
// });

// //get List of exercises
// describe('GET /exercises', () => {
  
//       // it('It Should get list of exercises', (done) => {
//       //     chai.request(app).get('/exercises').end((err, response) => {
//       //         response.should.have.status(200);
//       //         response.body.should.have.property('data');
//       //         response.body.should.have.property('success').eq(true);
//       //         done();
//       //     })
//       // });
//       it('It Should give error when api call failing', (done) => {
         
//           chai.request(app).get('/exercises').end((err, response) => {
             
             
//               response.body.should.have.property('success').eq(false);
//               response.body.should.have.property('message').eq("api request limit exceeded");
//               done();
//           })
//       });
//   });

//   //get List of exercise by equipment
//   describe('GET /equipmentName/:equipment', () => {
//     let equipment="band"
  
//     // it('It Should get list of exercises by equipment', (done) => {
//     //     chai.request(app).get('/equipmentName/+equipment).end((err, response) => {
//     //         response.should.have.status(200);
//     //         response.body.should.have.property('data');
//     //         response.body.should.have.property('success').eq(true);
//     //         done();
//     //     })
//     // });
//     it('It Should give error when api call failing', (done) => {
//         let equipment="band"
//         chai.request(app).get('/equipmentName/'+equipment).end((err, response) => {
          
//             response.body.should.have.property('success').eq(false);
//             response.body.should.have.property('message').eq("api request limit exceeded");
//             done();
//         })
//     });
// });

// //get List of equipments
// describe('GET /equipments', () => {
  
  
//     // it('It Should get list of equipments', (done) => {
//     //     chai.request(app).get('/equipments).end((err, response) => {
//     //         response.should.have.status(200);
//     //         response.body.should.have.property('data');
//     //         response.body.should.have.property('success').eq(true);
//     //         done();
//     //     })
//     // });
//     it('It Should give error when api call failing', (done) => {
        
//         chai.request(app).get('/equipments').end((err, response) => {
        
           
//             response.body.should.have.property('success').eq(false);
//             response.body.should.have.property('message').eq("api request limit exceeded");
//             done();
//         })
//     });
// });

// });