const passport = require("passport"),
  User = require("../models/user-model"),
  GoogleStrategy = require("passport-google-oauth20").Strategy;

require("dotenv").load();
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(user => {
        user
          ? done(null, user)
          : new User({
              googleId: profile.id,
              displayName: profile.displayName,
              username: profile.name.givenName,
              photos: profile._json.image.url
            })
              .save()
              .then(newUser => done(null, newUser));
      });
    }
  )
);
