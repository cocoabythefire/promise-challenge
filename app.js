'use strict';

/**
 * Takes a function and returns a Promise version
 * of the function which, when called, will call the
 * passed in function.
 *
 * @function
 * @param {function(...args,cb)}
 * @return {function(...args):Promise}
 */
var promisify = function(func) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    return new Promise(function(resolve, reject) {
      var cb = function(err, result) {
        if (err) { reject(err); }
        else { resolve(result); }
      };
      var newArgs = args.concat([cb]);

      func.apply(this, newArgs);

    }.bind(this));
  };
};

/**
 * Takes an object and returns an object which
 * has a Promise version for all functions on
 * the object. For instance, an object with a
 * function called `readFile` would have a new
 * function added called `readFileAsync`. The
 * async version would return a promise instead
 * of taking a callback. For example:
 *
 * fs.readFile(file, function(err, contents) {
 *   // callback based
 * });
 *
 * fs.readFileAsync(file).then(function(contents) {
 *   // promise based
 * });
 *
 *
 * @function
 * @param {Object}
 * @return {Object} that contains the promisified
 * version of functions.
 */
var promisifyAll = function(obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var val = obj[key];
    if (typeof val === 'function') {
      var asyncKey = key + 'Async';
      obj[asyncKey] = promisify(val);
    }
  }
  return obj;
};

module.exports = {
  promisify: promisify,
  promisifyAll: promisifyAll,
};
