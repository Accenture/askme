'use strict';

var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\/app\/scripts\//, '');//.replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/app/scripts',

  // dynamically load all test files
  deps: allTestFiles,
  paths: {
      text: '../bower_components/requirejs-text/text',
      modernizr: '../bower_components/modernizr/modernizr',
      jquery: '../bower_components/jquery/jquery',
      underscore: '../bower_components/underscore/underscore',
      backbone: '../bower_components/backbone/backbone',
      handlebars: '../bower_components/handlebars/handlebars',
      handlebarsHelpers: 'lib/handlebarsHelpers',
      foundation: '../bower_components/foundation/js/foundation',
      fastclick: '../bower_components/foundation/js/vendor/fastclick',
      requirejs: '../bower_components/requirejs/require',
      'socket.io': '../bower_components/sio-client/socket.io',
      'lil-uuid':'../bower_components/lil-uuid/uuid'
  },
    shim: {
      underscore: {
          exports: '_'
      },
      backbone: {
          deps: [
              'jquery',
              'underscore'
          ],
          exports: 'Backbone'
      },
      foundation: {
          deps: ['jquery', 'fastclick']
      }
    },

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
