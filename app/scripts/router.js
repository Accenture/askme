define([
    'underscore',
    'backbone',
    'modules/Questions/views/Questions'
], function(
    _,
    Backbone,
    QuestionsView
){
    'use strict';

    var initialize = function() {
        var questionsView = new QuestionsView();

        new (Backbone.Router.extend({
            routes: {
                '(*actions)(/)': 'defaultAction'
            },

            defaultAction: function() {
                questionsView.render();
            }
        }))();

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
