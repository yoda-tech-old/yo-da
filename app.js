require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const indexRoute = require('./routes');
const authorize = require('./routes/authorize');
const mail = require('./routes/mail');
const getViewEngine = require('./middleware/getViewEngine')
const getPassportHelpers = require('./middleware/getPassportHelpers')
const { passport, googleAuthenticator, googleCallback, microsoftCallback, microsoftAuthenticator } = getPassportHelpers

const app = express();

app.engine('.hbs', getViewEngine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', googleAuthenticator);
app.get('/auth/microsoft', microsoftAuthenticator);
app.get('/auth/google/callback', googleCallback);
app.get('/auth/microsoft/callback', microsoftCallback);

app.get('/contact', (req, res) => (res.render('contact'), {user: req.user}))
app.get('/mail', ensureAuthenticated, (req, res) => (res.render('mail'), {user: req.user}))
app.get('/', (req, res) => (res.render('index'), {user: req.user}))

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }

//app.use('/mail', mail);
app.use('/authorize', authorize);
app.use('/', indexRoute);

module.exports = app;