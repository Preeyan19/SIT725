var expect  = require("chai").expect;
var request = require("request");

describe("Subtract Two Numbers", function() {
    var url = "http://localhost:8080/subtractTwoNumbers/10/4";
    it("returns status 200 to check if API works", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
          });
    });
    it("returns statusCode key in body to check if API gives right result, should be 200", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.statusCode).to.equal(200);
            done();
          });
    });
    it("returns the result as a number", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.result).to.be.a('number');
            done();
          });
    });
    it("returns the result equal to 6", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.result).to.equal(6);
            done();
          });
    });
    it("returns the result not equal to 8", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.result).to.not.equal(8);
            done();
          });
    });
});

describe("Multiply Two Numbers", function() {
    var url = "http://localhost:8080/multiplyTwoNumbers/3/5";
    it("should return status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
          });
    });
    it("returns statusCode key in body to check if API gives right result, should be 200", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.statusCode).to.equal(200);
            done();
          });
    });
    it("returns the result as a number", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.result).to.be.a('number');
            done();
          });
    });
    it("returns the result equal to 15", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.result).to.equal(15);
            done();
          });
    });
    it("returns the result not equal to 10", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.result).to.not.equal(10);
            done();
          });
    });
});

describe("Fetch Project Details", function() {
    var url = "http://localhost:8080/api/projectDetails";
    it("should return status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
          });
    });
    it("returns the result as an object", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body).to.be.an('object');
            done();
          });
    });
    it("should have a 'projectName' property", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body).to.have.property('projectName');
            done();
          });
    });
    it("should have a 'projectId' property", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body).to.have.property('projectId');
            done();
          });
    });
});
