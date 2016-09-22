'use strict';

define(['socket.io', 'backbone'], function(io, Backbone) {
    var socket = io.connect({transports: ['websocket']});
    socket.on('question:update', function(message) {
        Backbone.trigger('question:update', message);

    });
    socket.on('question:new', function(message) {
        Backbone.trigger('question:new', message);
    });

    socket.on('rating:update', function(message) {
        console.log('rating:update socket handler');
        console.log(message);
        message.forEach(function(m) {
            console.log('Update: ' + m.type + ', ' + m.votes + ', ' + m.sum);
        });
        Backbone.trigger('rating:update', message);
    });
    return socket;
});
