import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

var regex;

var userSchema = new mongoose.Schema({
  uname: {
    type: String,
    required: "Name cannot be empty",
  },
  email: {
    type: String,
    required: "Email cannot be empty",
    unique: true
  },
  gender: {
    type: String,
    required: "Gender cannot be empty",
  },
  age: {
    type: Number,
    required: "Age cannot be empty",
  },
  password: {
    type: String,
    required: "password cannot be empty",
    minlength: [8, 'Password must have al least 8 characters']
  },
  image: {
    type: String
  },
  trainersId: {
    type: Array,
  }
});


//validation
userSchema.path('email').validate((val) => {
  regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(val);
}, 'invalid email');

//Events
userSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});


var User = mongoose.model("User", userSchema);

export { User };
