var express = require('express');
var app = express();
var fs = require('fs');
var tsv = require('tsv');
var parsedData = {};
var score = require('string-score');

fs.readFile("./data/cities_canada-usa.tsv", "utf8", function(error, data) {
    parsedData = tsv.parse(data);
});

getScore = (data, term) => {
    var suggestions = [];

    data.map(city => {
        suggestions.push ({
            name: city.name,
            latitude: city.lat,
            longitude: city.long,
            score: score(city.name, term)
        });
    });

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

var port = process.env.PORT || 2345;
app.listen(port);
console.log('Server running at http://localhost:%d/', port);

module.exports = app;
