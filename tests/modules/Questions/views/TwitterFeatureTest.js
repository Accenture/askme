define([
  'modules/Questions/views/QuestionItem',
  'modules/Questions/models/Question',
  'handlebarsHelpers',
], function(QuestionsItemView, QuestionModel) {
  'use strict';
  describe('Twitter button feature', function() {
      beforeEach(function() {
          this.model = new QuestionModel({
            id: 1, question: 'Name: Is this valid question ?', votes: 3
          });
          this.view = new QuestionsItemView({model: this.model});
          this.view.render();
      });

      it('render() should return a view object', function() {
          this.view.render().should.equal(this.view);
      });

      it('view should contain twitter button', function() {
        this.view.$el.find('#twitter-button').length.should.equal(1);
      });

      it('should contain the question', function() {
        var href = this.view.$el.find('#twitter-button').attr('href');
        var question = this.model.get('question').split(':')[1].trim();

        href.indexOf(question).should.not.equal(-1);
      });
  });

  describe('Twitter button feature', function() {
      beforeEach(function() {
          this.model = new QuestionModel({
            id: 1, question: 'Name: Is this a long enough question that'+
            ' will not contain a twitter button because you cannot tweet'+
            ' more that 120+ characters or so? Sure I need to add couple' +
            ' of additional characters and this should do it :)', votes: 0
          });
          this.view = new QuestionsItemView({model: this.model});
          this.view.render();
      });

      it('should not be contained in question', function() {
          this.view.$el.find('#twitter-button').length.should.equal(0);
      });
  });
});
