import * as http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import passport from 'passport';


import  apiRoutes  from './controllers/apiControllers.js';
import userRoutes from './controllers/userControllers.js';
import { connectDb } from './database/connection.js';

import cors from 'cors';


var app=express();
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:4200'}));


//initializing the database connection
connectDb();

//routes
app.use('/',apiRoutes);
app.use('/users/',userRoutes);

//error handler
app.use((err,req,res,next)=>{
    if(err.name=== 'ValidationError'){
        var Errors=[];
        Object.keys(err.errors).forEach(key=>Errors.push(err.errors[key].message));
        res.status(422).send(Errors)

    }

});

//start server
app.listen(3000,()=>console.log('started at port:3000'));


