define([
    'underscore',
    'backbone',
    'modules/Questions/views/QuestionsListing',
    'modules/Questions/models/Question',
    'modules/Questions/collections/Questions',
    'handlebarsHelpers',
], function(_, Backbone, QuestionsListing, QuestionModel, QuestionsCollection) {
    'use strict';
    describe('QuestionListing view', function() {
        beforeEach(function() {
            this.model = new QuestionModel({id: 1, question: 'Name: Is this valid question ?', votes: 3});
            this.collection = new QuestionsCollection([this.model]);
            this.view = new QuestionsListing({collection: this.collection});
            this.view.render();
        });

        it('render() should return a view object', function() {
            this.view.render().should.equal(this.view);
        });

        it('addOne() should render one model', function() {
            this.view.addOne(this.model ,false);
            this.view.$el.find('#question-1').length.should.equal(2);
        });
    });
});
