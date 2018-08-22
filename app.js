require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes');
const authorize = require('./routes/authorize');
const mail = require('./routes/mail');
const getViewEngine = require('./middleware/getViewEngine')

const app = express();

app.engine('.hbs', getViewEngine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/contact', (req,res) => res.render('contact'))
app.use('/mail', mail);
app.use('/authorize', authorize);
app.use('/', indexRouter);

module.exports = app;
