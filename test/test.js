'use strict';

var app = require('../app');
var chai = require('chai');
var expect = chai.expect;

describe('promisify', function() {
  var slowMultiply = function(a, b, cb) {
    setTimeout(function() {
      cb(null, a*b);
    }, 1);
  };

  it.only('returns a function which returns a promise', function() {
    var slowMultiplyAsync = app.promisify(slowMultiply);
    return slowMultiplyAsync(3, 6).then(function(result) {
      expect(result).to.eql(18);
    });

    // slowMultiplyAsync(2, 6).to.eventually.eql(12);
  });
});


describe('promisifyAll', function() {
  it('returns the proper keys when there are no functions on the object', function() {

  });

  it('returns the proper keys when there is a single function on the object', function() {
    // var myObject = { hello: function(){}, goodbye: 'seeya'};

  });

  it('returns the proper keys when there are multiple functions on the object', function() {

  });

});
