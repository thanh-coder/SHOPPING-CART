var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var User=require("../models/user");

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
   User.findById(id).then(function (user) {
        done(null, user);
    }).catch(function (err) {
        console.log(err);
    })
});
passport.use("local.signup",new LocalStrategy({
    usernameField:"email",
    passwordField:"password",
    passReqToCallback:true},
    function (req,email,password,done) {
        req.checkBody('email','invalid email').notEmpty().isEmail();
        req.checkBody('email','invalid password').notEmpty().isLength({min:4});
        var errors=req.validationErrors();
        if(errors){
            var messages=[];
            errors.forEach(function(error){
                messages.push(error.msg);
            })
            return done(null,false,req.flash("error",messages))
        }
       User.findOne({"email":email},
            function (err,user) {
                if (err) { return done(err); }
                if(user) {
                    return done(null, false, { message: 'user is already' });
                }
                
                var newUser=new User();
                newUser.email=email;
                newUser.password=newUser.encryptPassword(password);
                newUser.save(function(err,result){
                    if(err){
                        return done(err);
                    }
                return done(null, user);
            })
        })
    }
)
)
passport.use("local.signin",new LocalStrategy({
    usernameField:"email",
    passwordField:"password",
    passReqToCallback:true},
    function (req,email,password,done) {
        req.checkBody('email','invalid email').notEmpty().isEmail();
        req.checkBody('email','invalid password').notEmpty();
        var errors=req.validationErrors();
        if(errors){
            var messages=[];
            errors.forEach(function(error){
                messages.push(error.msg);
            })
            return done(null,false,req.flash("error",messages))
        }
        User.findOne({"email":email},
             function (err,user) {
                 if (err) { return done(err); }
                 if(!user) {
                     return done(null, false, { message: ' no user found' });
                 }
                 if(!user.validPassword(password)){
                    return done(null, false, { message: 'wrong password' });
                    
                 }
                
                 return done(null, user);
             })
         })
     
 )
 
