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

router.get('/auth/username/callback', passport.authenticate('local',
  {
    successRedirect: process.env.CLIENT_URL + "/",
    failureRedirect: process.env.CLIENT_URL + "/",
  }
));

router.get('/auth/user', (req, res) => {
  // console.log(req.user);
  // console.log(req.session);
  res.send(req.user)
})

router.get('/auth/logout', (req, res) => {
  req.logout(function (err) {
    if (err)
      return console.log(err);
  });
})

module.exports = router;