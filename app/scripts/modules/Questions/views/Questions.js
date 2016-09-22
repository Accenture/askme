define([
    'underscore',
    'backbone',
    'templates',
    'modules/Questions/models/Question',
    'modules/Questions/collections/Questions',
    'modules/Questions/views/QuestionsListing',
    'modules/Questions/views/QuestionForm',
    'modules/Questions/collections/RatingCollection',
    'modules/Questions/views/RatingListView'
], function(_, Backbone, JST, QuestionModel, QuestionsCollection, QuestionsView, QuestionForm, RatingCollection, RatingListView) {
    'use strict';

    return Backbone.View.extend({
        el: $('.contentWrapper'),
        template: JST['app/templates/questions-section.hbs'],
        initialize: function() {
            var that = this;

            this.ratingListView = new RatingListView({
                collection: new RatingCollection()
            });

            this.questionsView = new QuestionsView({
                collection: new QuestionsCollection()
            });
            this.questionsView.collection.comparator = function(model) {
                return model.get('id');
            };

            var startCollection = this.ratingListView.collection;
            startCollection.listenTo(Backbone, 'rating:update', function(message) {
                 startCollection.reset(message);
            });

            this.ratingListView.listenTo(startCollection, 'reset', function() {
                that.ratingListView.render();
            });

            this.questionsView.listenTo(this.questionsView.collection, 'add', function() {
                that.questionsView.render();
                that.topQuestionsView.render();
                that.$el.find('#nr-of-questions').text(that.questionsView.collection.length);
            });
            this.questionsView.listenTo(this.questionsView.collection, 'reset', function() {
               that.$el.find('#nr-of-questions').text(that.questionsView.collection.length);
            });

            this.topQuestionsView = new QuestionsView({
                collection: new QuestionsCollection()
            });
            this.topQuestionsView.listenTo(this.topQuestionsView.collection, 'sort', function() {
                that.topQuestionsView.render();
            });
            this.topQuestionsView.collection.comparator = function(model) {
                return model.get('votes');
            };
            this.topQuestionsView.collection.sort();
        },
        render: function() {
            this.$el.html(this.template({}));

            this.ratingListView.$el = this.$('#ratings');
            this.questionsView.$el = this.$('#new-questions');
            this.topQuestionsView.$el = this.$('#top-questions');

            this.ratingListView.render();
            this.questionsView.render();
            this.topQuestionsView.render();

            new QuestionForm({
                model: new QuestionModel(),
                el: $('#addQuestionForm')
            });

            return this;
        }
    });
});
