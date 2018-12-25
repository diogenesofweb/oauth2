const express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  helmet = require("helmet"),
  cookieSession = require("cookie-session");

require("./config/github-strategy");
require("./config/google-strategy");
require("./config/facebook-strategy");

require("dotenv").load();
const { PORT, URI, COOKIE_KEY } = process.env;

mongoose
  .connect(
    URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoBD ready to use!"));

const app = express();

app.use(helmet());

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY]
  })
);

app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/public", express.static(__dirname + "/public"));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth-route"));
app.use("/profile", require("./routes/profile-route"));

app.get("/", (req, res) => res.render("home", { user: req.user }));

app.listen(PORT || 4000, () => console.log(`Listening on port ${PORT}`));
