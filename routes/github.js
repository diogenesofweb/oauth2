const router = require("express").Router(),
  passport = require("passport");

// start auth
router.get("/", passport.authenticate("github"));

// redirect from github
router.get(
  "/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    //console.log("redirect from github");
    res.redirect("/profile");
  }
);

module.exports = router;
