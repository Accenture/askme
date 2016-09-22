define([
    'underscore',
    'backbone',
    'modules/Questions/models/Rating',
    'modules/Questions/views/RatingView'
], function(_, Backbone, RatingModel, RatingItemView) {
    'use strict';

    return Backbone.View.extend({
        render: function() {
            return this.addAll(this.collection.models);
        },

        addAll: function(collection) {
            this.$el.html('');
            _.each(collection, function(model) {
                this.addOne(model);
            }, this);
            this.delegateEvents();
            return this;
        },

        addOne: function(model) {
            var ratingItemView = new RatingItemView({ model: model });
            this.$el.prepend(ratingItemView.render().$el);

            return this;
        }
    });
});
