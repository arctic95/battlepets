const passport = require('passport');

const BnetStrategy = require('passport-bnet').Strategy;
 
// Use the BnetStrategy within Passport.
passport.use(new BnetStrategy({
    clientID: process.env.BNET_CLIENT_ID,
    clientSecret: process.env.BNET_CLIENT_SECRET,
    callbackURL: "/auth/bnet/redirect",
    //region: "eu"
}, function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
}));
