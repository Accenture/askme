'use strict';

var assert = require('assert');

module.exports = function() {
  this.Given(/^I have an question list$/, function (callback) {
    callback();

  });

  this.When(/^I add an question to the list$/, function (callback) {
    callback();
  });

  this.Then(/^The question list contains a single item$/, function (callback) {
    callback();
  });
};
