const express = require("express");
const router = express();

const User = require("../model/schema");

router.get("/",  (req, res) => {
  res.send("API is working");
});



module.exports = router;
