var express = require('express');
var router = express.Router();

// GET: '/'
// Gets homepage if user is logged in
// CHECK: COMPLETE!
router.get('/', function(req, res) {
  res.send("Success!");
});
