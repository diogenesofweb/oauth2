const router = require("express").Router(),
  passport = require("passport");

router.get("/", passport.authenticate("facebook"));

router.get(
  "/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => res.redirect("/profile")
);

module.exports = router;
