import mongoose from "mongoose";


// user model
var User=mongoose.model('UserDb',{
   name:{ type: String }, 
   age:{ type: Number } ,
   email:{ type: String }

});


export { User };