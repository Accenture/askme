define([
    'underscore',
    'backbone',
    'modules/Questions/views/QuestionForm',
    'modules/Questions/models/Question',
], function(_, Backbone, QuestionsFormView, QuestionModel) {
    'use strict';
    describe('QuestionForm view', function() {
        beforeEach(function() {
            this.model = new QuestionModel({});
            this.view = new QuestionsFormView({model: this.model});
            this.view.render();
            localStorage.setItem('userName', 'testUser');
        });

        it('render() should return a view object', function() {
            this.view.render().should.equal(this.view);
        });

        it('save() should save the question', function() {
          this.view.save({preventDefault: function() {}});
          this.view.model.get('question').should.be.equal('testUser: undefined');
        });

        it('updateCounter() should update counter to short question', function() {
          this.view.updateCounter({target: {value: {length: 10}}});
        });

        it('updateCounter() should update counter to long question', function() {
          this.view.updateCounter({target: {value: {length: 200}}});
        });
    });
});
