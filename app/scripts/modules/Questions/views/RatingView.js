define([
    'underscore',
    'backbone',
    'templates',
    'socket'
], function(_, Backbone, JST, socket) {
    'use strict';

    return Backbone.View.extend({
        template: JST['app/templates/rating.hbs'],
        events: {
            'click label': 'vote',
            'touchstart label':'vote'
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
            this.computeAverageRating();
            this.$el.html(this.template(this.model.attributes));
            this.presetStars();
            return this;
        },
        showRating: function(evt) {
            $(evt.target).closest('a').siblings('form').removeClass('hide');
            $(evt.target).closest('a').hide();
        },
        computeAverageRating: function() {
            var sum = this.model.get('sum');
            var votes = this.model.get('votes');
            var average = (sum / votes) || 0;
            this.model.set('average', average);
        },
        presetStars: function() {
            // for type get average
            var average = localStorage.getItem(this.model.get('type'));
            if(! average) {
                return;
            }

            if ((average >= 1) && (average < 2)) {
                this.$el.find('[id^=star1]').attr('checked', true);
            }
            if ((average >= 2) && (average < 3)) {
                this.$el.find('[id^=star2]').attr('checked', true);
            }
            if ((average >= 3) && (average < 4)) {
                this.$el.find('[id^=star3]').attr('checked', true);
            }
            if ((average >= 4) && (average < 5)) {
                this.$el.find('[id^=star4]').attr('checked', true);
            }
            if (average >= 5) {
                this.$el.find('[id^=star5]').attr('checked', true);
            }
            return this;
        },
        vote: function(evt) {
            var value = $(evt.target).data('value');
            var type = $(evt.target).data('id');

            socket.emit('rating:neworupdate', {
                uuid: localStorage.getItem('uuid'),
                value: value,
                type: type
            });

            $(evt.target).siblings('input[type=radio]:checked').prop('checked', false);
            $(evt.target).prev('input[type=radio]').prop('checked', true);
            localStorage.setItem(this.model.get('type'), $(evt.target).data('value'));
        }
    });
});
