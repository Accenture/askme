define([
    'underscore',
    'backbone',
    'modules/Questions/models/Question',
    'modules/Questions/views/QuestionItem'
], function(_, Backbone, QuestionModel, QuestionItemView) {
    'use strict';

    return Backbone.View.extend({
        render: function() {
            var that = this.addAll(this.collection.models);
            $('#nr-of-questions').text(this.collection.length);
            return that;
        },

        addAll: function(collection) {
            this.$el.html('');
            _.each(collection, function(model) {
                this.addOne(model);
            }, this);
            return this;
        },

        addOne: function(model, highlighted) {
            highlighted = highlighted || false;
            model.handleVoteButtons();
            model.handleMessages();

            var questionItemView = new QuestionItemView({ model: model, highlighted: highlighted });
            this.$el.prepend(questionItemView.render().$el);

            return this;
        }
    });
});
