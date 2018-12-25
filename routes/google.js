const router = require("express").Router(),
  passport = require("passport");

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => res.redirect("/profile")
);

module.exports = router;
