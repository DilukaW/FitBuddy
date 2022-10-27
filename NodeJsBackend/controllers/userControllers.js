import express from "express";
import { User } from "../models/user.js";
import passport from "passport";



import mongoose, { Types } from "mongoose";

const router = express.Router();

// create user
router.post("/register", (req, res,next) => {
  //new user
  var user = new User({
    uname: req.body.uname,
    email: req.body.email,
    password:req.body.password
  });

  //save user
  user.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      if(err.code==11000){
        res.status(422).send(['Duplicate email address found.']);
      }
      else{
        return next(err);
      }
    }
  });
});

// get all users
router.get("/register", (req, res) => {
  User.find((err, docs) => {
    if (!err) {
      let result = docs;
      res.send(result);
      console.log(result);
    } else {
      console.log(err + " Error in getting all users ");
    }
  });
});

//get user by id
router.get("/:id", (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No such user:${req.params.id}`);
  }

  User.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in retrieving user");
    }
  });
});

//update user
router.put("/:id", (req, res) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send(`No such user:${req.params.id}`);
    }
   //new user
   var user = {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  };
  User.findByIdAndUpdate(req.params.id,{$set:user}, {new:true},(err,doc)=>{
    if(!err){
        res.send(doc)
    }else{
        console.log("Error in user updating: "+err);
    }
  })

  });

  //delete user
router.delete("/:id", (req, res) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send(`No such user:${req.params.id}`);
    }
   
  User.findByIdAndRemove(req.params.id,(err,doc)=>{
    if(!err){
        res.send(doc)
    }else{
        console.log("Error in user deleting: "+err);
    }
  })

  });





export default router;
