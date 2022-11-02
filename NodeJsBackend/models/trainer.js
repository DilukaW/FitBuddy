import mongoose from "mongoose";
import bcrypt from "bcryptjs";

var regex;

//admin collection
var trainerSchema = new mongoose.Schema({
    uname: {
      type: String,
      required: "Name cannot be empty",
    },
    email: { 
     type: String, 
     required: "Email cannot be empty", 
     unique: true 
  },
    area:{
        type: String,
        required: "Area cannot be empty", 
    },
    description:{
        type: String,
        required: "Description cannot be empty", 
    },
    password: { 
     type: String, 
     required: "password cannot be empty",
     minlength:[8,'Password must have al least 8 characters']
  },
});

//Validation
trainerSchema.path('email').validate((val)=>{
    regex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(val); 
  },'invalid email');
  

  trainerSchema.pre("save", function (next) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        this.password = hash;
        next();
      });
    });
  });
  
  var Trainer = mongoose.model("Trainer", trainerSchema);
  export { Trainer };