import express from "express";
import { User } from "../models/user.js";
import passport from "passport";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { checkAuth } from "../middleware/checkAuth.js";
import multer from 'multer';
import mongoose, { Types } from "mongoose";

const upload=multer({dest:'image'})

const router = express.Router();

// create user
router.post("/register",async  (req, res, next) => {
  //new user
  var user = new User({
    uname: req.body.uname,
    email: req.body.email,
    gender:req.body.gender,
    age:req.body.age,
    password: req.body.password,
  });

  //save user

  user.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      if (err.code == 11000) {
        res.status(422).send(["Duplicate email address found."]);
      } else {
        return next(err);
      }
    }
  });
});

//login user
router.post("/login", (req, res) => {
  User.find({ email:req.body.email }).exec().then((result)=>{
    if(result.length<1){
      
     return res.json({success:false,message:"User not found"});
     
    }
    const user=result[0];
    bcrypt.compare(req.body.password,user.password,(err,ret)=>{
     
      if(ret){
        const payload={
          userId:user._id
        }
        const token= jwt.sign(payload,"secret");
        return res.json({success:true,message:"Login Successful", token:token});
      }
      else{
        
        return res.json({success:false,message:"Password do not matched"});
      }

    });

  }).catch(err=>{
    res.json({success:false,message:'Login Failed'});
  });
});


//login user profile
router.get("/profile",checkAuth,(req,res)=>{
  const userId=req.userData.userId;
  User.findById(userId)
  .exec().then((result)=>{

    res.json({success:true,data:result});
    console.log(result)

  }).catch(err=>{
    res.json({success:false,message:"server error"});
  })
});

// get all users
router.get("/all", (req, res) => {
 User.find().exec().then((result)=>{
  if(result.length<1){
    return res.json({success:false,message:"Users not found"});
   }
   else{
    res.status(200).json({success:true,data:result});

   }
 }).catch(err=>{
  res.json({success:false,message:"server error"});
 })
});

// // get all users
// router.get("/register", (req, res) => {
//   User.find((err, docs) => {
//     if (!err) {
//       let result = docs;
//       res.send(result);
//       console.log(result);
//     } else {
//       console.log(err + " Error in getting all users ");
//     }
//   });
// });

//get user by id
router.get("/:id", (req, res) => {
 
  User.findById(req.params.id).exec().then((result) => {
    if(result.length<1){
      
      return res.json({success:false,message:"User not found"});
      
     }
     else{
      res.json({success:true,data:result});
      console.log(result)
  
     }
   }).catch(err=>{
    res.json({success:false,message:"server error"});

  });
});

//update user and add profile with multer
router.put("/:id", upload.single('file'),(req, res) => {
  
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.json({success:false,message:"User not found"});
  }
  //new user
  var user = {
    uname: req.body.uname,
    email: req.body.email,
    gender:req.body.gender,
    age:req.body.age,
    image:req.body.file
  };
  User.findByIdAndUpdate(req.params.id,{ $set: user },{ new: true },(err, doc) => {
      if (!err) {
        res.json({success:true,data:doc});
       
      } else {
        return res.json({success:false,message:"Duplicate Email"});
      }
    }
  );
});

router.put("/trainers/:id", (req, res) => {
  
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.json({success:false,message:"User not found"});
  }

  User.updateOne({_id:req.params.id},{ $push:{trainersId:req.body.trainersId }}
  ,(err, doc) => {
      if (!err) {
        
        User.findById(req.params.id).exec().then((result) => {
          if(result.length<1){
            
            return res.json({success:false,message:"User not found"});
            
           }
           else{
            res.json({success:true,data:result});
        
           }
         }).catch(err=>{
          res.json({success:false,message:"server error"});
      
        });
      } 
      else{
        return res.json({success:false,message:"User all ready enrolled"});
      }
    }
  );
});

//delete user
router.delete("/:id", (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.json({success:false,message:"User not found"});
  }

  User.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.json({success:true,data:doc});
    } else {
      return res.json({success:false,message:"User not found"});
    }
  });
});

export default router;
