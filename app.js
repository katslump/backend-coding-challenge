var express = require('express');
var app = express();

// YOUR CODE HERE

var port = process.env.PORT || 2345;
app.listen(port);
console.log('Server running at http://localhost:%d/', port);

module.exports = app;
