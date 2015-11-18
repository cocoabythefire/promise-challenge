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

  it('returns a function which returns a promise', function() {
    var slowMultiplyAsync = app.promisify(slowMultiply);
    return slowMultiplyAsync(3, 6).then(function(result) {
      expect(result).to.eql(18);
    });
  });
});

describe('promisifyAll', function() {
  it('returns the proper keys when there are no functions on the object', function() {
    var oldObject = { hello: 2, goodbye: 'seeyalater'};
    var newObject = app.promisifyAll(oldObject);
    expect(newObject).to.have.keys(['hello', 'goodbye']);
  });

  it('returns the proper keys when there is a single function on the object', function() {
    var func = function() { return 'seeyalater'; };
    var oldObject = { hello: 2, goodbye: func };
    var newObject = app.promisifyAll(oldObject);
    expect(newObject).to.have.keys(['hello', 'goodbye', 'goodbyeAsync']);
  });

  it('returns the proper keys when there are multiple functions on the object', function() {
    var func1 = function() { return 'seeyalater'; };
    var func2 = function() { return 'until next time!'; };
    var oldObject = { hello: 2, goodbye1: func1, goodbye2: func2 };
    var newObject = app.promisifyAll(oldObject);
    expect(newObject).to.have.keys(
      ['hello', 'goodbye1', 'goodbye1Async','goodbye2', 'goodbye2Async']);
  });
});
