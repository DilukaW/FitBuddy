import mongoose from 'mongoose';

const connectDb=(async()=>{
    try{
        //connect to mongoDb
        const con=await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected:${con}`);

    }catch(err){

        console.log(err)
        process.exit(1);
    }

})



export {connectDb}