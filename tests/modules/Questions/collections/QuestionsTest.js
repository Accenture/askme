define([
    'modules/Questions/models/Question',
    'modules/Questions/collections/Questions'
], function(QuestionModel, QuestionsCollection) {
    'use strict';
    describe('Questions Collection', function() {
        beforeEach(function() {
          var questions = JSON.stringify({ 0: 0, 1: 1, 2: -1 });
          localStorage.setItem('questions', questions);

          this.collection = new QuestionsCollection([]);
          this.collection.comparator = function(model) {
              return model.get('id');
          };
        });

        it('newHandler() should add question into collection', function() {
          this.collection.newHandler('wow: this is a new question');
          this.collection.length.should.equal(1);
        });

        it('updateHandler() should update questions', function() {
          var model = new QuestionModel({id: 1, upvoteDisabled: true});
          this.collection.length.should.equal(0);
          this.collection.add(model);
          this.collection.updateHandler(model);
          model.get('upvoteDisabled').should.equal(true);
        });
    });
});
