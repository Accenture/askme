define([
    'underscore',
    'backbone',
    'modules/Questions/views/QuestionItem',
    'modules/Questions/models/Question',
    'handlebarsHelpers',
], function(_, Backbone, QuestionsItemView, QuestionModel) {
    'use strict';
    describe('QuestionItem view', function() {
        beforeEach(function() {
            this.model = new QuestionModel({id: 1, question: 'Name: Is this valid question ?', votes: 3});
            this.view = new QuestionsItemView({model: this.model});
            this.view.render();
        });

        it('render() should return a view object', function() {
            this.view.render().should.equal(this.view);
        });

        it('addOneVote() should add question to localstorage', function() {
            this.view.addOneVote();
            JSON.parse(localStorage.getItem('questions'))[1].should.equal(1);
        });

        it('removeOneVote() should remove a question from localstorage', function() {
          this.view.removeOneVote();
          JSON.parse(localStorage.getItem('questions'))[1].should.equal(0);
        });
    });
});
