const passport = require('passport');
const localStratergy = require('passport-local').Strategy;
const pool = require('./dbConnection');
// passport.use is a middleware
passport.use(new localStratergy(
    async function(email,password,done ){
        try{
            console.log( '  in the passport.js file ' , email , password);
            const user = await pool.query('select * from users where email=$1 and password=$2',[email,password]);
            if(user.rows.length > 0 ){
                return done(null,user.rows[0]);
            }
            else{
                // user not found
                return done(null,false,{message:'Incorrect email or password'});
            }
        }
        catch(err){
             return done(err);
        }
    }
))

passport.serializeUser(
    function(user,done){
        done(null,user.user_id);
    }
)

passport.deserializeUser(
    async function(userId,done){
      try{  
       const user = await pool.query('select * from users where user_id=$1',[userId]);
       if(user.rows.length > 0 ){
           done(null,user.rows[0]);
       }
       else done(null,false);
      }catch(err){
          done(err)
      }
    }
)

module.exports={
    passport
}