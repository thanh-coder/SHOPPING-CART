var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var  bodyParser=require("body-parser");
var expressHbs=require("express-handlebars");

const  db = require('./db');

var indexRouter = require('./routes/index');
var mongoose=require("mongoose");


var app = express();
// mongoose.connect('mongodb://localhost:27017/myapp',{ useNewUrlParser: true });
mongoose.connect(db.stringdb, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
    console.log('Lỗi kết nối đến CSDL: ' + err);
});

// var db = mongoose.connection;
//     db.once('open', function(err, resp){
//     	if(err)
//     	{
//     		console.log(err+"khong connect csdl");
//     	}
//       console.log(resp+ " connect");
//     });
// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
