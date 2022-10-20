import * as http from 'http';
import bodyParser from 'body-parser';
import express from 'express';

import  apiRoutes  from './controllers/apiControllers.js';
import userRoutes from './controllers/userControllers.js';
import { connectDb } from './database/connection.js';
import cors from 'cors';






var app=express();
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:4200'}));

app.listen(3000,()=>console.log('started at port:3000'));

connectDb();

app.use('/',apiRoutes);
app.use('/users',userRoutes);




