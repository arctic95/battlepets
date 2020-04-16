const passport = require('passport');
const keys = require('./keys');

const BnetStrategy = require('passport-bnet').Strategy;
 
// Use the BnetStrategy within Passport.
passport.use(new BnetStrategy({
    clientID: keys.bnet.clientID,
    clientSecret: keys.bnet.clientSecret,
    callbackURL: "/auth/bnet/redirect",
    //region: "eu"
}, function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
}));
