// Import necessary dependencies
var express = require('express');
var app = express();
var fs = require('fs');
const path = require('path');
const compress = require('compression');
var tsv = require('tsv');
var parsedData = {};
var score = require('string-score');

// Set /build as our static content directory
const publicPath = path.join(__dirname, 'build');

// Point the app to our static assets
app.use(express.static(publicPath));

// Automatically gzip compresses all of our HTTP body data
app.use(compress());

// Read in TSV and parse data
fs.readFile("./data/cities_canada-usa.tsv", "utf8", function(error, data) {
    parsedData = tsv.parse(data);
});

// Get the string score
getScore = (data, term) => {
    var suggestions = [];

    // Create and push new object with score
    data.map(city => {
        suggestions.push ({
            name: city.name,
            latitude: city.lat,
            longitude: city.long,
            score: score(city.name, term)
        });
    });

    // Sort in descending order
    suggestions.sort(function(a,b) {
        return b.score - a.score;
    });

    return suggestions;
}

// GET: '/'
// Provides auto-complete suggestions for large cities
// in USA + Canada with a population above 5000 people
// CHECK: NOT COMPLETE
app.get('/suggestions/:q', (req, res, next) => {
    let searchTerm = req.params.q.trim();
    if (searchTerm.length > 0) {
        const filteredCities = parsedData.filter(city => {
            return ((city.population > 5000) && ((city.name.toLowerCase().includes(searchTerm) || city. alt_name.toLowerCase().split(",").includes(searchTerm))))
        });
        res.send(getScore(filteredCities, searchTerm));
    } else {
        res.send("Invalid search term");
    }
});

// Setup port
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Server running at http://localhost:%d/', port);

module.exports = app;
