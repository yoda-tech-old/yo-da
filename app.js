require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;


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
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
} = process.env


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});


passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,

        callbackURL: "https://quiet-savannah-59105.herokuapp.com/",
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {

        process.nextTick(function () {

            return done(null, profile);
        });
    }
));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read'
    ]
}));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

app.get('/contact', (req, res) => res.render('contact'))
app.use('/mail', mail);
app.use('/authorize', authorize);
app.use('/', indexRouter);

module.exports = app;