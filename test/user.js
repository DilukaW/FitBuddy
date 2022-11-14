import assert from 'assert'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { response } from 'express';
import {app} from '../index.js'

chai.use(chaiHttp);



describe('test user api endpoints',function(){
    it('GET all users',function(done){
       chai.request(app)
       .get("/user/all")
       .end((err,response)=>{
        chai.expect(response.status).to.be.equal(200)
        
        done();
       })
    })
})