const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

const googleStrategy = new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALL_BACK_URL,
        passReqToCallback: true
    },
     (request, accessToken, refreshToken, profile, done) => {
         
        process.nextTick(function () {
            return done(null, profile);
        });
    }
);

const microsoftStrategy = new MicrosoftStrategy({
        clientID: process.env.APP_ID,
        clientSecret: process.env.APP_PASSWORD,
        callbackURL: process.env.CALL_BACK_URL,
  },
  (request, accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ userId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
);

passport.use(microsoftStrategy);
passport.use(googleStrategy);

const googleAuthenticator = passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read'
    ]
})

const microsoftAuthenticator = passport.authenticate('microsoft');

const googleCallback = passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
});

const microsoftCallback = passport.authenticate('microsoft', {
    successRedirect: '/', 
    failureRedirect: '/login'
});




module.exports = {
    passport,
    googleAuthenticator,
    googleCallback,
    microsoftCallback,
    microsoftAuthenticator,
}