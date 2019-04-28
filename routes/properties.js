var express = require("express");
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

//login route for user admin

router.get("/properties", function(req, res){

  var minprice = parseInt(req.query.minprice);
  var maxprice = parseInt(req.query.maxprice);

  var finalQuery = {};
  var noMatch = null;

  var areaQuery = req.query.area;
  var proQuery = req.query.propertyclass;
  var saleQuery = req.query.sale;
  var statusQuery = req.query.status;
  var roomQuery = req.query.bedroom;
  var squareFt = req.query.measurement;
  var outerDesign = req.query.level;
  var propertyType = req.query.exteriortype;
  var lastStatus = req.query.laststatus;


  if(req.query.propertyclass ){
    finalQuery.propertyclass = req.query.propertyclass;
  }

  if(req.query.status){
    finalQuery.status = req.query.status;
  }

  if(req.query.sale){
    finalQuery.sale = req.query.sale;
  }

  if(req.query.area){
    finalQuery.area = req.query.area;
  }

  if(req.query.bedroom){
    finalQuery.bedroom = req.query.bedroom;
  }
  if(req.query.measurement){
    finalQuery.measurement = req.query.measurement;
  }
  if(req.query.level){
    finalQuery.level = req.query.level;
  }
  if(req.query.exteriortype){
    finalQuery.exteriortype = req.query.exteriortype;
  }
  if(req.query.laststatus){
    finalQuery.laststatus = req.query.laststatus;
  }

  if(proQuery || areaQuery || saleQuery || statusQuery ||
    roomQuery || squareFt || outerDesign || propertyType || lastStatus){

     MongoClient.connect('mongodb://mls_app:543TWOone@ds035693.mlab.com:35693/mls', { useNewUrlParser: true }, function(err, client){
     if (err){
       console.log(err);
     }else{
       var db = client.db('mls')
        var filter = db.collection('listings').find(finalQuery).toArray(function (err, result) {
         if (err){
           console.log(err);
         }else{
           if(result.length < 1){
             var noMatch = "You must select a search criteria to get a filtered listing. Please try again";
           }else if(minprice && maxprice){
               MongoClient.connect('mongodb://mls_app:543TWOone@ds035693.mlab.com:35693/mls', { useNewUrlParser: true }, function(err, client){
               if (err) throw err
                var db = client.db('mls')
                db.collection('listings').find({listprice: { $gte: minprice, $lte: maxprice }}).toArray(function (err, result) {
                  if (err){
                    console.log(err);
                  }else{
                    if(result.length < 1){
                      var noMatch = "You must select a search criteria to get a filtered listing. Please try again";
                    }
                    res.render("properties", {properties: result , noMatch: noMatch});
                  }
                })
             })
           }
            res.render("properties", {properties: result , noMatch: noMatch});
         }
       });
     }
    });
  }else if(minprice && maxprice){
      MongoClient.connect('mongodb://mls_app:543TWOone@ds035693.mlab.com:35693/mls', { useNewUrlParser: true }, function(err, client){
      if (err) throw err
       var db = client.db('mls')
       db.collection('listings').find({listprice: { $gte: minprice, $lte: maxprice }}).toArray(function (err, result) {
         if (err) throw err
         if(result.length < 1){
           var noMatch = "You must select a search criteria to get a filtered listing. Please try again";
         }
         res.render("properties", {properties: result , noMatch: noMatch});
       })
    })
  }else{
    MongoClient.connect('mongodb://mls_app:543TWOone@ds035693.mlab.com:35693/mls', { useNewUrlParser: true }, function(err, client){
    if (err) throw err
     var db = client.db('mls')
     db.collection('listings').find().toArray(function (err, result) {
       if (err) throw err
       if(result.length < 1){
         var noMatch = "You must select a search criteria to get a filtered listing. Please try again";
       }
       res.render("properties", {properties: result , noMatch: noMatch});
     })
  })
}
});

router.get("/properties/:id", function(req, res){
  var id = req.params.id;
  MongoClient.connect('mongodb://mls_app:543TWOone@ds035693.mlab.com:35693/mls', { useNewUrlParser: true }, function(err, client){
  if (err) throw err
   var db = client.db('mls')
   db.collection('listings').find({_id:id},function (err, result) {
     if (err) throw err
     if(result.length < 1){
       var noMatch = "You must select a search criteria to get a filtered listing. Please try again";
     }
     res.render("show", {properties: result , noMatch: noMatch});
   })
})
});


module.exports = router;
