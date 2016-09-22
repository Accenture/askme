define([
    'underscore',
    'backbone',
    'templates',
    'socket'
], function(_, Backbone, JST, socket) {
    'use strict';

    function getVotesForQuestion(id) {
        return JSON.parse(localStorage.questions)[id] || 0;
    }

    function saveQuestion(votes, id) {
        var questions = JSON.parse(localStorage.questions);
        questions[id] = votes;
        localStorage.setItem('questions', JSON.stringify(questions));
    }

    return Backbone.View.extend({

        template: JST['app/templates/question.hbs'],
        initialize: function() {
            this.listenTo(this.model, 'change', function() {
                this.render();
            });
        },
        render: function() {
          var isShortMessage = true;
          var question = this.model.get('question').split(':')[1].trim();
          isShortMessage = (question.length <= 135);
          this.model.set('shortMessage', isShortMessage);

            var highlightedClass = this.options.highlighted ? ' highlighted' : '';
            this.$el
                .attr('id', 'question-' + this.model.id)
                .addClass('panel callout radius row questionItem' + highlightedClass)
                .html(this.template(this.model.attributes));
            return this;
        },

        events: {
            'click button.votePositive' : 'addOneVote',
            'click button.voteNegative' : 'removeOneVote'
        },

        addOneVote: function() {
            // [{id, votes}]
            var id = this.model.get('id');
            var votes = getVotesForQuestion(id);
            if(votes === 0 || votes === -1) {
                votes++;
                saveQuestion(votes, id);
                socket.emit('vote', {id: id, uuid: localStorage.getItem('uuid')});
            }
        },

        removeOneVote: function () {
            var id = this.model.get('id');
            var votes = getVotesForQuestion(id);
            if(votes === 0 || votes === 1) {
                votes--;
                saveQuestion(votes, id);
                socket.emit('downvote', {id: id, uuid: localStorage.getItem('uuid')});
            }
        }
    });
});
