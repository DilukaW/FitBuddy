import mongoose from "mongoose";
var userChatSchema = new mongoose.Schema({
  senderId:{
    type:String
  },
  receiverId:{
    type:String
  },
  messages:{
    type:String
  }, 
},{timestamps:true});

var userChat = mongoose.model("userChat", userChatSchema);

var trainerChatSchema = new mongoose.Schema({
  senderId:{
    type:String
  },
  receiverId:{
    type:String
  },
  messages:{
    type:String
  },
},{timestamps:true});
var trainerChat = mongoose.model("trainerChat", trainerChatSchema);
export { userChat,trainerChat };