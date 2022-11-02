import mongoose from "mongoose";
import bcrypt from "bcryptjs";

var regex;

//admin collection
var adminSchema = new mongoose.Schema({
    uname: {
      type: String,
      required: "Name cannot be empty",
    },
    email: { 
     type: String, 
     required: "Email cannot be empty", 
     unique: true 
  },
    password: { 
     type: String, 
     required: "password cannot be empty",
     minlength:[8,'Password must have al least 8 characters']
  },
});

//Validation
adminSchema.path('email').validate((val)=>{
    regex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(val); 
  },'invalid email');
  

  adminSchema.pre("save", function (next) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        this.password = hash;
        next();
      });
    });
  });
  
  var Admin = mongoose.model("Admin", adminSchema);
  export { Admin };