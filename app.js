var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var indexRouter = require('./routes/index');
var authorize = require('./routes/authorize');
var mail = require('./routes/mail');
var exphbs = require('express-handlebars');

var hbsHelpers = exphbs.create({
  helpers: require("./helpers/handlebars.js").helpers,
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/',
  extname: '.hbs'
});

var app = express();
app.engine('.hbs', hbsHelpers.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/authorize', authorize);
app.use('/mail', mail);

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
