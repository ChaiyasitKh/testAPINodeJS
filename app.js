const express = require("express");
var routes = require('./routes/index.js');
var app = express();

app.listen(9000,()=>{
  console.log("server start on port 9000");
});
app.use('/',routes);
