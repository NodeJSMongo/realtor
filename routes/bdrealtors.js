var express = require("express");
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

//login route for user admin

router.get("/bdrealtors", function(req, res){

  var noMatch = null;

    MongoClient.connect('mongodb://mls_app:543TWOone@ds035693.mlab.com:35693/mls', { useNewUrlParser: true }, function(err, client){
    if (err) throw err
     var db = client.db('mls')
     db.collection('users').find().toArray(function (err, result) {
       if (err) throw err
       if(result.length < 1){
         var noMatch = "You must select a search criteria to a filtered listing. Please try again";
       }
       res.render("bdrealtors", {users: result , noMatch: noMatch});
     })
  })

});


module.exports = router;
