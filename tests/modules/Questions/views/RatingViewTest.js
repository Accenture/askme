define([
    'underscore',
    'backbone',
    'modules/Questions/views/RatingView',
    'modules/Questions/models/Rating',
    'handlebarsHelpers',
], function(_, Backbone, RatingItemView, RatingModel) {
    'use strict';
    describe('QuestionItem view', function() {
        beforeEach(function() {
            this.model = new RatingModel({id: 1, question: 'Name: Is this valid question ?', type: 'cool'});
            this.view = new RatingItemView({model: this.model});
            this.view.render();
        });

        it('render() should return a view object', function() {
            this.view.render().should.equal(this.view);
        });

        it('presetStars() should preset 1 star', function() {
            localStorage.setItem('cool', 1);
            this.view.presetStars();
            this.view.$el.find('[id^=star1]').attr('checked').should.equal('checked');
        });

        it('presetStars() should preset 2 stars', function() {
            localStorage.setItem('cool', 2);
            this.view.presetStars();
            this.view.$el.find('[id^=star2]').attr('checked').should.equal('checked');
        });

        it('presetStars() should preset 3 stars', function() {
            localStorage.setItem('cool', 3);
            this.view.presetStars();
            this.view.$el.find('[id^=star3]').attr('checked').should.equal('checked');
        });

        it('presetStars() should preset 4 stars', function() {
            localStorage.setItem('cool', 4);
            this.view.presetStars();
            this.view.$el.find('[id^=star4]').attr('checked').should.equal('checked');
        });

        it('presetStars() should preset 5 stars', function() {
            localStorage.setItem('cool', 5);
            this.view.presetStars();
            this.view.$el.find('[id^=star5]').attr('checked').should.equal('checked');
        });

        it('vote() should update type', function() {
          var target = $('<input type="radio" name="star" data-id="cool" data-value="4" class="star-4" id="star4-cool" />');

          this.view.vote({target: target});
          JSON.parse(localStorage.getItem('cool')).should.equal(4);
        });
    });
});
