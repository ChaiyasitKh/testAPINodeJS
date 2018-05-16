const express = require("express");
var router = express.Router();
var sql = require('mssql');

const config = {
  user:'sa',
  password:'root',
  database:'TestNodeJS',
  server:'localhost'
}
sql.connect(config, function (err) {
 if (err) console.log(err);
});
router.get("/selectAll",(req,res)=>{
  // create Request object
  var request = new sql.Request();
  // query to the database and get the data
    request.query('select * from properties', function (err, recordset) {
      if (err) console.log(err)
      // send data as a response
      res.send(recordset);
    });
});
router.get("/searchByUniqId",(req,res)=>{
  var input = req.query;
  var id = input.uniq_id || "";
   var request = new sql.Request();
   // query to the database and get the data
    var query = "select * from properties where uniq_id='"+id+"'";
     request.query(query, function (err, recordset) {
       if (err) console.log(err)
       // send data as a response
       res.send(recordset);
     });
});
router.get("/searchByPropertyType",(req,res)=>{
  var input = req.query;
  var property_type = input.property_type || "";
   var request = new sql.Request();
   // query to the database and get the data
    var query = "select * from properties where property_type = '"+property_type+"'";
     request.query(query, function (err, recordset) {
       if (err) console.log(err)
       // send data as a response
       res.send(recordset);
     });
});
router.get("/searchByCity",(req,res)=>{
  var input = req.query;
  var city = input.city || "";
   var request = new sql.Request();
   // query to the database and get the data
    var query = "select * from properties where city = '"+city+"'";
     request.query(query, function (err, recordset) {
       if (err) console.log(err)
       // send data as a response
       res.send(recordset);
     });
});
router.get("/searchByAmenities",(req,res)=>{
  var input = req.query;
  var amenities  = input.amenities || "";
   var request = new sql.Request();
   // query to the database and get the data
    var query = "select * from properties where amenities = '"+amenities+"'";
     request.query(query, function (err, recordset) {
       if (err) console.log(err)
       // send data as a response
       res.send(recordset);
     });
});
router.get("/searchByRoomPrice",(req,res)=>{
  var input = req.query;
  var room_price  = input.room_price || "";
  var response = room_price.split("-");
  var min = parseInt(response[0]);
  var max = parseInt(response[1]);

   var request = new sql.Request();
   // query to the database and get the data
    var query = "select * from properties where dbo.udf_GetNumeric(room_price) between "+min+" and "+max;
    //sql function ref https://stackoverflow.com/questions/16667251/query-to-get-only-numbers-from-a-string
     request.query(query, function (err, recordset) {
       if (err) console.log(err)
       // send data as a response
       res.send(recordset);
     });
});
router.get("/searchByLocationAndRadius",(req,res)=>{
  var input = req.query;
  var location  = input.location || "";
  var radius  = parseFloat(input.radius) || 0;
  var response = location.split(",");
  var lat = parseFloat(response[0]);
  var long = parseFloat(response[1]);

   var request = new sql.Request();
   // query to the database and get the data
    var query = "SELECT * from properties where dbo.DistanceKM(latitude, "+lat+", longitude, "+long+") <= "+radius;
    //sql function ref https://stackoverflow.com/questions/13026675/calculating-distance-between-two-points-latitude-longitude
     request.query(query, function (err, recordset) {
       if (err) console.log(err)
       // send data as a response
       res.send(recordset);
     });
});


module.exports = router;
