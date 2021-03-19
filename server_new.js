const express = require('express');
const app = express();
const pool = require('./dbConnection');
const {route_login} = require('./controllers/login');
const {route_signup} = require('./controllers/signup');
const {passport} = require('./passport');
const session = require('express-session');



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret : 'secret string',
    resave : false, //changes honge tb hi save hogi else nhi hogi
    saveUninitialized : true // cookie ki requirement ho ya na ho save kr deyta tha
}))

app.use(passport.initialize());
app.use(passport.session());


// routes
app.get('/profile' , (req,res)=>{
    res.sendFile('E:/TrainingProjects/cb/connectingToPostgres/static/profile.html');
})
app.use('/login' , route_login);
app.use('/register' , route_signup);

app.listen(5000,function(){
    console.log('http://localhost:5000');
})