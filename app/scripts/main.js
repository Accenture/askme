require.config({
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
    }
});

require(['app', 'backbone', 'foundation'], function (App, Backbone) {
    'use strict';

    function initLocalSotrage() {
        if(!localStorage.questions) {
            localStorage.setItem('questions', JSON.stringify({}));
        }
    }

    function initApp() {
      App.initialize();
      Backbone.$(document).foundation();
      initLocalSotrage();
    }

    function eidToName(eid) {
      var name = eid.replace(/\./g, ' ');
      name = name.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
      return name;
    }

    //get user name from shibboleth
    if(!localStorage.userName) {
      Backbone.$.ajax({url: '/api/identity', dataType: 'json', type: 'GET'})
      .done(function(data) {
        // successful init the app
        localStorage.setItem('userName', eidToName(data.name));
        initApp();
      })
      .fail(function() {
        Backbone.$('.content').html(
          '<div data-alert class="alert-box alert text-center"><h3>'+
          'An error occured while contacting the identity provider</h3></div>');
      });
    } else {
      initApp();
    }
});
