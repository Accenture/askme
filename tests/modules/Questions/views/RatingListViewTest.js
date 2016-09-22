define([
    'underscore',
    'backbone',
    'modules/Questions/views/RatingListView',
    'modules/Questions/models/Rating',
    'handlebarsHelpers',
], function(_, Backbone, RatingListView, RatingModel) {
    'use strict';
    describe('QuestionListing view', function() {
        beforeEach(function() {
          this.model = new RatingModel({type: 'wow'});
            this.view = new RatingListView({collection: new Backbone.Collection([this.model])});
            this.view.render();
        });

        it('render() should return a view object', function() {
            this.view.render().should.equal(this.view);
        });

        it('addOne() should render one model', function() {
            this.view.addOne(this.model ,false);
            this.view.$el.find('.rating-margin').length.should.equal(2);
        });
    });
});
