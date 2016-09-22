define([
    'underscore',
    'backbone',
    'modules/Questions/models/Question'
], function(_, Backbone, QuestionModel) {
    'use strict';

    return Backbone.Collection.extend({
        model: QuestionModel,
        url: 'api/questions',
        initialize: function () {
            this.listenTo(Backbone, 'question:update', this.updateHandler);
            this.listenTo(Backbone, 'question:new', this.newHandler);
            this.fetch({async:false});
        },
        updateHandler: function (message) {
            var model = this.get(message.id);
            model.set('votes', message.votes);
            model.handleVoteButtons();
            this.sort();
        },
        newHandler: function (message) {
            var model = new this.model(message);
            this.add(model);
        }
    });
});
