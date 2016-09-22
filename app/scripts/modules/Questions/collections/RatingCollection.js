define([
    'underscore',
    'backbone',
    'modules/Questions/models/Rating'
], function(_, Backbone, RatingModel) {
    'use strict';

    return Backbone.Collection.extend({
        model: RatingModel,
        url: 'api/ratings',
        initialize: function () {
            this.fetch({async:false});
            // this.listenTo(Backbone, 'question:update', this.updateHandler);
        },
        updateHandler: function (message) {
            var model = this.get(message.id);
            model.set('votes', message.votes);
            model.handleVoteButtons();
            this.sort();
        }
    });
});
