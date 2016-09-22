define([
    'underscore',
    'backbone',
    'modules/Questions/views/Questions',
    'handlebarsHelpers',
], function(_, Backbone, QuestionsView) {
    'use strict';

    var server;
    var sampleJSON = [
        {
            'id': 1,
            'question': 'Name: Fist question',
            'votes': 1
        },
        {
            'id': 2,
            'question': 'Name: Pretty Cool ehm ?',
            'votes': 0
        }
    ];

    describe('QuestionItem view', function() {
        beforeEach(function() {
            server = sinon.fakeServer.create();
            this.view = new QuestionsView();
            this.view.render();
        });

        afterEach(function() {
            server.restore();
        });

        it('render() should return a view object', function() {
            server.respondWith('GET', 'api/questions',
                       [200, { 'Content-Type': 'application/json' },
                       JSON.stringify(sampleJSON)]);

            this.view.render().should.equal(this.view);
        });

        it(' add event should add question', function() {
          this.view.questionsView.collection.trigger('add');
        });
    });
});
