'use strict';

define([
    'underscore',
    'backbone',
    'modules/Questions/models/Question',
], function(_, Backbone, QuestionModel) {
    describe('Question Model', function() {
        beforeEach(function() {
          var questions = JSON.stringify({ 0: 0, 1: 1, 2: -1 });

          localStorage.setItem('questions', questions);
        });

        it('handleVoteButtons() without localsotrage setup should skip any changes', function() {
          localStorage.clear();
            var model = new QuestionModel({
              id: 0,
              question: 'Name: Is this valid question ?',
              votes: 3,
              upvoteDisabled: true,
              downvoteDisabled: true
            });

            model.handleVoteButtons();
            model.get('upvoteDisabled').should.equal(true);
            model.get('downvoteDisabled').should.equal(true);
        });

        it('handleVoteButtons() should enable buttons', function() {
            var model = new QuestionModel({
              id: 0, question: 'Name: Is this valid question ?', votes: 3});

            model.handleVoteButtons();
            should.not.exist(model.get('upvoteDisabled'));
            should.not.exist(model.get('downvoteDisabled'));
        });

        it('handleVoteButtons() should disable upvote button', function() {
            var model = new QuestionModel({
              id: 1, question: 'Name: Is this valid question ?', votes: 3});

            model.handleVoteButtons();
            model.get('upvoteDisabled').should.equal(true);
            should.not.exist(model.get('downvoteDisabled'));
        });

        it('handleVoteButtons() should disable downvote button', function() {
            var model = new QuestionModel({
              id: 2, question: 'Name: Is this valid question ?', votes: 3});

            model.handleVoteButtons();
            should.not.exist(model.get('upvoteDisabled'));
            model.get('downvoteDisabled').should.equal(true);
        });

        it('handleMessages() should determine a short question', function() {
            var model = new QuestionModel({
              id: 2, question: 'Name: Is this valid question ?', votes: 3});

            model.handleMessages();
            model.get('shortMessage').should.equal(true);
        });

        it('handleMessages() should determine a long question', function() {
          var model = new QuestionModel({
            id: 2, question: 'Name: Is this valid question ?Is this valid' +
            'question ?Is this valid question ?Is this valid question ?' +
            'Is this valid question ?Is this valid question ?' +
            'Is this valid question ?Is this valid question ?' +
            'Is this valid question ?Is this valid question ?',
            votes: 3});

          model.handleMessages();
          model.get('shortMessage').should.equal(false);
        });
    });
});
