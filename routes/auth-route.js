const router = require("express").Router();

// login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// github auth
router.use("/github", require("./github"));

// google auth
router.use("/google", require("./google"));

// facebook auth
router.use("/facebook", require("./facebook"));

module.exports = router;
