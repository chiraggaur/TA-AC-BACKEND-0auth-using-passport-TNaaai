var express = require("express");
var router = express.Router();
var passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// failure
router.get("/failure", function (req, res, next) {
  // res.redirect("failure"); // we can also render data using view succes/ failure ejs page
  res.send("failed");
});
// success
router.get("/success", function (req, res, next) {
  // res.redirect("success");
  res.send("success");
});
// get request to server
router.get("/auth/github", passport.authenticate("github"));

// req sent back from server on below route
router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/failure",
    // session: false,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    res.redirect("/success");
  }
);

module.exports = router;
