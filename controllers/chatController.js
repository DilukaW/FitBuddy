import express from "express";
import { userChat,trainerChat } from "../models/chat.js";

import mongoose, { Types } from "mongoose";


const router = express.Router();

//add to user chat
router.post("/addUser", (req, res, next) => {
    //new user
    const io=req.app.get('io');
    var chat = new userChat({
      senderId:req.body.senderId,
      receiverId:req.body.receiverId,
      messages:req.body.messages
      
    });
  
    //save
    chat.save((err, doc) => {
        if (!err) {
          
          res.json({success:true,data:doc});
        } else {
          res.json({success:false,message:"Error Sending message"});
        }
      });

});

//get user chats from user chat
router.get("/getUserChat/:sid/:rid",(req,res)=>{
  const senderId=req.params.sid;
  const receiverId=req.params.rid;
  userChat.find({senderId:senderId,receiverId:receiverId})
  .exec().then((result)=>{

    res.json({success:true,data:result});

  }).catch(err=>{
    res.json({success:false,message:"server error"});
  })
});

//get trainer chats from user chat
router.get("/getTrainerChat/:sid/:rid",(req,res)=>{
  const senderId=req.params.sid;
  const receiverId=req.params.rid;
  userChat.find({senderId:receiverId,receiverId:senderId})
  .exec().then((result)=>{

    res.json({success:true,data:result});

  }).catch(err=>{
    res.json({success:false,message:"server error"});
  })
});


//add to trainer chat
router.post("/addTrainer", (req, res, next) => {
  //new user
  const io=req.app.get('io');
  var chat = new trainerChat({
    senderId:req.body.senderId,
    receiverId:req.body.receiverId,
    messages:req.body.messages
    
  });

  //save trainer
  chat.save((err, doc) => {
      if (!err) {
        
        res.json({success:true,data:doc});
      } else {
        res.json({success:false,message:"Error Sending message"});
      }
    });

});

//get trainer chats from trainer chat
router.get("/getTChat/:sid/:rid",(req,res)=>{
  const senderId=req.params.sid;
  const receiverId=req.params.rid;
  trainerChat.find({senderId:senderId,receiverId:receiverId})
  .exec().then((result)=>{

    res.json({success:true,data:result});

  }).catch(err=>{
    res.json({success:false,message:"server error"});
  })
});

//get user chats from trainer chat
router.get("/getUChat/:sid/:rid",(req,res)=>{
  const senderId=req.params.sid;
  const receiverId=req.params.rid;
  trainerChat.find({senderId:receiverId,receiverId:senderId})
  .exec().then((result)=>{

    res.json({success:true,data:result});

  }).catch(err=>{
    res.json({success:false,message:"server error"});
  })
});

export default router;