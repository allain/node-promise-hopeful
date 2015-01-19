# promise-hopeful

A module that catches rejected promises and resolves them with Errors

[![build status](https://secure.travis-ci.org/allain/promise-hopeful.png)](http://travis-ci.org/allain/promise-hopeful)

## Installation

This module is installed via npm:

``` bash
$ npm install promise-hopeful
```

## Example Usage

``` js
var hopeful = require('promise-hopeful');
var assert = require('assert');

// creation of error object
hopeful(Promise.reject()).then(function(result) {
  assert(result instanceof Error); 
});

// passthrough of rejected value
hopeful(Promise.reject("baaaah)).then(function(result) {
  console.log(result.message); //=> baaaah 
});

// passthrouh of error
hopeful(Promise.reject(new Error('failure'))).then(function(result) {
  assert(result instanceof Error); 
});

// Resolves normally
hopeful(Promise.resolve('hello')).then(function(result) {
  console.log(result); //=> hello
});

```
