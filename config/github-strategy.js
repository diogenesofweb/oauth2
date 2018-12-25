const passport = require("passport"),
  GitHubStrategy = require("passport-github").Strategy,
  User = require("../models/user-model");

require("dotenv").load();
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  // console.log("deserializeUser: " + id);
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile); // check profile info
      User.findOne({ githubId: profile.id }).then(user =>
        user
          ? done(null, user) // user already exist
          : new User({
              // register new user
              githubId: profile.id,
              displayName: profile.displayName,
              username: profile.username,
              photos: profile._json.avatar_url
            })
              .save()
              .then(newUser => done(null, newUser))
      );
    }
  )
);
