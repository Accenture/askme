define([
    'underscore',
    'backbone',
    'router',
    'handlebarsHelpers',
    'lil-uuid'
], function(_, Backbone, Router, HandlebarHelpers, lil){
    'use strict';

    var initialize = function(){
        Router.initialize();
        if(localStorage.getItem('uuid') === null) {
            localStorage.setItem('uuid', lil.uuid());
        }
    };

    return {
        initialize: initialize
    };
});