const router = require("express").Router();

// check if user are logged in, so allowed to see profile page
const check = (req, res, next) =>
  !req.user ? res.redirect("/auth/login") : next();

router.get("/", check, (req, res) => res.render("profile", { user: req.user }));

module.exports = router;
