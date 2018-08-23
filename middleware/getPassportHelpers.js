const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;

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
         console.log('passport callback function fired for Google')
         console.log(profile)
        process.nextTick(function () {
            return done(null, profile);
        });
    }
)

passport.use(googleStrategy);

const authenticator = passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read'
    ]
})

const callback = passport.authenticate('google', {
    successRedirect: '/contact',
    failureRedirect: '/contact'
})

module.exports = {
    passport,
    authenticator,
    callback
}