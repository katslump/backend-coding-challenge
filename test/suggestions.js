var chai = require('chai');
var expect = chai.expect;
var app  = require('../app');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('GET /suggestions', function() {
  describe('with a non-existent city', function () {
    var response;

    before(function (done) {
      chai.request(app)
        .get('/suggestions?q=SomeRandomCityInTheMiddleOfNowhere')
        .end(function (err, res) {
          response = res;
          done();
        });
    });

    it('returns a 404', function () {
      expect(response.status).to.equal(404);
    });

    it('returns an empty array of suggestions', function () {
      expect(response.body.suggestions).to.be.instanceof(Array);
      expect(response.body.suggestions).to.have.length(0);
    });
  });

  describe('with a valid city', function () {
    var response;

    before(function (done) {
      chai.request(app)
        .get('/suggestions?q=Montreal')
        .end(function (err, res) {
          response = res;
          done(err);
        });
    });

    it('returns a 200', function () {
      expect(response.statusCode).to.equal(200);
    });

    it('returns an array of suggestions', function () {
      expect(response.body.suggestions).to.be.instanceof(Array);
      expect(response.body.suggestions).to.have.length.above(0);
    });

    it('contains a match', function () {
      expect(response.body.suggestions).to.satisfy(function (suggestions) {
        return suggestions.some(function (suggestion) {
          return suggestion.name.match(/montr/i);
        });
      })
    });

    it('contains latitudes and longitudes', function () {
      expect(response.body.suggestions).to.satisfy(function (suggestions) {
        return suggestions.every(function (suggestion) {
          return suggestion.latitude && suggestion.longitude;
        });
      })
    });

    it('contains scores', function () {
      expect(response.body.suggestions).to.satisfy(function (suggestions) {
        return suggestions.every(function (suggestion) {
          return suggestion.latitude && suggestion.longitude;
        });
      })
    });
  });
});
