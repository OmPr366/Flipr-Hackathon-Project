const express = require("express");
const router = express();
const passport = require("passport");

router.get('/auth/google/callback', passport.authenticate('google',
  {
    successRedirect: process.env.CLIENT_URL + "/",
    failureRedirect: process.env.CLIENT_URL + "/",
    scope: ['profile', 'email'],
  }
));

module.exports = router;