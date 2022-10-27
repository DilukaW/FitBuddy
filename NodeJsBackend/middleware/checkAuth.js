import Jwt from "jsonwebtoken";
const checkAuth=(req,res,next)=>{
  try{
    const token=req.headers.authorization.split(' ')[1];
    const decode=Jwt.verify(token,"secret")
    req.userData=decode;
    next();


  }catch(error){
    res.json({success:false,message:'Auth Failed'})

  }
}

export { checkAuth }