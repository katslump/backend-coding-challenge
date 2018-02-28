var express = require('express');
var router = express.Router();
var app = express();

// GET: '/'
// Gets homepage if user is logged in
// CHECK: COMPLETE!
app.get('/', function(req, res) {
  res.send("Success!");
});


module.exports = app;
