var Promise = require('any-promise');

module.exports = function (promise) {
  if (promise && promise.then) {
    return new Promise(function(resolve) {
      promise.then(resolve, function(err) {
        if (err instanceof Error) {
          resolve(err);
        } else {
          resolve(new Error(err));
        }
      });  
    });
  } else {
    return Promise.resolve(promise);
  }
};
