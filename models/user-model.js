const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  githubId: String,
  googleId: String,
  facebookId: String,
  displayName: String,
  username: String,
  photos: String,
  registrationDate: { type: Date, default: Date.now }
});

const User = mongoose.model("oauth2", userSchema);

module.exports = User;
