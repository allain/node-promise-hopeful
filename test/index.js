var assert = require('assert');
var hopeful = require('..');

var Promise = require('any-promise');

describe('promise-hopeful', function() {
  it('should resolve rejected promises as errors', function(done) {
    hopeful(Promise.reject()).then(function(result) {
      assert(result instanceof Error);
      done();
    }, done);
  });
  
  it('should passthrough error of rejction if passed', function(done) {
    var error = new Error();
    hopeful(Promise.reject(error)).then(function(result) {
      assert.equal(result, error); 
      done();
    }, done);
  });
  
  it('should wrap failure result in Error', function(done) {
    var error = new Error();
    hopeful(Promise.reject('hello')).then(function(result) {
      assert(result instanceof Error);
      assert.equal(result.message, 'hello'); 
      done();
    }, done);
  });
  
  it('should passthrough resolutions', function(done) {
    var error = new Error();
    
    Promise.all([
      hopeful(Promise.resolve()),
      hopeful(Promise.resolve(true)),
      hopeful(Promise.resolve(error))
    ]).then(function(result) {
      assert.equal(result[0], void 0);
      assert.equal(result[1], true);
      assert.equal(result[2], error, 'resolved error should be passed through');
      done();
    });
  });
});
