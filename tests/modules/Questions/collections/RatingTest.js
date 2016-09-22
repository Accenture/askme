define([
    'modules/Questions/models/Question',
    'modules/Questions/collections/RatingCollection'
], function(QuestionModel, RatingCollection) {
    'use strict';
    describe('Rating Collection', function() {
        beforeEach(function() {
          var questions = JSON.stringify({ 0: 0, 1: 1, 2: -1 });
          localStorage.setItem('questions', questions);

          this.collection = new RatingCollection([
            new QuestionModel({id: 1, upvoteDisabled: true})
          ]);

          this.collection.comparator = function(model) {
              return model.get('id');
          };
        });

        it('updateHandler() should update questions', function() {
          var model = new QuestionModel({id: 1, upvoteDisabled: true});
          this.collection.updateHandler(model);
          model.get('upvoteDisabled').should.equal(true);
        });
    });
});
