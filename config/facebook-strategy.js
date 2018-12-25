const passport = require("passport"),
  User = require("../models/user-model"),
  FacebookStrategy = require("passport-facebook").Strategy;

require("dotenv").load();
const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = process.env;

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName", "picture.type(large)"]
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id }).then(user => {
        user
          ? done(null, user)
          : new User({
              facebookId: profile.id,
              displayName: profile.displayName,
              photos: profile.photos[0]["value"],
              username: profile.username || undefined
            })
              .save()
              .then(newUser => done(null, newUser));
      });
    }
  )
);
