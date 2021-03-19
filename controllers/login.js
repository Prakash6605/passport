// here i will configure the routes for /login
const express = require('express');
const passport = require('passport');
const route_login = express.Router();
const pool = require('../dbConnection');


route_login.get('/',(req,res)=>{
    // then i have to simply redirect the user to the login page
    // passport.authenticate('local',{
    //     successRedirect : '/profile',
    //     failureRedirect : '/login'
    // })
    res.sendFile('E:/TrainingProjects/cb/connectingToPostgres/static/login.html');
})

route_login.post('/',async (req,res)=>{
    passport.authenticate('local',{
        successRedirect : '/profile',
        failureRedirect : '/login'
    })
    console.log('comming here');
    // here i have to verify whether the user is present in the database or not
    try{
    const {email,password} = req.body;  
    console.log({email , password});  
    const user = await pool.query(`select * from users where email=$1 and password=$2`,[email,password]);
    if(user.rows[0]){
        console.log(user.rows[0]);
        res.send(`You are a Verified User , ${user.rows[0]}`);
    }
    else{
        res.send(`Email or Password incorrect pls try again <a href="/login">login</a>`);
    }
    }catch(err){
        console.log(err.message);
        throw err;
    }
})

module.exports = {route_login};