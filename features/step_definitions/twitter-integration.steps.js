'use strict';

var assert = require('assert');
var webdriverio = require('webdriverio');
var rp = require('request-promise');

var options = {};
var backendHost = process.env.BACKEND_HOST || 'localhost';
var frontendHost = process.env.FRONTEND_HOST || 'localhost';

var fs = require('fs');

module.exports = function() {

  var session = webdriverio
    .remote(options)
    .init()
    .then(function() {
      return rp({method: 'POST', uri: 'http://' + backendHost + ':8081/api/purge_database'});
    })
    .url('http://' + frontendHost + ':9999');

  this.Given(/^I have entered a feedback$/, function (callback) {
    session
      .execute(function() { localStorage.setItem('userName', 'Testing User'); })
      .setValue('#question-textarea', 'This is my new question')
      .submitForm('#addQuestionForm')
      .then(function() {callback();})
      .catch(callback.fail);
  });

  this.When(/^I press the Tweet button$/, function (callback) {
    session
      .click('#twitter-button')
      .then(function() {callback();})
      .catch(callback.fail);
  });

  this.Then(/^I should see a tweet with my question ready to be tweeted$/, function (callback) {
    session
      .windowHandles().then(function(list) {
        var windowHandles = list.value;
        assert.equal(windowHandles.length, 2, '# of open tabs is not as expected');
        return session.switchTab(windowHandles[1]);
      })
      .getValue('textarea#status').then(function(value) {
        assert.equal(value, 'This is my new question #liquidapps');
      })
      .catch(callback.fail)
      .end(callback);
  });
}
