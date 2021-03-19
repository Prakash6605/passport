const express = require('express');
const app = express();
const pool = require('./dbConnection');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
// routes

// get all the users
app.get('/users',async function(req,res){
    try{
       const all_users = await pool.query('select * from users');
       console.log(all_users.rows);
       // sending all the users to the client side.
       res.send(all_users.rows);
    }catch(err){
        console.log(err.message);
    }
})
// get a user
app.get('/user/:id',async function(req,res){
    const {id} = req.params;
  try{
    const user = await pool.query('select * from users where id=$1' , [id]);
    console.log(user.rows[0]);
    res.send(user.rows);
  }
  catch(err){
      console.log(err.message);
  }
})

// create a user
app.post('/user',async function(req,res){
    try{
       // all the data will be in req.body
       const {name,email,password} = req.body;
       const new_user = await pool.query(`insert into users(name,email,password) values($1,$2,$3) returning *`,[name,email,password]);
       // returning * works with insert,update, delete kuki select me toh khud hi return krta hai rows
       console.log(new_user.rows[0]);
       res.send(new_user.rows[0]);

    }catch(err){
        console.log(err.message);
    }
})
// update a user
app.put('/user/:id',async function(req,res){
    try{
       const {id} = req.params;
       const {password} = req.body; 
       const updated_user = await pool.query('update users set password=$1 where id=$2 returning *',[password,id]);
       console.log(updated_user.rows[0]);
       res.send(updated_user.rows);
    }
    catch(err){
        console.log(err.message);
        res.send(err.message);
    }
})
// delete a user
app.delete('/user/:id',async function(req,res){
    try{
        const {id} = req.params;
        const deleted_user = await pool.query('delete from users where id=$1 returning *',[id]);
        console.log(deleted_user.rows[0]);
        res.send(deleted_user.rows[0]);
    }catch(err){
        res.send(err.message);
    }
})

app.listen(5000,function(){
    console.log('http://localhost:5000');
})