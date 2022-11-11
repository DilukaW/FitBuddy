import * as http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import passport from 'passport';


import  apiRoutes  from './controllers/apiControllers.js';
import userRoutes from './controllers/userControllers.js';
import adminRoutes from './controllers/adminController.js';
import trainerRoutes from './controllers/trainerController.js';
import { connectDb } from './database/connection.js';

import cors from 'cors';

const port=process.env.PORT|| 3000

var app=express();
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:4200'}));


//initializing the database connection
connectDb();

//routes
app.use('/',apiRoutes);
app.use('/users/',userRoutes);
app.use('/admin/',adminRoutes);
app.use('/trainer/',trainerRoutes);

//error handler
app.use((err,req,res,next)=>{
    if(err.name=== 'ValidationError'){
        var Errors=[];
        Object.keys(err.errors).forEach(key=>Errors.push(err.errors[key].message));
        res.status(422).send(Errors)

    }

});

//start server
app.listen(port,()=>console.log('started at port:'+port));


