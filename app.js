var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var expressHbs = require("express-handlebars");
var session=require("express-session")
var passport=require("passport");
var flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);

var validator=require("express-validator")
const db = require('./db');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var mongoose = require("mongoose");


var app = express();

mongoose.connect('mongodb://localhost/shopping',{ useNewUrlParser: true });
// mongoose.connect(db.stringdb, { useNewUrlParser: true });
// mongoose.connect("mongodb://shopping:123456@127.0.0.1:27017/shopping", { useNewUrlParser: true });

mongoose.connection.on('error', (err) => {
    console.log('Lỗi kết nối đến CSDL: ' + err);
});

require("./config/passport");

app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:"mysuper",
    resave:false,
    saveUninitialized:false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie:{maxAge:180*60*1000}
 } ))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
    res.locals.login=req.isAuthenticated();
    res.locals.session=req.session;
    next();
}
)

app.use('/user', userRouter);
app.use('/', indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;