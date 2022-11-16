import express from 'express';
import axios  from "axios";

import { options } from '../utils/fetchApiData.js';
const router=express.Router();

 
  //get List of bodyparts
  
router.get('/bodyPartList',(req,res)=>{
    console.log("/ called"); 
    (async()=>{
        try{
            const response=await axios.get('https://exercisedb.p.rapidapi.com/exercises/bodyPartList',options);
            res.json({success:true,data:response.data});
            console.log(response.data);
    
        }catch{
            console.log(error);
        }
        
    })();
});

//get List of exercises by bodyPart
router.get('/part/:part',(req,res)=>{
    console.log("/ called"); 
    (async()=>{
        try{
            let part="chest";
            const response=await axios.get('https://exercisedb.p.rapidapi.com/exercises/bodyPart/'+req.params.part,options);
            res.json({success:true,data:response.data});
            console.log(response.data);
        }catch{
            res.json({success:false,message:"Server Error"});
        }
        
    })();
});

//get exercise by exercise id
router.get('/exerciseId',(req,res)=>{
    console.log("/ called"); 
    (async()=>{
        try{
            let id="0001";
            const response=await axios.get('https://exercisedb.p.rapidapi.com/exercises/exercise/'+id,options);
            console.log(response.data);
    
            res.send(response.data);
        }catch{
            console.log(error);
        }
        
    })();
});

//get exercise by exercise name
router.get('/exerciseName',(req,res)=>{
    console.log("/ called"); 
    (async()=>{
        try{
            let name="assisted lying calves stretch";
            const response=await axios.get('https://exercisedb.p.rapidapi.com/exercises/name/'+name,options);
            console.log(response.data);
    
            res.send(response.data);
        }catch{
            console.log(error);
        }
        
    })();
});

//get list of target mussels
router.get('/targetMussels',(req,res)=>{
    console.log("/ called"); 
    (async()=>{
        try{
            
            const response=await axios.get('https://exercisedb.p.rapidapi.com/exercises/targetList',options);
            console.log(response.data);
    
            res.send(response.data);
        }catch{
            console.log(error);
        }
        
    })();
});

//get list of exercises by target mussel
router.get('/targetMussel',(req,res)=>{
    console.log("/ called"); 
    (async()=>{
        try{
            let mussel="abs";
            const response=await axios.get('https://exercisedb.p.rapidapi.com/exercises/target/'+mussel,options);
            console.log(response.data);
    
            res.send(response.data);
        }catch{
            console.log(error);
        }
        
    })();
});

//get List of exercises
router.get('/exercises',(req,res)=>{
    console.log("/ called"); 
    (async()=>{
        try{
            const response=await axios.get('https://exercisedb.p.rapidapi.com/exercises',options);
          res.json({success:true,data:response.data});
            console.log(response.data);
    
        }catch{
            console.log(error);
        }
        
    })();
});

//get List of exercise by equipment
router.get('/equipmentName',(req,res)=>{
    console.log("/ called"); 
    (async()=>{
        try{
            let equipment="band"
            const response=await axios.get('https://exercisedb.p.rapidapi.com/exercises/equipment/'+equipment,options);
            console.log(response.data);
    
            res.send(response.data);
        }catch{
            console.log(error);
        }
        
    })();
});

//get List of equipments
router.get('/equipments',(req,res)=>{
    console.log("/ called"); 
    (async()=>{
        try{
            const response=await axios.get('https://exercisedb.p.rapidapi.com/exercises/equipmentList',options);
            console.log(response.data);
    
            res.send(response.data);
        }catch{
            console.log(error);
        }
        
    })();
});





export default router;
