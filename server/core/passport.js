const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(id, done) {
      done(err, user);
});

passport.use(new GoogleStrategy({
        clientID : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL : `${process.env.API_HOST_URL}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done)=>{
        return done(null, {accessToken, profile});
    }
));