import request from "supertest";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();
import { app } from '../index.js'
import { userChat, trainerChat } from "../models/chat.js";
import { checkAuth } from '../middleware/checkAuth.js'

const userSendChat = {
    senderId: "11111",
    receiverId: "22222",
    messages: "hello trainer"
}
const trainerSendChat = {
    senderId: "22222",
    receiverId: "11111",
    messages: "hello user"
}
before((done) => {
    userChat.deleteMany({}, function (err) { });
    trainerChat.deleteMany({}, function (err) { });
    done()
});
describe('Test chats endpoints', () => {

    describe("POST chats", () => {
        //add to user chat
        it("should add new chat to user chat", (done) => {
            request(app)
                .post("/chats/addUser")
                .send(userSendChat)
                .expect(200)
                .then((res) => {
                    expect(res.body.success).to.be.eql(true);
                    expect(res.body.data.senderId).to.be.eql("11111");
                    expect(res.body.data.receiverId).to.be.eql("22222");
                    expect(res.body.data.messages).to.be.eql("hello trainer");
                    done();
                })
                .catch((err) => done(err));
        });

        //add to trainer chat
        it("should add new chat to trainer chat", (done) => {
            request(app)
                .post("/chats/addTrainer")
                .send(trainerSendChat)
                .expect(200)
                .then((res) => {
                    expect(res.body.success).to.be.eql(true);
                    expect(res.body.data.senderId).to.be.eql("22222");
                    expect(res.body.data.receiverId).to.be.eql("11111");
                    expect(res.body.data.messages).to.be.eql("hello user");
                    done();
                })
                .catch((err) => done(err));
        });
    });


    describe("GET chats", () => {
        //get user chats from user chat
        it("should get user chats from user chat", (done) => {
            const senderId = "11111"
            const receiverId = "22222"
            request(app)
                .get("/chats/getUserChat/" + senderId + '/' + receiverId)
                .expect(200)
                .then((res) => {
                    expect(res.body.success).to.be.eql(true);
                    expect(res.body.data[0].messages).to.be.eql("hello trainer");
                    done();
                })
                .catch((err) => done(err));
        });

        //get trainer chats from user chat
        it("should get trainer chats from user chat", (done) => {
            const senderId = "11111"
            const receiverId = "22222"
            request(app)
                .get("/chats/getTrainerChat/" + senderId + '/' + receiverId)
                .expect(200)
                .then((res) => {
                    expect(res.body.success).to.be.eql(true);
                    done();
                })
                .catch((err) => done(err));
        });

        //get trainer chats from trainer chat
        it("should get trainer chats from trainer chat", (done) => {
            const receiverId = "11111"
            const senderId = "22222"
            request(app)
                .get("/chats/getTChat/" + senderId + '/' + receiverId)
                .expect(200)
                .then((res) => {
                    expect(res.body.success).to.be.eql(true);
                    expect(res.body.data[0].messages).to.be.eql("hello user");
                    done();
                })
                .catch((err) => done(err));
        });

        //get user chats from trainer chat
        it("should get user chats from trainer chat", (done) => {
            const receiverId = "11111"
            const senderId = "22222"
            request(app)
                .get("/chats/getUChat/" + senderId + '/' + receiverId)
                .expect(200)
                .then((res) => {
                    expect(res.body.success).to.be.eql(true);
                    done();
                })
                .catch((err) => done(err));
        });
    });

});