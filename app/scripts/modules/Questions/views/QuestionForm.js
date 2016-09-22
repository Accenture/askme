define([
    'underscore',
    'backbone',
    'modules/Questions/views/QuestionsListing',
    'modules/Questions/models/Question',
    'socket'
], function(_, Backbone, QuestionsView, QuestionModel, socket) {
    'use strict';

    var QUESTION_LENGTH_LIMIT = 123;

    return Backbone.View.extend({
        events: {
            submit: 'save',
            'keyup #question-textarea': 'updateCounter'
        },

        save: function(evt) {
            evt.preventDefault();
            var question = this.$('#question-textarea').val();
            var questionWithName = localStorage.userName + ': ' + question;

            this.model.set('question', questionWithName);
            socket.emit('question:new', this.model.attributes);
            this.$('#question-textarea').val('');

            this.$('#counter').html(0);
            this.$('#counter').parent().removeClass('alert-color');
        },

        // feature: twitter button
        updateCounter: function(evt) {
            var count = evt.target.value.length;

            if(count > QUESTION_LENGTH_LIMIT) {
                this.$('#counter').parent().addClass('alert-color');
            } else {
                this.$('#counter').parent().removeClass('alert-color');
            }

            this.$('#counter').html(count);
        }
        // end feature
    });
});
