import mongoose from 'mongoose';

const connectDb = (async () => {
    try {
        //connect to mongoDb
        if (process.env.NODE_ENV === "development") {
            const con = await mongoose.connect(process.env.MONGO_URI);
            console.log(`mongodbdev connected:${con}`);
        }
        else {
            const con = await mongoose.connect("mongodb+srv://admin:admin123456@cluster0.acrd108.mongodb.net/TEST?retryWrites=true&w=majority");
            console.log(`mongodbtest connected:${con}`);
        }
    } catch (err) {
        console.log(err)
        process.exit(1);
    }
})

const close = (() => {
    mongoose.disconnect()
})

export { connectDb, close }