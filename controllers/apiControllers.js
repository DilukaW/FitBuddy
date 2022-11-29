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
            //console.log(response.data);
    
        }catch{
            res.json({success:false,message:"api request limit exceeded"});
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
            //console.log(response.data);
        }catch{
            res.json({success:false,message:"api request limit exceeded"});
        }
        
    })();
});

//get exercise by exercise id
router.get('/exerciseId/:id',(req,res)=>{
    console.log("/ called"); 
    (async()=>{
        try{
            
            const response=await axios.get('https://exercisedb.p.rapidapi.com/exercises/exercise/'+req.params.id,options);
            res.json({success:true,data:response.data});
            //console.log(response.data);
        }catch{
            res.json({success:false,message:"api request limit exceeded"});
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
            res.json({success:true,data:response.data});
            //console.log(response.data);
        }catch{
            res.json({success:false,message:"api request limit exceeded"});
        }
        
    })();
});

//get list of target mussels
router.get('/targetMussels',(req,res)=>{
    console.log("/ called"); 
    (async()=>{
        try{
            
            const response=await axios.get('https://exercisedb.p.rapidapi.com/exercises/targetList',options);
            res.json({success:true,data:response.data});
            //console.log(response.data);
        }catch{
            res.json({success:false,message:"api request limit exceeded"});
        }
        
    })();
});

//get list of exercises by target mussel
router.get('/targetMussel/:mussel',(req,res)=>{
    console.log("/ called"); 
    (async()=>{
        try{
            let mussel="abs";
            const response=await axios.get('https://exercisedb.p.rapidapi.com/exercises/target/'+req.params.mussel,options);
            res.json({success:true,data:response.data});
            //console.log(response.data);
        }catch{
            res.json({success:false,message:"api request limit exceeded"});
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
            //console.log(response.data);
    
        }catch{
            res.json({success:false,message:"api request limit exceeded"});
        }
        
    })();
});

//get List of exercise by equipment
router.get('/equipmentName/:equipment',(req,res)=>{
    console.log("/ called"); 
    (async()=>{
        try{
            let equipment="band"
            const response=await axios.get('https://exercisedb.p.rapidapi.com/exercises/equipment/'+req.params.equipment,options);
            res.json({success:true,data:response.data});
            //console.log(response.data);
    
        }catch{
            res.json({success:false,message:"api request limit exceeded"});
        }
        
    })();
});

//get List of equipments
router.get('/equipments',(req,res)=>{
    console.log("/ called"); 
    (async()=>{
        try{
            const response=await axios.get('https://exercisedb.p.rapidapi.com/exercises/equipmentList',options);
            res.json({success:true,data:response.data});
            //console.log(response.data);
        }catch{
            res.json({success:false,message:"api request limit exceeded"});
        }
        
    })();
});





export default router;
