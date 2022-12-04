import express from "express";
import { Admin } from "../models/admin.js";
import passport from "passport";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { checkAuth } from "../middleware/checkAuth.js";
import mongoose, { Types } from "mongoose";
import { app } from "../index.js";

const router = express.Router();

// create admin
router.post("/register", (req, res, next) => {
  //new user
  var admin = new Admin({
    uname: req.body.uname,
    email: req.body.email,
    password: req.body.password,
  });

  //save admin
  admin.save((err, doc) => {
    if (!err) {
      return res.status(200).json({ success: true, data: doc });
    } else {
      if (err.code == 11000) {
        res.status(422).send(["Duplicate email address found."]);
      } else {
        return next(err);
      }
    }
  });
});

//login admin
router.post("/login", (req, res) => {

  Admin.find({ email: req.body.email }).exec().then((result) => {
    if (result.length < 1) {
      return res.status(201).json({ success: false, message: "Admin user not found" });
    }
    const admin = result[0];
    bcrypt.compare(req.body.password, admin.password, (err, ret) => {

      if (ret) {
        const payload = {
          adminId: admin._id
        }
        const token = jwt.sign(payload, "secret");
        return res.status(200).json({ success: true, message: "Login Successful", token: token });
      }
      else {
        return res.status(201).json({ success: false, message: "Password do not matched" });
      }

    });
  }).catch(err => {
    res.json({ success: false, message: 'Login Failed' });
  });
});

//login admin profile
router.get("/profile", checkAuth, (req, res) => {
  
  const adminId = req.userData.adminId;
  //console.log(adminId)
  Admin.findById(adminId)
    .exec().then((result) => {
      res.status(200).json({ success: true, data: result });
    }).catch(err => {
      res.json({ success: false, message: "server error" });
    })
});


export default router;