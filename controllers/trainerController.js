import express from "express";
import { Trainer } from "../models/trainer.js";
import passport from "passport";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { checkAuth } from "../middleware/checkAuth.js";
import multer from "multer";

import mongoose, { Types } from "mongoose";
const upload = multer({ dest: 'image' })

const router = express.Router();

// create trainer
router.post("/register", (req, res, next) => {

  //new user
  var trainer = new Trainer({
    uname: req.body.uname,
    email: req.body.email,
    area: req.body.area,
    description: req.body.description,
    password: req.body.password,

  });

  //save trainer
  trainer.save((err, doc) => {
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

//login trainer
router.post("/login", (req, res) => {

  Trainer.find({ email: req.body.email }).exec().then((result) => {
    if (result.length < 1) {
      return res.status(201).json({ success: false, message: "Trainer not found" });
    }
    const trainer = result[0];
    bcrypt.compare(req.body.password, trainer.password, (err, ret) => {

      if (ret) {
        const payload = {
          trainerId: trainer._id
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

//login trainer profile
router.get("/profile", checkAuth, (req, res) => {

  const trainerId = req.userData.trainerId;
  Trainer.findById(trainerId)
    .exec().then((result) => {
      res.status(200).json({ success: true, data: result });
    }).catch(err => {
      res.json({ success: false, message: "server error" });
    })
});

// get all trainers
router.get("/all", (req, res) => {

  Trainer.find().exec().then((result) => {
    if (result.length < 1) {
      return res.json({ success: false, message: "Trainers not found" });
    }
    else {
      res.status(200).json({ success: true, data: result });
      //console.log(result);
    }
  }).catch(err => {
    res.json({ success: false, message: "server error" });
  })
});

//get trainer by id
router.get("/:id", (req, res) => {

  Trainer.findById(req.params.id).exec().then((result) => {
    if (result.length < 1) {
      return res.status(200).json({ success: false, message: "User not found" });
    }
    else {
      res.status(200).json({ success: true, data: result });
    }
  }).catch(err => {
    res.status(404).json({ success: false, message: "server error" });

  });
});


//update trainer
router.put("/:id", upload.single('file'), (req, res) => {

  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(201).json({ success: false, message: "Trainer not found" });
  }

  var trainer = {
    uname: req.body.uname,
    email: req.body.email,
    area: req.body.area,
    description: req.body.description,
    image: req.body.file,

  };

  Trainer.findByIdAndUpdate(req.params.id, { $set: trainer }, { new: true }, (err, doc) => {
    if (!err) {
      res.status(200).json({ success: true, data: doc });
    } else {
      return res.json({ success: false, message: "Duplicate Email" });
    }
  }
  );
});

//add trainees
router.put("/trainees/:id", (req, res) => {

  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.json({ success: false, message: "Trainer not found" });
  }

  Trainer.updateOne({ _id: req.params.id }, { $push: { traineesId: req.body.traineesId } }, (err, doc) => {
    if (!err) {

      Trainer.findById(req.params.id).exec().then((result) => {
        if (result.length < 1) {
          return res.status(200).json({ success: false, message: "Trainer not found" });
        }
        else {
          res.status(200).json({ success: true, data: result });
        }
      }).catch(err => {
        res.json({ success: false, message: "server error" });
      });
    } else {
      return res.json({ success: false, message: err });
    }
  });
});

//delete trainer
router.delete("/:id", (req, res) => {
  
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.json({ success: false, message: "Trainer not found" });
  }

  Trainer.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.status(200).json({ success: true, data: doc });
    } else {
      return res.status(200).json({ success: false, message: "Trainer not found" });
    }
  });
});

export default router;