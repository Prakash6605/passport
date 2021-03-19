// here i will configure routes for /register
const express = require('express');
const route_signup = express.Router();
const pool = require('../dbConnection.js');

route_signup.get('/',(req,res)=>{
    res.sendFile('E:/TrainingProjects/cb/connectingToPostgres/static/signup.html')
})
route_signup.post('/',async (req,res)=>{
    try{
        const {name,email,password} = req.body;
       const new_user = await pool.query(`insert into users(name,email,password) values($1,$2,$3)` , [name,email,password]);
       
       res.redirect('/login');
    }
    catch(err){
       console.error(err.message);
    }
})

module.exports={
    route_signup
}