var express = require("express");
var router = express.Router();

//login route for user admin

router.get("/", function(req, res){

  res.render("search");
  //res.render("index", {message: req.flash("error")});
});

module.exports = router;
