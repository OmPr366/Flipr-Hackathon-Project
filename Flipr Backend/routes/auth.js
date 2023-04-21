const express = require("express");
const router = express();


router.get("/",  (req, res) => {
  res.send("API is working");
});



module.exports = router;
