
var express = require('express');
var router = express.Router();
var passport=require("passport");
// var flash=require("connect-flash")

var Product=require("../models/product");


var csrf=require("csurf");
var csrfProtection=csrf();
router.use(csrfProtection)

router.get("/profile",isLoggedIn,function(req,res,next){
    res.render("user/profile");
    })

router.use('/',notLoggedIn,function(req,res,next){
    next();
})
router.get("/signup",function(req,res,next){
	var message=req.flash("error");
	res.render("user/signup",{csrfToken:req.csrfToken(),message:message,hasErrors:message.length>0})
})
router.post("/signup",passport.authenticate("local.signup",{
	successRedirect: '/user/profile',
	failureRedirect: '/user/signup',
    failureFlash:true
}));

router.get("/logout",isLoggedIn,function(req,res,next){
    req.logout();
    res.redirect("/");
})

router.get("/signin",function(req,res,next){
	var message=req.flash("error");
	res.render("user/signin",{csrfToken:req.csrfToken(),message:message,hasErrors:message.length>0})

})
router.post("/signin",passport.authenticate("local.signin",{
	successRedirect: '/user/profile',
	failureRedirect: '/user/signin',
    failureFlash:true
}));

module.exports = router;
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
